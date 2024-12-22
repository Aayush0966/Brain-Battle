import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

const QuizResult = ({ score = 8 }) => {
    const handlePlayAgain = () => {
        window.location.href = '/home';
        localStorage.removeItem('questions');
    }

    useEffect(() => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const confettiInterval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(confettiInterval);
                return;
            }

            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FFC107', '#9C27B0', '#FF1744', '#00E676', '#2196F3']
            });

            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FFC107', '#9C27B0', '#FF1744', '#00E676', '#2196F3']
            });
        }, 40);

        return () => clearInterval(confettiInterval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="bg-black text-white p-10 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-sm max-w-md mx-auto text-center space-y-8 border border-gray-800">
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                        Excellent! 🎉
                    </h1>
                </motion.div>

                <div className="space-y-6">
                    <p className="text-2xl font-medium text-gray-200">
                        Quiz Completed Successfully
                    </p>
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="text-6xl font-bold"
                    >
                        <span className="text-cyan-400">{score}</span>
                        <span className="text-gray-400">/10</span>
                    </motion.div>
                </div>

                <div className="space-y-2">
                    <p className="text-sm text-gray-300 mb-2">Performance</p>
                    <Progress 
                        value={(score/10) * 100}
                        className="h-3 bg-black/40 backdrop-blur-sm"
                    />
                </div>

                <div className="space-y-6 pt-4">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePlayAgain}
                        className="w-full text-white bg-gradient-to-r from-cyan-500 via-purple-500 to-rose-500 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                    >
                        Play Another Round
                    </motion.button>
                    
                    <div className="pt-6 flex flex-col items-center space-y-4">
                        <p className="text-gray-300 text-sm">Support Brain Battle's Growth</p>
                        <motion.a 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="https://github.com/Aayush0966/Brain-Battle"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 px-5 py-3 rounded-xl bg-black/40 hover:bg-black/60 transition-all duration-300 border border-gray-700 hover:border-purple-500 backdrop-blur-sm"
                        >
                            <svg 
                                className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span className="text-gray-300 group-hover:text-white transition-colors font-medium">
                                Star on GitHub
                            </span>
                            <div className="flex items-center justify-center w-7 h-7 bg-black/50 rounded-full text-xs text-white group-hover:bg-purple-600/50 transition-colors">
                                ★
                            </div>
                        </motion.a>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default QuizResult;