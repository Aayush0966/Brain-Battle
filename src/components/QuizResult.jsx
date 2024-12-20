import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Card } from '@/components/ui/card';

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
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FFD700', '#7B68EE', '#FF69B4', '#00FA9A']
            });

            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FFD700', '#7B68EE', '#FF69B4', '#00FA9A']
            });
        }, 50);

        return () => clearInterval(confettiInterval);
    }, []);

    return (
        <Card className="bg-black text-white p-8 rounded-lg shadow-2xl max-w-md mx-auto text-center space-y-6">
            <div className="animate-bounce">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    Congratulations! 🎉
                </h1>
            </div>

            <div className="mt-8 space-y-4">
                <p className="text-2xl font-semibold text-gray-300">
                    Quiz Completed
                </p>
                <div className="text-5xl font-bold">
                    <span className="text-green-400">{score}</span>
                    <span className="text-gray-400">/10</span>
                </div>
            </div>

            <div className="mt-6">
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000 ease-out"
                        style={{ width: `${(score/10) * 100}%` }}
                    />
                </div>
            </div>
            <div className="space-y-4">
                <button onClick={handlePlayAgain} className="text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-4 py-2 rounded-lg shadow-lg hover:from-purple-500 hover:to-red-400">
                    Play Again
                </button>
                
                <div className="pt-4 flex flex-col items-center space-y-4">
                    <p className="text-gray-400 text-sm">Help us improve Brain Battle!</p>
                    <a 
                        href="https://github.com/Aayush0966/Brain-Battle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 hover:border-gray-500"
                    >
                        <svg 
                            className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span className="text-gray-400 group-hover:text-white transition-colors">
                            Star us on GitHub
                        </span>
                        <div className="flex items-center justify-center w-6 h-6 bg-gray-700 rounded-full text-xs text-white group-hover:bg-gray-600 transition-colors">
                            ★
                        </div>
                    </a>
                </div>
            </div>
        </Card>
    );
};

export default QuizResult;