import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const QuizHeader = ({ currentTheme, handleClose }) => {
    return (
        <motion.div 
            className="flex justify-between items-center"
            layout
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <motion.div className="flex items-center gap-4">
                {currentTheme.icon && (
                    <motion.img 
                        src={currentTheme.icon} 
                        alt={`${currentTheme.label} icon`} 
                        className="w-10 h-10 object-contain"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                    />
                )}
                <motion.h2 
                    className={`${currentTheme.textColor} font-bold text-xl sm:text-2xl`}
                    layout
                >
                    {currentTheme.label}
                </motion.h2>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                    onClick={handleClose}
                    variant="ghost"
                    className="text-gray-400 hover:text-gray-100 transition-all rounded-full p-2 hover:bg-gray-800"
                >
                    <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                        <X className="h-6 w-6" />
                    </motion.div>
                    <motion.span className="hidden sm:inline ml-2 mr-1">
                        Exit Quiz
                    </motion.span>
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default QuizHeader; 