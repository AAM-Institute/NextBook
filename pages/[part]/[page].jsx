import { componentMap } from 'components/component-mapper'
import fs from 'fs'
import GithubSlugger from 'github-slugger'
import matter from 'gray-matter'
import DocumentLayout from 'layouts/document'
import toc from 'markdown-toc'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import breaks from 'remark-breaks'
import emoji from 'remark-emoji'
import externalLinks from 'remark-external-links'
import remarkGfm from 'remark-gfm'
import hints from 'remark-hint'
import slug from 'remark-slug'
import rehypeMetaAsProps from 'utils/rehypeMetaAsProps'
import { CONTENT_PATH } from 'utils/mdxUtils'
import { useTina } from 'tinacms/dist/react'
import { staticRequest, gql, getStaticPropsForTina } from 'tinacms'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { useCallback, useEffect, useState } from 'react'
import equal from 'fast-deep-equal'
import {toString} from 'mdast-util-to-string'

const query = `query BlogPostQuery($relativePath: String!) {
  article(relativePath: $relativePath) {
    title
    body
  }
}`

export default function Page({ source, frontMatter, ...props }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  
  return (
    <DocumentLayout frontMatter={frontMatter}>
        <MDXRemote {...source} components={componentMap} />
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
      remarkPlugins: [emoji, externalLinks, slug, hints, breaks, remarkGfm]
    },
    scope: data,
  })

  const relativePath = path.join(params.part, params.page || 'index') + ext
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      data: mdxSource,
      query,
      variables: {
        relativePath
      }
    }
  }
}

export const getStaticPaths = async () => {
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
    fallback: "blocking",
  }
}
