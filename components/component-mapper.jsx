import { Airtable } from "mdx-embed/dist/components/airtable";
import { CodePen } from "mdx-embed/dist/components/codepen";
import { Figma } from "mdx-embed/dist/components/figma";
import { Gist } from "mdx-embed/dist/components/gist";
import { Instagram } from "mdx-embed/dist/components/instagram";
import { SoundCloud } from "mdx-embed/dist/components/soundcloud";
import { Spotify } from "mdx-embed/dist/components/spotify";
import { Twitch } from "mdx-embed/dist/components/twitch";
import { Twitter } from "mdx-embed/dist/components/twitter";
import { Vimeo } from "mdx-embed/dist/components/vimeo";
import { Wistia } from "mdx-embed/dist/components/wistia";
import { YouTube } from "mdx-embed/dist/components/youtube";

import Counter from './example-counter'
import GithubTestRunner from './github-test-runner'
import components from './mdx-components'

export const componentMap = {
  ...components,
  Counter,
  GithubTestRunner,
  
  // // mdx-embed
  // Airtable,
  // CodePen,
  // Figma,
  // Gist,
  // Instagram,
  // SoundCloud,
  // Spotify,  
  // Twitch,
  // Twitter,
  // Vimeo,
  // Wistia,
  // YouTube,
}
