import fs from 'fs'
import GithubSlugger from 'github-slugger'
import matter from 'gray-matter'
import toc from 'markdown-toc'
import { useSession } from "next-auth/react"
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import emoji from 'remark-emoji'
import externalLinks from 'remark-external-links'
import remarkGfm from 'remark-gfm'
import hints from 'remark-hint'
import slug from 'remark-slug'

import { staticRequest } from 'tinacms'
import { useTina } from 'tinacms/dist/react'

import { componentMap } from '@/components/component-mapper'
import DocumentLayout from '@/layouts/document'
import { CONTENT_PATH, contentMapping } from '@/utils/mdxUtils'
import rehypeMetaAsProps from '@/utils/rehypeMetaAsProps'

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
		required: process.env.NODE_ENV === 'production' && !publicRoutes.includes(`${params?.part}${params?.page ? `/${params.page}` : ''}`),

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

	// Tina data should take precedence, so that we can use the Tina editor and see the changes in real-time
	return (
		<DocumentLayout frontMatter={{ ...frontMatter, ...(data?.article?.title ? { title: data.article.title } : {}) }}>
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
			remarkPlugins: [
				emoji, externalLinks, slug, hints, remarkGfm, /*breaks, oembed*/
			]
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

	// Old way
	const mdxPaths = contentMapping.flat().map((item) => ({ params: { ...item } }))

	// Tina way
	// const paths = articlesListData.articleConnection.edges.map(edge => {
	//   return {
	//     params: {
	//       part: path.dirname(edge.node._sys.relativePath),
	//       page: edge.node._sys.filename,
	//       slug: edge.node._sys.filename
	//     },
	//   }
	// })

	// merge page mdxPaths with tina

	return {
		// paths: [...mdxPaths, ...paths],
		paths: [...mdxPaths],
		fallback: false,
	}
}
