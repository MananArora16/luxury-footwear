"use client";

import { useState } from "react";

interface SurveyQuestionProps {
  id: number;
  question: string;
  description?: string;
  options: {
    id: string;
    label: string;
    value: string;
  }[];
  onAnswer: (questionId: number, answer: string) => void;
}

export function SurveyQuestion({
  id,
  question,
  description,
  options,
  onAnswer,
}: SurveyQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    onAnswer(id, value);
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-background to-secondary/10">
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-6 animate-fadeInUp">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-primary tracking-widest uppercase">
              Question {id} of 5
            </div>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground text-balance">
              {question}
            </h2>
            {description && (
              <p className="text-base text-muted-foreground">{description}</p>
            )}
          </div>

          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.value)}
                className={`w-full p-5 text-left border-2 rounded-lg transition-all duration-300 group ${
                  selected === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 bg-card/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      selected === option.value
                        ? "border-primary bg-primary"
                        : "border-border group-hover:border-primary"
                    }`}
                  >
                    {selected === option.value && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {option.label}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
