'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ArrowRight, AlertCircle, BookOpen, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import QuizResult from "@/components/QuizResult";
import toast from "react-hot-toast";

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

    useEffect(() => {
        const questions = JSON.parse(localStorage.getItem('questions'));
        if (!questions) {
            window.location.href = '/home';
            return;
        }
        setQuestionList(questions);
        setTotalQuestions(Object.keys(questions).length);
        const optionArr = JSON.parse(questions[currentQuestion]?.options);
        setOptions(optionArr.options);
    }, [currentQuestion]);

    const handleSubmit = () => {
        if (!selectedOption) {
            return;
        }
        const isCorrect = selectedOption === questionList[currentQuestion]?.correctAnswer;
        if (isCorrect) {
            setScore(score + 1);
        }
        setCorrect(isCorrect);
        setShowResult(true);
        const explanation = questionList[currentQuestion]?.explanation
        toast.custom((t) => (
            <div className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <BookOpen className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                Explanation
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {explanation}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        ));
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption('');
            setCorrect(null);
            setShowResult(false);
        }
        else{
            setIsGameOver(true);
        }

    };

    const handleClose = () => {
        localStorage.removeItem('questions');
        window.location.href = '/home';
    };

    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    return (
        <div className="text-gray-100 overflow-auto h-full p-4 sm:p-6 md:p-12">
            {
                isGameOver &&
                <QuizResult score={score} />
            }
            {!isGameOver && <div className="max-w-4xl mx-auto">
                <div className="flex justify-end mb-4">
                    <Button
                        onClick={handleClose}
                        variant="ghost"
                        className="text-gray-400 hover:text-gray-100"
                    >
                        <X className="h-5 w-5" />
                        <span className="ml-2">Close Quiz</span>
                    </Button>
                </div>
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-300">Question {currentQuestion + 1} of {totalQuestions}</span>
                        <span className="text-sm font-medium text-gray-300">{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-gray-800"/>
                </div>
                <Card className="mb-8 bg-black">
                    <CardContent className="pt-6">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-100">
                            {questionList[currentQuestion]?.questionText}
                        </h1>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {options && options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => !showResult && setSelectedOption(option)}
                                    className={`p-4 rounded-lg text-left transition-all ${
                                        selectedOption === option
                                            ? 'bg-blue-900/50 border-2 border-blue-500'
                                            : 'bg-gray-800 hover:bg-gray-700'
                                    } ${showResult && 'cursor-not-allowed'}`}
                                    disabled={showResult}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {showResult && (
                    <div className="space-y-4 mb-6">
                        <Alert
                            className={`${correct ? 'bg-green-900/20 border-green-800' : 'bg-red-900/20 border-red-800'}`}>
                            {correct ? (
                                <CheckCircle className="h-5 w-5 text-green-500"/>
                            ) : (
                                <XCircle className="h-5 w-5 text-red-500"/>
                            )}
                            <AlertDescription className={`ml-2 ${correct ? 'text-green-500' : 'text-red-500'}`}>
                                {correct ? "Correct! Well done!" : `Incorrect. The correct answer was: ${questionList[currentQuestion]?.correctAnswer}`}
                            </AlertDescription>
                        </Alert>

                    </div>
                )}

                <div className="flex justify-between gap-4 items-center">
                    <Button
                        onClick={handleSubmit}
                        disabled={!selectedOption || showResult}
                        className={`px-8 py-2 bg-blue-600 hover:bg-blue-700 ${
                            !selectedOption || showResult ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Submit Answer
                    </Button>

                    {showResult && (
                        <Button
                            onClick={handleNext}
                            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700"
                            variant="outline"
                        >
                            Next Question
                            <ArrowRight className="h-4 w-4"/>
                        </Button>
                    )}
                </div>

                {!selectedOption && !showResult && (
                    <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4"/>
                        Please select an answer to continue
                    </div>
                )}
            </div>}
        </div>
    );
};

export default GamePage;