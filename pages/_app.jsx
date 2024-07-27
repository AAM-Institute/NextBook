import { OptionalHistoryContextProvider } from '@/components/store/history-context';
import { SideBarContextProvider } from '@/components/store/sidebar-context';
import { ThemeContextProvider } from '@/components/store/theme-context';
import splitbee from '@splitbee/web';
import { SessionProvider } from "next-auth/react";

// imports tailwind styles
import '@/styles/app.css';
import '@/styles/print.css';

if (
  process.env.NEXT_PUBLIC_SPLITBEE_TOKEN &&
  process.env.NODE_ENV === 'production'
) {
  splitbee.init({
    token: process.env.NEXT_PUBLIC_SPLITBEE_TOKEN
  })
}

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        <OptionalHistoryContextProvider>
          <SideBarContextProvider>
            {/* <ErrorBoundary> */}
            <Component {...pageProps} />
            {/* </ErrorBoundary> */}
          </SideBarContextProvider>
        </OptionalHistoryContextProvider>
      </ThemeContextProvider>
    </SessionProvider>
  )
}
