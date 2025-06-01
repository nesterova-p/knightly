import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const DiamondIcon = ({ count, isSelected }) => (
    <div className="flex gap-0.5">
        {[...Array(4)].map((_, index) => (
            <div
                key={index}
                className={`w-2.5 h-2.5 transform rotate-45 ${
                    index < count
                        ? isSelected
                            ? "bg-white"
                            : "bg-primary"
                        : "bg-gray-200"
                }`}
            />
        ))}
    </div>
);

export default function DifficultySelector({ onDifficultyChange, initialDifficulty = "Easy" }) {
    const difficultyLevels = [
        {
            name: "Trivial",
            diamonds: 1,
            description: "Very simple tasks that require minimal effort. Perfect for building momentum and daily routines.",
            color: "bg-green-100 text-green-800 border-green-200"
        },
        {
            name: "Easy",
            diamonds: 2,
            description: "Simple challenges that are manageable but still require some commitment and consistency.",
            color: "bg-blue-100 text-blue-800 border-blue-200"
        },
        {
            name: "Medium",
            diamonds: 3,
            description: "Moderate challenges that require regular effort and dedication. Good for building stronger habits.",
            color: "bg-yellow-100 text-yellow-800 border-yellow-200"
        },
        {
            name: "Hard",
            diamonds: 4,
            description: "Difficult challenges that demand significant commitment and determination. Maximum rewards await!",
            color: "bg-red-100 text-red-800 border-red-200"
        }
    ];

    const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState("");

    useEffect(() => {
        if (onDifficultyChange) {
            onDifficultyChange(selectedDifficulty);
        }
    }, [selectedDifficulty, onDifficultyChange]);

    const handleDifficultySelect = (difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    const handleTooltipShow = (description) => {
        setTooltipContent(description);
        setShowTooltip(true);
    };

    const handleTooltipHide = () => {
        setShowTooltip(false);
        setTooltipContent("");
    };

    return (
        <div className="mb-6 relative">
            {/* header + info */}
            <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-600">Adventure Difficulty</span>
                <div className="relative">
                    <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="text-gray-400 cursor-help w-4 h-4"
                        onMouseEnter={() => handleTooltipShow("Choose difficulty to determine experience points and rewards. Higher difficulty means greater challenges but bigger rewards!")}
                        onMouseLeave={handleTooltipHide}
                    />

                    {/* tooltip  */}
                    {showTooltip && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-800 text-white text-xs rounded-lg p-3 z-50">
                            <div className="relative">
                                {tooltipContent}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {difficultyLevels.map((level) => (
                    <button
                        key={level.name}
                        type="button"
                        onClick={() => handleDifficultySelect(level.name)}
                        onMouseEnter={() => handleTooltipShow(level.description)}
                        onMouseLeave={handleTooltipHide}
                        className={`
                            relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 min-h-[80px]
                            ${selectedDifficulty === level.name
                            ? "bg-primary text-white border-primary shadow-md transform scale-105"
                            : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:shadow-sm"
                        }
                        `}
                    >
                        <div className="mb-2">
                            <DiamondIcon
                                count={level.diamonds}
                                isSelected={selectedDifficulty === level.name}
                            />
                        </div>
                        <span className="text-xs font-medium text-center">
                            {level.name}
                        </span>
                        {selectedDifficulty === level.name && (
                            <div className="absolute inset-0 rounded-lg border-2 border-primary opacity-50 animate-pulse"></div>
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                <div className="flex items-start gap-2">
                    <DiamondIcon
                        count={difficultyLevels.find(level => level.name === selectedDifficulty)?.diamonds || 2}
                        isSelected={false}
                    />
                    <div>
                        <span className="font-medium text-sm text-gray-800">
                            {selectedDifficulty} Challenge
                        </span>
                        <p className="text-xs text-gray-600 mt-1">
                            {difficultyLevels.find(level => level.name === selectedDifficulty)?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}