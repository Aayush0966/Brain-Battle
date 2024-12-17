import React from 'react';
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import {getQuestionPack} from "@/app/actions";
import axios from "axios";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CustomMode = () => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()

 const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userPrefs = e.target[0].value;
        const {userId, questionPack} = await getQuestionPack(userPrefs);
        localStorage.setItem('user', JSON.stringify(userId) );
        const response = await axios.post('/api/quiz', {
            userId, 
            questionPack
        })
        setLoading(false)
        if (response.status !== 201) {
            toast.error("Something went wrong")
        }
        toast.success(response.data.message)
        const questions = response?.data?.questionList;
        localStorage.setItem('questions', JSON.stringify(questions));  
        router.push("/game")
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
                    disabled={loading}
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
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating Quiz...
                            </>
                        ) : (
                            <>
                                Generate Quiz
                                <Sparkles className="w-5 h-5" />
                            </>
                        )}
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