// .tina/config.js
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
console.log("*** Tina CMS Config ***");
console.log("Tina is using branch: ", branch);
process.env.TINA_CLIENT_ID && console.log("Tina is using client id: ", process.env.TINA_CLIENT_ID);
process.env.TINA_CLIENT_TOKEN && console.log("Tina is using client token: ", process.env.TINA_CLIENT_TOKEN);
var config_default = defineConfig({
  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID || "8e14fe83-5b16-4170-84d4-979ba090a6c1",
  token: process.env.TINA_CLIENT_TOKEN || void 0,
  // ...(process.env.NODE_ENV === 'production' ? {clientId: process.env.TINA_CLIENT_ID, token: process.env.TINA_CLIENT_TOKEN} : {}),
  // This is the path to your repository
  // You can find this in the Tina Cloud dashboard
  repository: {
    owner: "AAM-institute",
    name: "dev101",
    branch
  },
  branch,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "article",
        label: "Article",
        path: "content",
        format: "mdx",
        defaultItem: () => {
          return {
            // Return a default title and the current date as the default date
            // title: 'new post',
            date: (/* @__PURE__ */ new Date()).toISOString()
          };
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "part",
            label: "Part",
            isTitle: false,
            required: false
          },
          {
            type: "string",
            name: "updated",
            label: "Updated",
            isTitle: false,
            required: false
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            isTitle: false,
            required: false
          },
          {
            type: "string",
            label: "Image",
            name: "hero_image"
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
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            required: true,
            // React components
            templates: []
          }
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => {
            console.log(document._sys.relativePath);
            const path = document._sys.relativePath.replace(/\.[^/.]+$/, "");
            return `/${path}`;
          }
        }
      }
    ]
  }
});
export {
  config_default as default
};
