import { http, createConfig, injected } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { type Chain } from "viem";

export const socket = {
  id: 7625382,
  name: "SocketVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-socket-composer-testnet.t.conduit.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "Socket Composer",
      url: "https://explorer-socket-composer-testnet.t.conduit.xyz",
    },
  },
} as const satisfies Chain;

export const config = createConfig({
  chains: [mainnet, sepolia, socket],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [socket.id]: http("https://rpc-socket-composer-testnet.t.conduit.xyz"),
  },
});
