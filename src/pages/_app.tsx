import type { AppProps } from "next/app";
import "../../styles/globals.scss";
import NextHead from "next/head";
import {
  getInstalledInjectedConnectors,
  StarknetProvider,
} from "@starknet-react/core";
import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
  chain,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: false,
  provider,
});
function MyApp({ Component, pageProps }: AppProps) {
  const connectors = getInstalledInjectedConnectors();

  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <StarknetProvider connectors={connectors} autoConnect>
          <NextHead>
            <title>StarkNet ❤️ React</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
              rel="stylesheet"
            />
          </NextHead>
          <Component {...pageProps} />
        </StarknetProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
