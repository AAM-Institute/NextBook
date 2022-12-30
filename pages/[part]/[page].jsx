import fs from 'fs'
import GithubSlugger from 'github-slugger'
import matter from 'gray-matter'
import toc from 'markdown-toc'
import { useSession } from "next-auth/react"
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import breaks from 'remark-breaks'
import emoji from 'remark-emoji'
import externalLinks from 'remark-external-links'
import remarkGfm from 'remark-gfm'
import hints from 'remark-hint'
import slug from 'remark-slug'

import { staticRequest } from 'tinacms'
import { useTina } from 'tinacms/dist/react'

import { componentMap } from 'components/component-mapper'
import DocumentLayout from 'layouts/document'
import rehypeMetaAsProps from 'utils/rehypeMetaAsProps'
import { CONTENT_PATH } from '../../utils/constants'

const query = `query BlogPostQuery($relativePath: String!) {
  article(relativePath: $relativePath) {
    title
    body
  }
}`

export default function Page({ source, frontMatter, params, ...props }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  
  // Auth
  const publicRoutes = [
    'intro',
    'guide/0-programming-mindset',
    // 'guide/1-prerequisites',
    // 'guide/2-html-basics',
    // 'guide/3-css-basics',
    'references',
    'references/glossary',
    'references/cheatsheet',
    'references/resources',
  ]

  const { status } = useSession({
    // Specify pages that require authorization
    required: !publicRoutes.includes(`${params?.part}${params?.page ? `/${params.page}` : ''}`),
    
  })

  if (status === "loading") {
    // todo: something better- + loading anim
    return (
      <DocumentLayout frontMatter={frontMatter}>
        Loading or not authenticated...
      </DocumentLayout>
    )
  }

  // const [content, setContent] = useState(source)

  // useEffect(() => {
  //   const fn = async () => {
  //     const mark = await unified()
  //       .use(rehypeParse)
  //       .use(rehypeRemark)
  //       .use(oembed)
  //       .use(remarkStringify, {
  //         bullet: '*',
  //         fence: '~',
  //         fences: true,
  //         incrementListMarker: false
  //       })
  //       .process(content)
  //     console.log(mark)
  //     setContent(mark)
  //   }
  //   fn()
  // }, [content])

  return (
    <DocumentLayout frontMatter={{...frontMatter, title: data?.article?.title }}>
        <MDXRemote {...source} body={data?.article} components={componentMap} />
    </DocumentLayout>
  )
}

export const getStaticProps = async ({ params }) => {

  // get file and split content into data and frontmatter
  let source = ''
  let ext = ''
  const filePath = path.join(CONTENT_PATH, params.part, params.page || 'index')
  try {
    ext = '.md'
    source = fs.readFileSync(`${filePath}${ext}`)
  } catch {
    ext = '.mdx'
    source = fs.readFileSync(`${filePath}${ext}`)
  }
  const { content, data } = matter(source)
    
  // Generate in-page-toc data and add it to frontmatter scope
  if (!data.tocRaw) {
    const tocData = toc(content, { slugify: new GithubSlugger() })
    data.tocRaw = tocData.json
  }

  // pre-render markdown content
  const mdxSource = await serialize(content, {
    components: componentMap,
    mdxOptions: {
      rehypePlugins: [rehypeMetaAsProps],
      remarkPlugins: [ emoji, externalLinks, slug, hints, remarkGfm, /*breaks, oembed*/ ]
    },
    scope: data,
  })

  const relativePath = path.join(params.part, params.page || 'index') + ext
  return {
    props: {
      params,
      source: mdxSource,
      data: mdxSource,
      frontMatter: data,
      query,
      variables: {
        relativePath
      }
    }
  }
}

export const getStaticPaths = async () => {
  // Old way
  // const mdxPaths = contentMapping.flat().map((item) => ({ params: { ...item } }))
  
  // merge page mdxPaths with tina
  const articlesListData = await staticRequest({
    query: `
      query {
        articleConnection {
          edges {
            node {
              _sys {
                filename
                relativePath
              }
              title
            }
          }
        }
      }
    `,
    variables: {},
  })
  
  const paths = articlesListData.articleConnection.edges.map(edge => {
    return {
      params: { 
        part: path.dirname(edge.node._sys.relativePath),
        page: edge.node._sys.filename,
        slug: edge.node._sys.filename 
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
