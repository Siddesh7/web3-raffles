"use client";

import {PrivyProvider} from "@privy-io/react-auth";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createConfig, WagmiProvider} from "@privy-io/wagmi";
import {base, baseSepolia, polygon} from "viem/chains";
import {http} from "wagmi";
import {createPublicClient} from "viem";

export const config = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
});
export default function PrivyAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_ID || ""}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
        defaultChain: polygon,
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
export const publicClient = createPublicClient({
  chain: polygon,
  transport: http(),
});
