import React from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

const ModeSelection = ({setSelected, handleLevels, selected }) => {
    return (
        <div className="space-y-6 m-10 dark:text-white">
            <Select onValueChange={setSelected}>
                <SelectTrigger className="w-full h-12 text-lg ">
                    <SelectValue placeholder="Choose your journey"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="guided" className="text-base cursor-pointer py-3">
                        Guided Experience
                    </SelectItem>
                    <SelectItem value="custom" className="text-base cursor-pointer py-3">
                        Custom Experience
                    </SelectItem>
                </SelectContent>
            </Select>

            <Button
                onClick={handleLevels}
                disabled={!selected}
                className="w-full rounded-xl h-12 text-lg transition-all dark:bg-green-600 dark:hover:bg-green-500  duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
                Continue
            </Button>
        </div>

    )
}
export default ModeSelection
