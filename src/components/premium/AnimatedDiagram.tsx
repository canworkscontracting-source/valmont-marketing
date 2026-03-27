"use client";

import { motion } from "framer-motion";

interface DiagramNode {
  label: string;
  highlight?: boolean;
}

interface AnimatedDiagramProps {
  nodes: DiagramNode[];
  title?: string;
  direction?: "horizontal" | "vertical";
}

export default function AnimatedDiagram({ 
  nodes, 
  title,
  direction = "horizontal" 
}: AnimatedDiagramProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-xl font-bold text-center mb-8 text-gray-300">
          {title}
        </h3>
      )}

      <div className={`
        flex 
        ${isHorizontal ? 'flex-row flex-wrap justify-center' : 'flex-col'} 
        items-center 
        gap-4
      `}>
        {nodes.map((node, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Node */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 200
              }}
              className="relative group"
            >
              {/* Outer glow */}
              <div className={`
                absolute inset-0 rounded-xl blur-lg
                ${node.highlight ? 'bg-teal/40' : 'bg-teal/20'}
                animate-pulse-slow
              `} />

              {/* Node box */}
              <div className={`
                relative
                px-6 py-3
                backdrop-blur-sm
                border rounded-xl
                font-medium text-sm
                transition-all duration-500
                ${node.highlight 
                  ? 'bg-teal/10 border-teal/60 text-teal shadow-glow-md' 
                  : 'bg-white/5 border-white/20 text-gray-300 group-hover:border-teal/40'
                }
              `}>
                {node.label}

                {/* Pulse dot for highlighted nodes */}
                {node.highlight && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-teal rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>
            </motion.div>

            {/* Arrow connector (except for last node) */}
            {index < nodes.length - 1 && (
              <div className="relative">
                {/* Animated data flow */}
                <motion.div
                  className={`
                    ${isHorizontal ? 'w-12 h-[2px]' : 'h-12 w-[2px]'}
                    bg-gradient-to-r from-teal/60 via-teal to-teal/60
                    relative overflow-hidden
                  `}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {/* Flowing particle effect */}
                  <motion.div
                    className={`
                      absolute 
                      ${isHorizontal ? 'w-4 h-full left-0' : 'h-4 w-full top-0'}
                      bg-teal shadow-glow
                    `}
                    animate={isHorizontal 
                      ? { x: ['-100%', '300%'] }
                      : { y: ['-100%', '300%'] }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "linear"
                    }}
                  />
                </motion.div>

                {/* Arrow head */}
                <motion.svg
                  className={`
                    ${isHorizontal ? 'absolute right-0 -translate-x-1' : 'absolute bottom-0 -translate-y-1 rotate-90'}
                    w-3 h-3 text-teal
                  `}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <path d="M0 0 L8 4 L0 8 Z" />
                </motion.svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
