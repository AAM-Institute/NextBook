import { defineConfig } from 'tinacms'

  // Your hosting provider likely exposes this as an environment variable
  const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||  process.env.HEAD || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 'main'
  
  export default defineConfig({
    branch,
    // Get this from tina.io
    token: '3d2c560acb11012c91c6b24a6346e7481a510683', // generated on app.tina.io,
    clientId: '079e55fa-7e87-4474-9a3d-3ce0fc201179',
    // ...(process.env.NODE_ENV === 'production' ? {clientId: process.env.TINA_CLIENT_ID, token: process.env.TINA_CLIENT_TOKEN} : {}),
        
      // This is the path to your repository
      // You can find this in the Tina Cloud dashboard
      // repository: {
      //   owner: 'tina-graphql-gateway',
      //   name: 'tina-graphql-gateway',
      //   branch,
      // },
      
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
  