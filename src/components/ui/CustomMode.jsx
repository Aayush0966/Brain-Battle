import React from 'react';
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import {getQuestionPack, saveUserPrefs} from "@/app/actions";
import axios from "axios";
import {getQuestions} from "@/lib/GeminiClient";

const CustomMode = () => {
    const [isHovered, setIsHovered] = React.useState(false);

 const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userPrefs = e.target[0].value;
        const {userId, questionPack} = await getQuestionPack(userPrefs);
        localStorage.setItem('user', JSON.stringify(userId) );
        try {
            const response = await axios.post('/api/user', {userId, questionPack});
            console.log(response);

        }
        catch (error) {
            console.error("Error:  ", error);
        }
 }

    return (
        <motion.form
            onSubmit={handleFormSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 w-full max-w-2xl mx-auto"
        >
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                <Textarea

                    placeholder="Describe the type of quiz you want. For example: 'I want a quiz questions on advanced React topics.'"
                    className="min-h-[150px] w-full p-6 dark:text-gray-200 bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-lg border-2 border-transparent focus:border-purple-400 dark:focus:border-purple-500 focus:ring-0 resize-none text-lg transition-all duration-300"
                />
            </motion.div>

            <motion.div
                className="flex justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    type="submit"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="group relative overflow-hidden px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl shadow-lg text-lg font-medium transition-all duration-300"
                >
                    <motion.span
                        className="relative z-10 flex items-center gap-2"
                        animate={{ x: isHovered ? [0, -4, 0] : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        Generate Quiz
                        <Sparkles className="w-5 h-5" />
                    </motion.span>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
    );
};

export default CustomMode;