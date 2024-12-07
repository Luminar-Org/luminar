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
