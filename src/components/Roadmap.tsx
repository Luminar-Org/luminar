import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Bot, Calendar, Gem, LineChart, Network, Rocket } from 'lucide-react';

const roadmapData = [
  {
    quarter: 'Q1 2025',
    title: 'Foundation Launch',
    icon: <Network className="h-6 w-6 text-black" />,
    description: 'Launch of core platform features and initial cross-chain capabilities',
    items: [
      'Multi-chain DEX integration',
      'Basic arbitrage bot deployment',
      'Initial AI model training'
    ],
    status: 'current'
  },
  {
    quarter: 'Q2 2025',
    title: 'AI-Driven Trading Strategies',
    icon: <Bot className="h-6 w-6 text-black" />,
    description: 'Machine learning models that optimize arbitrage opportunities and adapt to volatile market conditions dynamically',
    items: [
      'ML model deployment',
      'Dynamic strategy optimization',
      'Market adaptation algorithms'
    ]
  },
  {
    quarter: 'Q3 2025',
    title: 'Advanced Analytics Dashboard',
    icon: <LineChart className="h-6 w-6 text-black" />,
    description: 'In-depth trading metrics, performance reports, and arbitrage insights for informed decision-making',
    items: [
      'Real-time performance tracking',
      'Advanced reporting system',
      'Predictive analytics integration'
    ]
  },
  {
    quarter: 'Q4 2025',
    title: 'Gas Optimization',
    icon: <Rocket className="h-6 w-6 text-black" />,
    description: 'AI-powered analysis to reduce transaction costs by selecting optimal chains and minimizing fees',
    items: [
      'Smart gas fee prediction',
      'Cross-chain route optimization',
      'Transaction batching system'
    ]
  },
  {
    quarter: 'Q1 2026',
    title: 'Professional Suite',
    icon: <Gem className="h-6 w-6 text-black" />,
    description: 'Professional-grade tools and institutional features',
    items: [
      'Institutional API access',
      'Advanced portfolio tools',
      'Custom strategy deployment'
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const RoadmapComponent = () => {
  return (
    <section className="py-20 px-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tighter">
          Roadmap to Excellence
        </h2>
        <p className="text-white/60 text-xl max-w-3xl mx-auto tracking-tight">
          Our journey to revolutionize decentralized trading through strategic milestones
        </p>
      </motion.div>

      <div className="relative">
        {/* Gradient timeline line */}
        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d7c7ff] via-[#e2d4ff] to-[#c5fedf] transform -translate-x-1/2" />

        <motion.div 
          className="space-y-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {roadmapData.map((milestone, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex flex-col lg:flex-row gap-8 lg:gap-16 items-start ${
                index % 2 === 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline node */}
              <motion.div 
                className={`absolute left-8 lg:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full border-2 
                  ${milestone.status === 'current' 
                    ? 'border-[#d7c7ff] bg-[#d7c7ff]/10' 
                    : 'border-[#d7c7ff]/30 bg-transparent'
                  }`}
                whileHover={{ scale: 1.2 }}
              >
                <Calendar 
                  className={`w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    ${milestone.status === 'current' ? 'text-[#d7c7ff]' : 'text-[#d7c7ff]/50'}`}
                />
              </motion.div>

              {/* Content */}
              <div className={`w-full lg:w-[calc(50%-3rem)] pl-20 lg:pl-0 ${
                index % 2 === 0 ? 'lg:text-right' : ''
              }`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className={`p-8 rounded-2xl backdrop-blur-sm border-2 
                    ${milestone.status === 'current'
                      ? 'bg-white/10 border-[#d7c7ff] hover:bg-white/20'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                    }
                    transition-all duration-300`}
                  >
                    <div className="flex items-start gap-6">
                      <motion.div 
                        className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#d7c7ff] to-[#c5fedf] flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {milestone.icon}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium
                            ${milestone.status === 'current'
                              ? 'bg-[#d7c7ff]/20 text-[#d7c7ff]'
                              : 'bg-white/10 text-white/60'
                            }`}
                          >
                            {milestone.quarter}
                          </span>
                          {milestone.status === 'current' && (
                            <span className="text-[#c5fedf] text-sm bg-[#c5fedf]/10 px-3 py-1 rounded-full flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#c5fedf] animate-pulse" />
                              Current Focus
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                          {milestone.title}
                        </h3>
                        <p className="text-white/60 mb-4 tracking-tight">
                          {milestone.description}
                        </p>
                        <ul className="space-y-3">
                          {milestone.items.map((item, itemIndex) => (
                            <motion.li 
                              key={itemIndex}
                              className="text-white/60 flex items-center gap-3"
                              whileHover={{ x: 10 }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#d7c7ff] to-[#c5fedf]" />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RoadmapComponent;