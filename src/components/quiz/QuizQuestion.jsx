import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const QuizQuestion = ({ 
    currentQuestion, 
    totalQuestions, 
    progress, 
    currentTheme, 
    questionText, 
    options, 
    selectedOption, 
    handleOptionSelect, 
    showResult 
}) => {
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
                                    className={`p-4 rounded-lg text-left transition-all duration-300 ${
                                        selectedOption === option
                                            ? `bg-${currentTheme.accentColor}-900/40 border border-${currentTheme.accentColor}-500/50 shadow-lg`
                                            : 'bg-gray-900/40 hover:bg-gray-800/40 border border-gray-700'
                                    } ${showResult && 'cursor-not-allowed'}`}
                                    disabled={showResult}
                                    whileHover={!showResult && { scale: 1.02 }}
                                    whileTap={!showResult && { scale: 0.98 }}
                                >
                                    <span className={selectedOption === option 
                                        ? `text-${currentTheme.accentColor}-300` 
                                        : 'text-gray-200'
                                    }>
                                        {option}
                                    </span>
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