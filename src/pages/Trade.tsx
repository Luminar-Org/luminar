import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { abi } from "../../public/DexAggregatorGateway.json";
import TradingViewWidget from "../components/TradingView";
import { useToast } from "../hooks/use-toast";
import { DualDexTradeParams, Symbols } from "../types";

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


export default function Trade() {
  const { symbol } = useParams();
  const [currentInvestmentType, setCurrentInvestmentType] = useState("");
  const navigate = useNavigate();
  const { address } = useAccount();
  const { toast } = useToast();
  const { data: hash, writeContract, isPending } = useWriteContract();

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

  const { register, watch } = form;
  const trade = watch();

  const handleInvestmentTypeChange = (type: string) => {
    setCurrentInvestmentType(type);
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: hash as `0x${string}`,
    });

  const handleTradeSubmit = async (data: DualDexTradeParams) => {

    try {
      writeContract({
        address: "0x5081a39b8A5f0E35a8D959395a630b68B74Dd30f",
        abi,
        functionName: "executeDualDexTrade",
        args: [
          data.chainSlug,
          data.router1,
          data.router2,
          data.token1,
          data.token2,
          data.amount,
        ],
      });

      if(isConfirmed){
        console.log("Confirmed Transaction")
      }
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
      {    !isPending && 
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
                {/* {orderBookEntries.slice(0, 5).map((item, idx) => (
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
                ))} */}
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
                  <div className="flex flex-col">
                  <div className="flex flex-col gap-4 text-white border-white/10 hover:border-white border p-4 rounded-md transition-all ">
                    <div className="flex flex-row">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">{symbol}</span>
                        <Badge variant="outline" className="text-white text-xs">
                          Spot Grid
                        </Badge>
                      </div>
                      <div className="text-sm ml-auto">
                        Balanced
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
                  <div className="flex flex-col gap-4 text-white border-white/10 hover:border-white border p-4 rounded-md transition-all">
                    <div className="flex flex-row">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">{symbol}</span>
                        <Badge variant="outline" className="text-white text-xs">
                          Spot Grid
                        </Badge>
                      </div>                      
                      <div className="text-sm ml-auto">
                        Risky
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
                  <div className="flex flex-col gap-4 text-white border-white/10 hover:border-white border p-4 rounded-md transition-all">
                    <div className="flex flex-row">
                      <div className="flex flex-col gap-2">
                        <span className="text-sm">{symbol}</span>
                        <Badge variant="outline" className="text-white text-xs">
                          Spot Grid
                        </Badge>
                      </div>                      
                      <div className="text-sm ml-auto">
                        Conservative
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
                        {...register("amount")}
                        className="bg-white/5 border-white/10 text-lg text-white"
                      />
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
          </motion.div>
        </FormProvider>
      </div>
}
    </motion.div>
  );
}
