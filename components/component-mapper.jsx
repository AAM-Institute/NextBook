// import { AirTable } from "mdx-embed/dist/components/airtable";
import { CodePen } from "mdx-embed/dist/components/codepen";
import { CodeSandbox } from "mdx-embed/dist/components/codesandbox";
import { Figma } from "mdx-embed/dist/components/figma";
import { Gist } from "mdx-embed/dist/components/gist";
import { Instagram } from "mdx-embed/dist/components/instagram";
import { SoundCloud } from "mdx-embed/dist/components/soundcloud";
import { Spotify } from "mdx-embed/dist/components/spotify";
import { TikTok } from "mdx-embed/dist/components/tiktok";
import { Twitch } from "mdx-embed/dist/components/twitch";
// import { Twitter } from "mdx-embed/dist/components/twitter";
import { Vimeo } from "mdx-embed/dist/components/vimeo";
import { Wistia } from "mdx-embed/dist/components/wistia";
import { YouTube } from "mdx-embed/dist/components/youtube";

import Counter from './example-counter'
import GithubTestRunner from './github-test-runner'
import {
  Accordion,
  Blockquote,
  Code,
  CustomImage,
  CustomLink,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Hr,
  Ol,
  P,
  Tab,
  Table,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Ul
} from './mdx-components'

export const componentMap = {
  Counter,
  GithubTestRunner,

  Accordion,
  Tab,
  Tabs,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  td: Td,
  th: Th,
  a: CustomLink,
  img: CustomImage,
  blockquote: Blockquote,
  code: Code,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  ol: Ol,
  ul: Ul,
  hr: Hr,
  p: P,
  
  // mdx-embed
  CodePen,
  CodeSandbox,
  Figma,
  Gist,
  Instagram,
  SoundCloud,
  Spotify,
  TikTok,
  Twitch,
  Vimeo,
  Wistia,
  YouTube,
}
