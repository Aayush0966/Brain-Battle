'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from "lucide-react";
import QuizResult from "@/components/QuizResult";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizFooter from "@/components/quiz/QuizFooter";
import { themeConfigs } from "@/lib/constants";

const GamePage = () => {
    const [questionList, setQuestionList] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [correct, setCorrect] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [quizTheme, setQuizTheme] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const currentTheme = themeConfigs[quizTheme] || themeConfigs.default;

    useEffect(() => {
        const loadInitialQuestions = async () => {
            setIsLoading(true);
            const questions = JSON.parse(localStorage.getItem('questions'));
            const prefs = JSON.parse(localStorage.getItem('prefs'));
            
            if (!questions) {
                window.location.href = '/home';
                return;
            }

            if (prefs?.category) {
                setQuizTheme(prefs.category);
            }

            setQuestionList(questions);
            setTotalQuestions(Object.keys(questions).length);
            const optionArr = JSON.parse(questions[0]?.options);
            setOptions(optionArr.options);
            setIsLoading(false);
        };

        loadInitialQuestions();
    }, []);

    useEffect(() => {
        if (questionList[currentQuestion]) {
            const optionArr = JSON.parse(questionList[currentQuestion].options);
            setOptions(optionArr.options);
        }
    }, [currentQuestion, questionList]);

    const handleOptionSelect = (option) => {
        if (!showResult) {
            setSelectedOption(option);
        }
    };

    const handleSubmit = () => {
        if (!showResult && selectedOption) {
            const isCorrect = selectedOption === questionList[currentQuestion]?.correctAnswer;
            if (isCorrect) setScore(score + 1);
            setCorrect(isCorrect);
            setShowResult(true);
        }
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption('');
            setCorrect(null);
            setShowResult(false);
        } else {
            setIsGameOver(true);
        }
    };

    const handleClose = () => {
        localStorage.removeItem('questions');
        localStorage.removeItem('prefs');
        window.location.href = '/home';
    };

    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    if (isLoading) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full min-h-[60vh]"
            >
                <div className="text-center space-y-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <Trophy className="w-12 h-12 text-purple-500" />
                    </motion.div>
                    <p className="text-gray-400">Loading your quiz...</p>
                </div>
            </motion.div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            {isGameOver ? (
                <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    <QuizResult score={score} />
                </motion.div>
            ) : (
                <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-4xl mx-auto overflow-hidden"
                >
                    <motion.div className="space-y-6">
                        <QuizHeader 
                            currentTheme={currentTheme}
                            handleClose={handleClose}
                        />
                        
                        <QuizQuestion 
                            currentQuestion={currentQuestion}
                            totalQuestions={totalQuestions}
                            progress={progress}
                            currentTheme={currentTheme}
                            questionText={questionList[currentQuestion]?.questionText}
                            options={options}
                            selectedOption={selectedOption}
                            handleOptionSelect={handleOptionSelect}
                            showResult={showResult}
                            correctAnswer={questionList[currentQuestion]?.correctAnswer}
                        />

                        <QuizFooter 
                            showResult={showResult}
                            correct={correct}
                            currentTheme={currentTheme}
                            correctAnswer={questionList[currentQuestion]?.correctAnswer}
                            explanation={questionList[currentQuestion]?.explanation}
                            selectedOption={selectedOption}
                            handleNext={handleNext}
                            handleSubmit={handleSubmit}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GamePage;