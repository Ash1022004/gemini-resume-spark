import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const mockResumes = [
  {
    id: 1,
    name: "Jamie Smith",
    title: "Senior Product Manager",
    color: "bg-gradient-to-br from-blue-50 to-white",
    borderColor: "border-blue-200",
  },
  {
    id: 2,
    name: "Alex Johnson", 
    title: "Full Stack Developer",
    color: "bg-gradient-to-br from-green-50 to-white",
    borderColor: "border-green-200",
  },
  {
    id: 3,
    name: "Sarah Wilson",
    title: "UX/UI Designer", 
    color: "bg-gradient-to-br from-purple-50 to-white",
    borderColor: "border-purple-200",
  }
];

const RotatingResumePreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockResumes.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentResume = mockResumes[currentIndex];

  return (
    <div className="relative">
      <div className="relative perspective-1000">
        <Card 
          className={`
            ${currentResume.color} ${currentResume.borderColor}
            w-80 h-96 p-6 border-2 shadow-xl
            transition-all duration-500 ease-in-out
            ${isAnimating ? 'transform rotate-y-90 scale-95' : 'transform rotate-y-0 scale-100'}
            hover:shadow-2xl hover:scale-105
          `}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">
                {currentResume.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{currentResume.name}</h3>
              <p className="text-sm text-gray-600">{currentResume.title}</p>
            </div>
          </div>

          {/* Mock Resume Content */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">EXPERIENCE</h4>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">SKILLS</h4>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-primary/20 rounded-full w-16"></div>
                <div className="h-6 bg-primary/20 rounded-full w-20"></div>
                <div className="h-6 bg-primary/20 rounded-full w-14"></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">EDUCATION</h4>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 left-6 flex gap-2">
            {mockResumes.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-2 right-1/3 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

export default RotatingResumePreview;