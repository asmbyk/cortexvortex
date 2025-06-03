import { coinbaseWallet } from "wagmi/connectors"

export const coinbaseConnector = coinbaseWallet({
  appName: "Cortex Vortex - Matt Furie's Story Engine",
  appLogoUrl: "/images/cortex-vortex-logo-main.png",
  preference: "smartWalletOnly",
})
