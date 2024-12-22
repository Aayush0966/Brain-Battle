import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Brain, Wand2 } from "lucide-react";
import { getQuestionPack } from "@/app/actions";
import { processQuizData } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const CustomMode = () => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [charCount, setCharCount] = React.useState(0);
    const router = useRouter();
    const textareaRef = React.useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setCharCount(e.target.value.length);
    };

    const mapQuestions = (questions) => {
        return questions.map((q) => ({
            questionText: q.question,
            options: JSON.stringify({ options: q.options }),
            correctAnswer: q.answer,
            explanation: q.explanation,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {userId, questionPack} = await getQuestionPack(inputValue);
            localStorage.setItem('user', JSON.stringify(userId));
            const {title, questions} = processQuizData(questionPack);
            const questionList = mapQuestions(questions);
            localStorage.setItem('questions', JSON.stringify(questionList));
            router.push("/game");
        } catch (error) {
            console.error('Error generating quiz:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl space-y-2"
            >

                <motion.form
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                >
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="I want a quiz about..."
                            className="min-h-[200px] w-full p-6 text-lg rounded-xl shadow-lg 
                                     border-2 transition-all duration-300 
                                     bg-white/90 dark:bg-slate-800/90
                                     border-purple-200 dark:border-purple-900
                                     focus:border-purple-500 dark:focus:border-purple-400
                                     placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                        <AnimatePresence>
                            {inputValue && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute right-4 bottom-4 flex items-center gap-2 text-sm text-gray-500"
                                >
                                    <Wand2 className="w-4 h-4" />
                                    {charCount} characters
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        className="flex justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            disabled={loading || !inputValue.trim()}
                            type="submit"
                            className="relative group px-8 py-6 rounded-xl text-lg font-medium
                                     bg-gradient-to-r from-purple-600 to-blue-600 
                                     hover:from-purple-500 hover:to-blue-500 
                                     text-white shadow-lg transition-all duration-300
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <motion.span
                                className="relative z-10 flex items-center gap-2"
                                animate={{ x: isHovered ? [0, -4, 0] : 0 }}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Crafting Your Quiz...
                                    </>
                                ) : (
                                    <>
                                        Generate Magic
                                        <Sparkles className="w-5 h-5" />
                                    </>
                                )}
                            </motion.span>
                            <motion.div
                                className="absolute inset-0 rounded-xl bg-gradient-to-r 
                                         from-purple-400 to-blue-400 opacity-0 
                                         group-hover:opacity-100 transition-opacity duration-300"
                                animate={{
                                    scale: isHovered ? [1, 1.5] : 1,
                                    opacity: isHovered ? [0, 0.3, 0] : 0
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            />
                        </Button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </div>
    );
};

export default CustomMode;