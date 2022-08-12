import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { getInstalledInjectedConnectors, StarknetProvider } from '@starknet-react/core'
import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
  chain,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()],
)

const client = createClient({
  autoConnect: false,
  provider,
})
function MyApp({ Component, pageProps }: AppProps) {
  const connectors = getInstalledInjectedConnectors()

  return (
    <StarknetProvider connectors={connectors} autoConnect>
      <NextHead>
        <title>StarkNet ❤️ React</title>
      </NextHead>
      <Component {...pageProps} />
    </StarknetProvider>
  )
}

export default MyApp
