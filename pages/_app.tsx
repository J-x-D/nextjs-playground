import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { SessionProvider } from "next-auth/react";
import Layout from "../src/Layout";
import { appWithTranslation } from "next-i18next";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session: any;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: `http://localhost:3000/api/graphql`,
    headers: {
      jwt:
        typeof window !== "undefined" ? localStorage.getItem("JWT") || "" : "",
    },
  });

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={client}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SessionProvider session={pageProps.session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp);
