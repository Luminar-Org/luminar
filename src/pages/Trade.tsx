import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ConfirmationModal from "../components/confirmation-modal/ConfirmationModal";
import TradingViewWidget from "../components/TradingView";
import { DualDexTradeParams, OrderBook, Symbols, type Trade } from "../types";
import { getSymbolPrice } from "@/lib/GetSymbolPrice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useDexTrade } from "../hooks/useDexTrade";
import { useToast } from "../hooks/use-toast";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

const leverageMarks = [1, 2, 5, 10];

export default function Trade() {
  const { symbol } = useParams();
  const [price, setPrice] = useState<number>(0);
  const [orderBookEntries, setOrderBookEntries] = useState<OrderBook[]>([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [currentInvestmentType, setCurrentInvestmentType] = useState("");
  const navigate = useNavigate();
  const [transactionHash, setTransactionHash] = useState<string>("");
  const { address } = useAccount();
  const { submitTrade } = useDexTrade();
  const { toast } = useToast();
  const { data: hash, sendTransaction } = useSendTransaction();

  const form = useForm<DualDexTradeParams>({
    defaultValues: {
      chainSlug: 11155111,
      router1: "0x2CB45Edb4517d5947aFdE3BEAbF95A582506858B",
      router2: "0xA1B1742e9c32C7cAa9726d8204bD5715e3419861",
      token1: "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB",
      token2: "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB",
      amount: 10000n,
    },
  });

  const { register, handleSubmit, setValue, watch } = form;
  const trade = watch();

  const handleInvestmentTypeChange = (type: string) => {
    setCurrentInvestmentType(type);
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: transactionHash as `0x${string}`,
    });

  const handleTradeSubmit = async (data: Trade) => {
    console.log("Here");
    if (!address) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to trade",
        variant: "destructive",
      });
      return;
    }

    try {
    } catch (error) {
      console.error(error);
      toast({
        title: "Trade Failed",
        description:
          error instanceof Error ? error.message : "Failed to execute trade",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen py-20 lg:px-4 text-white"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-row gap-6 text-white">
        <motion.div className="flex flex-col gap-6 w-full" variants={item}>
          <Card className="h-[70vh] bg-white/5 backdrop-blur-sm border-white/10">
            <TradingViewWidget key={symbol} symbol={`PYTH:${symbol}`} />
          </Card>

          <Card className="h-[35vh] bg-white/5 backdrop-blur-sm border-white/10 text-white">
            <CardHeader>
              <h1 className="text-2xl font-bold">Positions</h1>
              <div className="h-px bg-white/10 w-full my-2" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-full gap-2">
                <div className="justify-between flex flex-row font-semibold mb-2 text-white/80">
                  <h1>Symbol</h1>
                  <h2>Price</h2>
                  <div>Order Type</div>
                </div>
                {orderBookEntries.slice(0, 5).map((item, idx) => (
                  <div
                    key={idx}
                    className="justify-between flex flex-row items-center"
                  >
                    <span className="text-lg">{symbol}</span>
                    <span className="text-lg font-medium">
                      ${item.price.toLocaleString()}
                    </span>
                    <Badge
                      variant={item.type === "buy" ? "default" : "destructive"}
                      className="px-4 py-1"
                    >
                      {item.type === "buy" ? "Long" : "Short"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <FormProvider {...form}>
          <motion.div className="flex flex-col gap-6 w-1/3" variants={item}>
            <Card className=" bg-white/5 backdrop-blur-sm border-white/10">
              <div className="flex border-b border-white/10 p-5">
                <span className="text-white font-bold">Spot Grid</span>
              </div>

              <CardContent className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {symbol}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-[8rem]">
                      {Object.entries(Symbols).map(([key]) => (
                        <DropdownMenuItem
                          key={key}
                          onClick={() => {
                            navigate(`/trade/${key}`);
                          }}
                          className="cursor-pointer"
                        >
                          {key}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {currentInvestmentType === "" ? (
                  <div className="flex flex-col gap-4 text-white border-white/10 hover:border-white border p-4 rounded-md transition-all">
                    <div className="flex flex-row">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">{symbol}</span>
                        <Badge variant="outline" className="text-white text-xs">
                          Spot Grid
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col text-xs">
                        <span>10 USDT</span>
                        <span className="text-white/60">Min Investment</span>
                      </div>
                      <div className="flex flex-col text-xs">
                        <span>7-30 Days</span>
                        <span className="text-white/60">
                          Recommended Duration
                        </span>
                      </div>
                    </div>
                    <button
                      className="ml-auto w-fit flex items-center gap-1 text-white hover:text-white hover:bg-white/10 text-[16px] px-4 py-1 rounded-full border-white/60 border"
                      onClick={() => handleInvestmentTypeChange("Xagent")}
                    >
                      <span className="text-sm">Invest</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-white/80">
                        Investment
                      </label>
                      <Input
                        type="number"
                        min={10}
                        {...register("contractSize")}
                        className="bg-white/5 border-white/10 text-lg text-white"
                      />
                      <span className="text-right text-white/60">
                        $
                        {(trade.contractSize * (price / 1000)).toLocaleString()}
                      </span>
                    </div>

                    <Button
                      className="w-full mt-6 bg-gradient-to-r from-[#d7c7ff] to-[#c5fedf] text-black font-bold text-lg h-12 hover:opacity-90"
                      onClick={() => handleTradeSubmit(trade)}
                    >
                      {!address
                        ? "Connect Wallet"
                        : isConfirming
                        ? "Confirming..."
                        : "Submit Order"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* <Card className="h-[35vh] bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <h1 className="text-2xl font-bold">Order Book</h1>
                <div className="h-px bg-white/10 w-full my-2" />
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <div className="w-1/2">
                    <h2 className="text-[#c5fedf] font-bold mb-4 text-lg">
                      Long
                    </h2>
                    <div className="space-y-3">
                      {orderBookEntries
                        .filter((item) => item.type === "buy")
                        .slice(0, 5)
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center"
                          >
                            <span className="text-white/80">{item.amount}</span>
                            <Badge variant="default" className="px-4 py-1">
                              ${item.price.toLocaleString()}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <h2 className="text-red-400 font-bold mb-4 text-lg">
                      Short
                    </h2>
                    <div className="space-y-3">
                      {orderBookEntries
                        .filter((item) => item.type === "sell")
                        .slice(0, 5)
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center"
                          >
                            <Badge variant="destructive" className="px-4 py-1">
                              ${item.price.toLocaleString()}
                            </Badge>
                            <span className="text-white/80">{item.amount}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </motion.div>
        </FormProvider>
      </div>

      <ConfirmationModal
        trade={trade}
        onCancel={() => setConfirmationModalOpen(false)}
        open={confirmationModalOpen}
      />
    </motion.div>
  );
}
