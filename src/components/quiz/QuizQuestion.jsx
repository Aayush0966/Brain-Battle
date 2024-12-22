import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle } from "lucide-react";

const QuizQuestion = ({ 
    currentQuestion, 
    totalQuestions, 
    progress, 
    currentTheme, 
    questionText, 
    options, 
    selectedOption, 
    handleOptionSelect, 
    showResult,
    correctAnswer
}) => {
    console.log(correctAnswer)
    return (
        <>
            <motion.div layout transition={{ duration: 0.3, ease: "easeInOut" }}>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-300">
                        Question {currentQuestion + 1} of {totalQuestions}
                    </span>
                    <span className="text-sm font-medium text-gray-300">
                        {Math.round(progress)}% Complete
                    </span>
                </div>
                <Progress 
                    value={progress} 
                    className={`h-2 bg-gray-800 [&>div]:bg-${currentTheme.accentColor}-500`}
                />
            </motion.div>

            <motion.div layout transition={{ duration: 0.5, ease: "easeInOut" }}>
                <Card className="bg-black/30 backdrop-blur-sm border-gray-800 shadow-xl">
                    <CardContent className="p-6">
                        <motion.h1 
                            className={`text-lg sm:text-xl md:text-2xl font-bold mb-6 ${currentTheme.textColor}`}
                            layout
                        >
                            {questionText}
                        </motion.h1>

                        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" layout>
                            {options?.map((option, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`p-4 rounded-lg text-left transition-all duration-300 relative ${
                                        showResult
                                            ? option === correctAnswer
                                                ? `bg-green-900/40 border-green-500/50`
                                                : selectedOption === option
                                                    ? `bg-red-900/40 border-red-500/50`
                                                    : 'bg-gray-900/40 border-gray-700'
                                            : selectedOption === option
                                            ? `bg-${currentTheme.accentColor}-900/40 border border-${currentTheme.accentColor}-500/50 shadow-lg`
                                            : 'bg-gray-900/40 hover:bg-gray-800/40 border border-gray-700'
                                    } ${showResult && 'cursor-not-allowed'}`}
                                    disabled={showResult}
                                    whileHover={!showResult && { scale: 1.02 }}
                                    whileTap={!showResult && { scale: 0.98 }}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className={
                                            showResult
                                                ? option === correctAnswer
                                                    ? 'text-green-300'
                                                    : selectedOption === option
                                                        ? 'text-red-300'
                                                        : 'text-gray-200'
                                                : selectedOption === option
                                                    ? `text-${currentTheme.accentColor}-300`
                                                    : 'text-gray-200'
                                        }>
                                            {option}
                                        </span>
                                        {showResult && (option === correctAnswer || selectedOption === option) && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {option === correctAnswer ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <XCircle className="h-5 w-5 text-red-500" />
                                                )}
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    );
};

export default QuizQuestion; 