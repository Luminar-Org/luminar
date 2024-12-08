import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function SocketProtocolSection() {
  return (
    <div className="py-16">
      <Card className="bg-white/5 backdrop-blur-sm border-0 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)"/>
            </svg>
          </div>

          <div className="relative p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-[#d7c7ff] to-[#c5fedf] text-black">
                      Powered By
                    </span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white">
                    Built on Socket Protocol
                  </h3>
                  <p className="text-white/60 text-lg max-w-xl">
                    Leveraging Socket Protocol's infrastructure for secure and efficient cross-chain transactions
                  </p>
                  
                  <motion.a
                    href="https://www.socket.tech/"
                    className="flex items-center gap-2 text-[#d7c7ff] hover:text-[#c5fedf] transition-colors w-fit"
                    whileHover={{ x: 5 }}
                  >
                    Learn more about Socket Protocol
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.a>
                </motion.div>
              </div>

              
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}