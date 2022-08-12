import type { AppProps } from "next/app";
import "../styles/globals.scss";
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
    <WagmiConfig client={client}>
      <StarknetProvider connectors={connectors} autoConnect>
        <NextHead>
          <title>StarkNet ❤️ React</title>
        </NextHead>
        <Component {...pageProps} />
      </StarknetProvider>
    </WagmiConfig>
  );
}

export default MyApp;
