import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";

import { Layout } from "../components";
import { theme } from "../utilities";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <Head>
      <title>l&apos;échanger</title>
      <meta name="description" content="Currency conversion web app" />
    </Head>

    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

export default MyApp;
