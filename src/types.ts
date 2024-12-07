export enum Symbols {
  ETHUSD = "PYTH:ETHUSD",
  ARBUSD = "PYTH:ARBUSD",
  OPUSD = "PYTH:OPUSD",
}

export interface Trade {
  address?: string;
  orderType: "LONG" | "SHORT";
  symbol: string;
  contractSize: number;
  leverage?: number;
  limitPrice?: number;
  margin?: number;
  ethPrice: number;
}

export interface OrderBook {
  id: string;
  type: string;
  price: string;
  amount: string;
  userAddress: string;
  contractAddress: string;
  timestamp: string;
}

export interface IDualDexTrade {
  executeDualDexTrade: (
    chainSlug: number,
    router1: string,
    router2: string,
    token1: string,
    token2: string,
    amount: bigint
  ) => Promise<void>;
}

export interface DualDexTradeParams {
  chainSlug: number;
  router1: string;
  router2: string;
  token1: string;
  token2: string;
  amount: bigint;
}
