import type { Address } from "viem";
import { parseEther } from "viem";
import {
  useChainId,
  useWriteContract,
} from "wagmi";

const DEX_GATEWAY_ADDRESS = "0x5081a39b8A5f0E35a8D959395a630b68B74Dd30f";

const DEX_GATEWAY_ABI = [
  {
    inputs: [
      { name: "chainSlug", type: "uint32" },
      { name: "router1", type: "address" },
      { name: "router2", type: "address" },
      { name: "token1", type: "address" },
      { name: "token2", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "executeDualDexTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const CHAIN_CONFIGS = {
  SEPOLIA: {
    chainSlug: 11155111,
    routers: {
      router1: "0x2CB45Edb4517d5947aFdE3BEAbF95A582506858B",
      router2: "0x2CB45Edb4517d5947aFdE3BEAbF95A582506858B",
    },
    tokens: {
      USDC: "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB",
    },
  },
  ARBITRUM_TESTNET: {
    chainSlug: 421614,
    routers: {
      router1: "0xA1B1742e9c32C7cAa9726d8204bD5715e3419861",
      router2: "0xA1B1742e9c32C7cAa9726d8204bD5715e3419861",
    },
    tokens: {
      USDC: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
    },
  },
} as const;

export function useDexTrade() {
  const chainId = useChainId();

  const { writeContractAsync } = useWriteContract();

  const getChainConfig = () => {
    switch (chainId) {
      case 7625382:
        return CHAIN_CONFIGS.SEPOLIA;
      case 421614:
        return CHAIN_CONFIGS.ARBITRUM_TESTNET;
      default:
        throw new Error("Unsupported chain");
    }
  };

  const submitTrade = async (amount: number) => {
    try {
      const config = getChainConfig();

      const hash = await writeContractAsync({
        address: DEX_GATEWAY_ADDRESS as Address,
        abi: DEX_GATEWAY_ABI,
        functionName: "executeDualDexTrade",
        args: [
          config.chainSlug,
          config.routers.router1 as Address,
          config.routers.router2 as Address,
          config.tokens.USDC as Address,
          config.tokens.USDC as Address,
          parseEther(amount.toString()),
        ],
      });

      return hash;
    } catch (error) {
      console.error("Trade execution failed:", error);
      throw error;
    }
  };

  return {
    submitTrade,
  };
}
