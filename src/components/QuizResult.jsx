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
            <div>
                <button onClick={handlePlayAgain} className="text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-4 py-2 rounded-lg shadow-lg hover:from-purple-500 hover:to-red-400">
                    Play Again
                </button>
            </div>
        </Card>
    );
};

export default QuizResult;