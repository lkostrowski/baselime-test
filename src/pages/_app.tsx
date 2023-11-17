import "@saleor/macaw-ui/style";
import "../tracing";

import "../styles/globals.css";
import { BaselimeRum } from "@baselime/react-rum";

import { AppBridge, AppBridgeProvider } from "@saleor/app-sdk/app-bridge";
import { RoutePropagator } from "@saleor/app-sdk/app-bridge/next";
import { AppProps } from "next/app";
import { useEffect } from "react";

import { ThemeProvider } from "@saleor/macaw-ui";
import { NoSSRWrapper } from "../lib/no-ssr-wrapper";
import { ThemeSynchronizer } from "../lib/theme-synchronizer";
import { GraphQLProvider } from "../providers/GraphQLProvider";

const baselimeApiKey = process.env.NEXT_PUBLIC_BASELIME_KEY as string;

/**
 * Ensure instance is a singleton.
 * TODO: This is React 18 issue, consider hiding this workaround inside app-sdk
 */
const appBridgeInstance = typeof window !== "undefined" ? new AppBridge() : undefined;

function NextApp({ Component, pageProps }: AppProps) {
  /**
   * Configure JSS (used by MacawUI) for SSR. If Macaw is not used, can be removed.
   */
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <NoSSRWrapper>
      <AppBridgeProvider appBridgeInstance={appBridgeInstance}>
        <GraphQLProvider>
          <ThemeProvider>
            <ThemeSynchronizer />
            <RoutePropagator />
            <BaselimeRum apiKey={baselimeApiKey} enableWebVitals fallback={<div>err</div>}>
              <Component {...pageProps} />
            </BaselimeRum>
          </ThemeProvider>
        </GraphQLProvider>
      </AppBridgeProvider>
    </NoSSRWrapper>
  );
}

export default NextApp;
