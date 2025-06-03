import { createConfig, http } from "wagmi"
import { base } from "wagmi/chains"
import { coinbaseWallet } from "wagmi/connectors"

// Default public RPC URL
const DEFAULT_RPC_URL = "https://mainnet.base.org"

// Create wagmi config with the provided RPC URL
export function createWagmiConfig(rpcUrl: string = DEFAULT_RPC_URL) {
  return createConfig({
    chains: [base],
    connectors: [
      coinbaseWallet({
        appName: "Cortex Vortex - Matt Furie's Story Engine",
        appLogoUrl: "/images/cortex-vortex-logo-main.png",
        preference: "all", // Allow both smart wallet and extension
      }),
    ],
    transports: {
      [base.id]: http(rpcUrl),
    },
  })
}

// Default export for backward compatibility
export const wagmiConfig = createWagmiConfig()
export { base as defaultChain }
