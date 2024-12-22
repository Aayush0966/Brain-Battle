import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowRight, AlertCircle, BookOpen } from "lucide-react";

const QuizFooter = ({
    showResult,
    correct,
    currentTheme,
    correctAnswer,
    explanation,
    selectedOption,
    handleNext,
    handleSubmit
}) => {
    return (
        <>
            <AnimatePresence mode="wait">
                {showResult && (
                    <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <Card className="bg-black/40 backdrop-blur-sm border border-gray-800 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex gap-4 items-start">
                                    <div className={`p-3 rounded-full bg-${currentTheme.accentColor}-500/10`}>
                                        <BookOpen className={`h-6 w-6 text-${currentTheme.accentColor}-400`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-lg font-semibold ${currentTheme.textColor} mb-3`}>
                                            Let's understand why
                                        </h3>
                                        <motion.p 
                                            className="text-gray-300 leading-relaxed"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {explanation}
                                        </motion.p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div className="flex justify-end gap-4 items-center" layout>
                <Button
                    onClick={showResult ? handleNext : handleSubmit}
                    disabled={!selectedOption && !showResult}
                    className={`px-6 py-2 bg-${currentTheme.accentColor}-600 hover:bg-${currentTheme.accentColor}-700 transition-all duration-300 disabled:opacity-50 flex items-center gap-2`}
                >
                    {showResult ? (
                        <>
                            <span>Next Question</span>
                            <ArrowRight className="h-4 w-4"/>
                        </>
                    ) : (
                        "Submit Answer"
                    )}
                </Button>
            </motion.div>

            <AnimatePresence mode="wait">
                {!selectedOption && !showResult && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="text-sm text-gray-400 flex items-center gap-2"
                    >
                        <AlertCircle className="h-4 w-4"/>
                        Please select an answer to continue
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default QuizFooter; 