import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Book, Clock, Brain, ChevronRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const GuidedMode = () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [isHovered, setIsHovered] = React.useState(false);
    const [preferences, setPreferences] = React.useState({
        category: '',
        difficulty: 'medium',
        questionCount: 10,
        timeLimit: 15
    });

    const categories = [
        { id: 'react', label: 'React Fundamentals', icon: <Book className="w-5 h-5" /> },
        { id: 'javascript', label: 'JavaScript', icon: <Brain className="w-5 h-5" /> },
        { id: 'typescript', label: 'TypeScript', icon: <Book className="w-5 h-5" /> }
    ];

    const steps = [
        {
            title: "Select Category",
            component: (
                <div className="space-y-4">
                    <RadioGroup
                        value={preferences.category}
                        onValueChange={(value) => setPreferences(prev => ({ ...prev, category: value }))}
                        className="grid grid-cols-1 gap-4"
                    >
                        {categories.map((category) => (
                            <Label
                                key={category.id}
                                className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 cursor-pointer"
                                htmlFor={category.id}
                            >
                                <RadioGroupItem value={category.id} id={category.id} />
                                <div className="flex items-center space-x-2">
                                    {category.icon}
                                    <span>{category.label}</span>
                                </div>
                            </Label>
                        ))}
                    </RadioGroup>
                </div>
            )
        },
        {
            title: "Select Difficulty",
            component: (
                <div className="space-y-4">
                    <RadioGroup
                        value={preferences.difficulty}
                        onValueChange={(value) => setPreferences(prev => ({ ...prev, difficulty: value }))}
                        className="grid grid-cols-1 gap-4"
                    >
                        {['beginner', 'medium', 'advanced'].map((level) => (
                            <Label
                                key={level}
                                className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 cursor-pointer"
                                htmlFor={level}
                            >
                                <RadioGroupItem value={level} id={level} />
                                <span className="capitalize">{level}</span>
                            </Label>
                        ))}
                    </RadioGroup>
                </div>
            )
        },
        {
            title: "Quiz Settings",
            component: (
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Label>Number of Questions ({preferences.questionCount})</Label>
                        <Slider
                            value={[preferences.questionCount]}
                            onValueChange={([value]) => setPreferences(prev => ({ ...prev, questionCount: value }))}
                            min={5}
                            max={20}
                            step={1}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Time per Question ({preferences.timeLimit} seconds)</Label>
                        <Slider
                            value={[preferences.timeLimit]}
                            onValueChange={([value]) => setPreferences(prev => ({ ...prev, timeLimit: value }))}
                            min={10}
                            max={60}
                            step={5}
                            className="w-full"
                        />
                    </div>
                </div>
            )
        }
    ];

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(preferences)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto space-y-8"
        >
            <Card className="p-6 bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-lg">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {steps[currentStep].title}
                    </h2>
                    {steps[currentStep].component}
                </motion.div>
            </Card>

            <div className="flex justify-between">
                {currentStep > 0 && (
                    <Button
                        onClick={() => setCurrentStep(prev => prev - 1)}
                        className="px-6 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-xl"
                    >
                        Back
                    </Button>
                )}

                <motion.div
                    className="ml-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        onClick={() => {
                            if (currentStep < steps.length - 1) {
                                setCurrentStep(prev => prev + 1);
                            } else {
                                handleSubmit();
                            }
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl shadow-lg text-lg font-medium transition-all duration-300"
                    >
                        <motion.span
                            className="relative z-10 flex items-center gap-2"
                            animate={{ x: isHovered ? [0, -4, 0] : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentStep === steps.length - 1 ? (
                                <>
                                    Generate Quiz
                                    <Sparkles className="w-5 h-5" />
                                </>
                            ) : (
                                <>
                                    Next
                                    <ChevronRight className="w-5 h-5" />
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
            </div>
        </motion.div>
    );
};

export default GuidedMode;