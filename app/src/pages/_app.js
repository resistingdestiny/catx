import React from "react";
import { ThemeProvider } from "util/theme";
import Navbar2 from "components/Navbar";
import Footer from "components/Footer";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, mainnet, polygon, sepolia } from "wagmi/chains";
import { scroll, mantle } from "../util/customChains"
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";


const { chains, provider } = configureChains(
  [goerli, mainnet, sepolia, polygon, scroll, mantle],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "CatExchange",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});



function MyApp({ Component, serverEmotionCache, pageProps }) {
  
 
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
          <ThemeProvider serverEmotionCache={serverEmotionCache}>
              <Navbar2
                color="primary"
                logo="logo.png"
                logoInverted="logo.png"
              />
              <Component {...pageProps} />
              <Footer
                bgColor="primary"
                size="medium"
                bgImage=""
                bgImageOpacity={1}
                copyright={`© ${new Date().getFullYear()} Cat Exchange`}
                logo="logo.png"
                logoInverted="logo.png"
                sticky={false}
              />
          </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
