import SocketProtocolSection from "@/components/BuiltWith";
import RoadmapComponent from "@/components/Roadmap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Bot, LineChart, Link2, Rocket, Zap } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const features = [
  {
    icon: <Bot className="h-6 w-6 text-black" />,
    title: "Autonomous Arbitrage",
    description:
      "Automatically detect and execute arbitrage opportunities across chains with minimal latency",
  },
  {
    icon: <Zap className="h-6 w-6 text-black" />,
    title: "High-Frequency Trading",
    description:
      "Leverage high-speed execution with horizontal scaling across rollups and chains for competitive edge",
  },
  {
    icon: <Link2 className="h-6 w-6 text-black" />,
    title: "Cross-Chain Liquidity Aggregation",
    description:
      "Access and aggregate liquidity from multiple blockchains and DEXs in real-time for best price execution",
  },
  {
    icon: <Bot className="h-6 w-6 text-black" />,
    title: "AI-Driven Trading Strategies",
    description:
      "Machine learning models that optimize arbitrage opportunities and adapt to volatile market conditions dynamically",
  },
  {
    icon: <LineChart className="h-6 w-6 text-black" />,
    title: "Advanced Analytics Dashboard",
    description:
      "In-depth trading metrics, performance reports, and arbitrage insights for informed decision-making",
  },
  {
    icon: <Rocket className="h-6 w-6 text-black" />,
    title: "Gas Optimization",
    description:
      "AI-powered analysis to reduce transaction costs by selecting optimal chains and minimizing fees",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F1117]">
      <div className="pt-20 px-4 lg:px-5 max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-10 bg-gradient-to-br from-[#d7c7ff] to-[#c5fedf] p-8 lg:p-20 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <pattern
                id="hero-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M0 0h40v40H0z" fill="none" />
                <circle cx="20" cy="20" r="1" fill="currentColor" />
                <path
                  d="M0 20h40M20 0v40"
                  stroke="currentColor"
                  strokeWidth="0.2"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#hero-pattern)" />
            </svg>
          </div>

          {/* Hero Section */}
          <div className="w-full text-black flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">
            <motion.div
              className="flex flex-col gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.h1
                className="text-4xl lg:text-6xl font-bold lg:w-[45vw] leading-tight"
                variants={item}
              >
                Luminar: Illuminate the Future of Decentralized Trading
              </motion.h1>
              <motion.h2
                className="text-xl text-black/80 max-w-2xl"
                variants={item}
              >
                Unifying AI-Driven DEX Aggregation, High-Frequency Trading, and
                Autonomous Arbitrage Across Chains
              </motion.h2>
              <motion.div variants={item}>
                <Button className="bg-black hover:bg-black/80 w-fit px-10 py-6 rounded-2xl text-white font-bold text-lg">
                  Start Trading <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="lg:ml-auto"
            >
              <Card className="bg-white/20 backdrop-blur-sm p-10 rounded-2xl text-xl font-bold text-black w-full lg:w-[400px] transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                {/* Card Pattern */}
                <div className="absolute inset-0">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full opacity-10"
                  >
                    <path
                      d="M 0,10 C 30,10 30,30 50,30 S 70,50 90,50 110,70 130,70"
                      stroke="black"
                      fill="none"
                      strokeWidth="2"
                    />
                    <path
                      d="M 0,50 C 30,50 30,70 50,70 S 70,90 90,90 110,110 130,110"
                      stroke="black"
                      fill="none"
                      strokeWidth="2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="20"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <span className="relative z-10">
                  Trade Smarter, Faster, and Autonomous
                </span>
              </Card>
            </motion.div>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col lg:flex-row text-black gap-10 relative z-10">
            <motion.div
              className="flex flex-row gap-20"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div
                className="flex flex-col gap-4 group cursor-pointer"
                variants={item}
              >
                <span className="text-6xl font-bold text-black transition-colors">
                  4
                </span>
                <span className="text-xl text-black/80">Chains Supported</span>
              </motion.div>
              <motion.div
                className="flex flex-col gap-4 group cursor-pointer"
                variants={item}
              >
                <span className="text-6xl font-bold text-black transition-colors">
                  10+
                </span>
                <span className="text-xl text-black/80">Autonomous Bots</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col lg:flex-row gap-4 lg:w-[40vw] lg:ml-auto"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="flex-1">
                <Card className="bg-white/20 backdrop-blur-sm h-full p-8 rounded-2xl text-black font-bold text-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full opacity-10"
                    >
                      <rect
                        x="10"
                        y="10"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="black"
                        strokeWidth="1"
                      />
                      <rect
                        x="40"
                        y="40"
                        width="30"
                        height="30"
                        fill="none"
                        stroke="black"
                        strokeWidth="1"
                      />
                      <rect
                        x="80"
                        y="80"
                        width="40"
                        height="40"
                        fill="none"
                        stroke="black"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  <span className="relative z-10">
                    Optimized for Scalability and Efficiency
                  </span>
                </Card>
              </motion.div>
              <motion.div variants={item} className="flex-1">
                <Card className="bg-white/20 backdrop-blur-sm h-full p-8 rounded-2xl text-black font-bold text-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full opacity-10"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="black"
                        strokeWidth="1"
                      />
                      <path
                        d="M20,50 h60 M50,20 v60"
                        stroke="black"
                        strokeWidth="1"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        stroke="black"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  <span className="relative z-10">
                    Seamless Liquidity Aggregation Across Chains
                  </span>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Power-Packed Features
            </h2>
            <p className="text-white/60 text-xl max-w-3xl mx-auto">
              Experience the next generation of decentralized trading with our
              comprehensive suite of features
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="show"
            variants={container}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={item}>
                <Card className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 border-0 h-full group">
                  <motion.div
                    className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#d7c7ff] to-[#c5fedf] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
      <RoadmapComponent/>
      <SocketProtocolSection/>
    </main>
  );
}
