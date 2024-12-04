'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Stars, Rocket, Brain, Book, Trophy } from 'lucide-react';
import {BackgroundBeamsWithCollision} from "@/components/ui/background-beams-with-collision";
import {useRouter} from "next/navigation";
const LandingPage = () => {
    const quotes = [
        "Challenge Your Mind, Expand Your Horizons",
        "Where Knowledge Meets Fun",
        "Think Fast, Learn Faster",
        "Exercise Your Brain Daily"
    ];
    const router = useRouter()


    const handleClick = () => {
        console.log("Start Your Journey");
        router.push("/home");
    }


    const [currentQuote, setCurrentQuote] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
       <motion.div>

                <div className="h-8 mb-8 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentQuote}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-lg text-slate-700 dark:text-slate-300"
                        >
                            {quotes[currentQuote]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {[
                        { icon: Brain, text: "Mind-Bending Challenges" },
                        { icon: Trophy, text: "Compete Globally" },
                        { icon: Book, text: "Learn as You Play" }
                    ].map(({ icon: Icon, text }, index) => (
                        <motion.div
                            key={text}
                            variants={{
                                hidden: { y: 20, opacity: 0 },
                                visible: { y: 0, opacity: 1 }
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            className="p-4 rounded-xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm"
                        >
                            <Icon className="w-8 h-8 mx-auto mb-2 text-purple-500 dark:text-purple-400" />
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{text}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.button
                    onClick={handleClick}

                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto overflow-hidden"
                >
                    <motion.span
                        className="relative z-10"
                        animate={{
                            color: ["#fff", "#f0f0ff", "#fff"],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        Start Your Journey
                    </motion.span>
                    <motion.div
                        className="w-5 h-5"
                        whileHover={{ x: 5 }}
                    >
                        <Rocket className="w-full h-full" />
                    </motion.div>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0, 0.3, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.button>
            </motion.div>

    );
};

export default LandingPage;