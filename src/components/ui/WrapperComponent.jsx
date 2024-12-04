'use client'
import {BackgroundBeamsWithCollision} from "@/components/ui/background-beams-with-collision";
import {AnimatePresence, motion} from "framer-motion";
import {Book, Brain, Rocket, Trophy} from "lucide-react";
import LandingPage from "@/pages/LandingPage";
import BoardingPage from "@/pages/BoardingPage"

const WrapperComponent = (props) => {
    return (
        <BackgroundBeamsWithCollision className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-purple-100 dark:from-black dark:to-slate-900 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 text-center px-8 py-12 rounded-3xl backdrop-blur-md bg-white/20 dark:bg-black/30 shadow-2xl border border-white/20 w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[400px]"
            >
                <motion.div
                    className="w-full flex flex-col items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2
                    }}
                >
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Brain className="w-20 h-20 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
                    </motion.div>
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-8"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: "300% 300%"
                        }}
                    >
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 text-transparent bg-clip-text">
                            Brain Battle
                        </span>
                    </motion.h1>

                    <div className="w-full flex justify-center">
                        {props.type === 'lp' ? <LandingPage /> : <BoardingPage />}
                    </div>
                </motion.div>
            </motion.div>
        </BackgroundBeamsWithCollision>
    )
}
export default WrapperComponent
