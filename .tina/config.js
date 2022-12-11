import { defineConfig } from 'tinacms'

  // Your hosting provider likely exposes this as an environment variable
  const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'
  
  export default defineConfig({
    branch,
    clientId: 'ddb42427-3f52-4848-b7c5-5ddc8c1694ff', // Get this from tina.io
    token: '1deca975df0447d86b1f452bb66a5818c3311104', // Get this from tina.io
    build: {
      outputFolder: 'admin',
      publicFolder: 'public',
    },
    media: {
      tina: {
        mediaRoot: 'uploads',
        publicFolder: 'public',
      },
    },
    schema: {
      collections: [
        {
          name: 'post',
          label: 'Posts',
          path: 'content/posts',
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Title',
              isTitle: true,
              required: true,
            },
            {
              type: 'rich-text',
              name: 'body',
              label: 'Body',
              isBody: true,
            },
          ],
          ui: {
            // This is an DEMO router. You can remove this to fit your site
            router: ({ document }) => `/demo/blog/${document._sys.filename}`,
          },
        },
        {
          name: 'article',
          label: 'Article',
          path: 'content',
          format: 'mdx',
          defaultItem: () => {
            return {
              // Return a default title and the current date as the default date
              // title: 'new post',
              date: new Date().toISOString(),
            }
          },
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Title',
              isTitle: true,
              required: true,
            },
            {
              type: 'string',
              name: 'part',
              label: 'Part',
              isTitle: false,
              required: false,
            },
            {
              type: 'string',
              name: 'updated',
              label: 'Updated',
              isTitle: false,
              required: false,
            },
            {
              type: 'string',
              name: 'description',
              label: 'Description',
              isTitle: false,
              required: false,
            },
            {
              type: 'string',
              label: 'Image',
              name: 'hero_image',
            },
            // {
            //   name: 'tags',
            //   label: 'Tags',
            //   component: 'list',
            //   field: {
            //     component: 'text',
            //   },
            // },
            {
              type: 'rich-text',
              name: 'body',
              label: 'Body',
              isBody: true,
              required: true,
              // React components
              templates: [],
            },
          ],
          ui: {
            // This is an DEMO router. You can remove this to fit your site
            router: ({ document }) => {
              console.log(document._sys.relativePath)
              const path = document._sys.relativePath.replace(/\.[^/.]+$/, "") // remove file extension
              return `/${path}`
            },
          },
        },
      ],
    },
  })
  