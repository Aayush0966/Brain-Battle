'use client'
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {getUserId} from "@/app/actions";
import {useRouter} from "next/navigation";

const QuizSetup = () => {
    const router = useRouter();
    const [isHovered, setIsHovered] = React.useState(false);
    const [preferences, setPreferences] = React.useState({
        category: '',
        difficulty: 'medium',
    });

    const categories = [
        { id: 'react', label: 'React Fundamentals' },
        { id: 'javascript', label: 'JavaScript' }
    ];

    const difficulties = [
        { id: 'beginner', label: 'Beginner' },
        { id: 'medium', label: 'Medium' }
    ];

    const handleSubmit = async () => {
        try {
            const response = await axios.get('/api/quiz', {
                params: {
                    ...preferences,
                    mode: 'guided',
                },
            });
            localStorage.removeItem('boardingDetails');
            localStorage.setItem('questions', JSON.stringify(response.data.questions));
            router.push('/game');
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl mx-auto"
        >
            <Card className="p-8  lg:backdrop-blur-lg rounded-xl bg-transparent shadow-xl border-slate-700">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    <h2 className="text-3xl font-bold text-center mb-8 text-white/90">
                        Quiz Setup
                    </h2>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label className="text-white/80">Category</Label>
                            <Select
                                value={preferences.category}
                                onValueChange={(value) => setPreferences(prev => ({ ...prev, category: value }))}
                            >
                                <SelectTrigger className="w-full bg-slate-800/50 border-slate-600">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-white/80">Difficulty</Label>
                            <Select
                                value={preferences.difficulty}
                                onValueChange={(value) => setPreferences(prev => ({ ...prev, difficulty: value }))}
                            >
                                <SelectTrigger className="w-full bg-slate-800/50 border-slate-600">
                                    <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    {difficulties.map((difficulty) => (
                                        <SelectItem key={difficulty.id} value={difficulty.id}>
                                            {difficulty.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <motion.div
                        className="pt-4"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            onClick={handleSubmit}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="w-full group relative overflow-hidden px-8 py-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl shadow-lg text-lg font-medium transition-all duration-300"
                        >
                            <motion.span
                                className="relative z-10 flex items-center justify-center gap-2"
                                animate={{ scale: isHovered ? 1.05 : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                Generate Quiz
                                <Sparkles className="w-5 h-5" />
                            </motion.span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                </motion.div>
            </Card>
        </motion.div>
    );
};

export default QuizSetup;