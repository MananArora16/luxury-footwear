"use client";

import { Navbar } from "@/components/navbar";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { SurveyQuestion } from "@/components/survey-question";
import { useAnalytics, trackEvent } from "@/hooks/use-analytics";
import { useState, useEffect } from "react";

const surveyQuestions = [
  {
    id: 1,
    question: "What's your preferred footwear style?",
    description: "Choose the style that best matches your personality",
    options: [
      { id: "formal", label: "Formal & Elegant", value: "formal" },
      { id: "casual", label: "Casual & Comfortable", value: "casual" },
      { id: "sporty", label: "Sporty & Dynamic", value: "sporty" },
      { id: "eclectic", label: "Eclectic & Unique", value: "eclectic" },
    ],
  },
  {
    id: 2,
    question: "How important is comfort to you?",
    description: "Select your priority level",
    options: [
      {
        id: "critical",
        label: "Critical - I need maximum comfort",
        value: "critical",
      },
      {
        id: "important",
        label: "Very Important - It matters a lot",
        value: "important",
      },
      {
        id: "moderate",
        label: "Moderate - Balance with style",
        value: "moderate",
      },
      { id: "secondary", label: "Secondary - Style first", value: "secondary" },
    ],
  },
  {
    id: 3,
    question: "Which material appeals to you most?",
    description: "Choose your preferred material",
    options: [
      { id: "leather", label: "Premium Leather", value: "leather" },
      { id: "silk", label: "Silk & Velvet", value: "silk" },
      {
        id: "sustainable",
        label: "Sustainable & Eco-friendly",
        value: "sustainable",
      },
      { id: "mixed", label: "Mixed Materials", value: "mixed" },
    ],
  },
  {
    id: 4,
    question: "How often do you wear footwear?",
    description: "Select your usage pattern",
    options: [
      { id: "daily", label: "Daily - For work & events", value: "daily" },
      {
        id: "frequent",
        label: "Frequent - Several times a week",
        value: "frequent",
      },
      {
        id: "occasional",
        label: "Occasional - Special occasions",
        value: "occasional",
      },
      {
        id: "seasonal",
        label: "Seasonal - Weather dependent",
        value: "seasonal",
      },
    ],
  },
  {
    id: 5,
    question: "What's your lifestyle type?",
    description: "Choose what best describes you",
    options: [
      { id: "luxury", label: "Luxury Enthusiast", value: "luxury" },
      {
        id: "minimalist",
        label: "Minimalist & Practical",
        value: "minimalist",
      },
      { id: "trendy", label: "Trendy & Fashion-forward", value: "trendy" },
      { id: "classic", label: "Classic & Timeless", value: "classic" },
    ],
  },
];

export default function SurveyPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Initialize Google Analytics
  useAnalytics();

  useEffect(() => {
    trackEvent("page_view", {
      page_title: "Survey",
      page_path: "/survey",
      timestamp: new Date().toISOString(),
    });
  }, []);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
    trackEvent("form_input_selected", {
      question_id: questionId,
      answer: answer,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    trackEvent("button_clicked", {
      button_name: "submit_survey",
      answers_count: Object.keys(answers).length,
    });

    try {
      const response = await fetch("/api/survey-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers, surveyQuestions }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit survey");
      }

      trackEvent("survey_submitted", {
        answers_count: Object.keys(answers).length,
        timestamp: new Date().toISOString(),
      });

      setSubmitted(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit survey";
      setSubmitError(errorMessage);
      if (typeof window !== "undefined" && window.console) {
        window.console.error("Submission error:", errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isComplete = Object.keys(answers).length === surveyQuestions.length;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center px-4">
        <Navbar />
        <div className="max-w-2xl w-full text-center space-y-8 pt-20">
          <div className="space-y-4">
            <div className="text-6xl font-light text-primary mb-6">✓</div>
            <h1 className="text-5xl font-light text-foreground">Thank You!</h1>
            <p className="text-xl text-muted-foreground">
              Your survey responses have been recorded. We'll use your
              preferences to recommend the perfect Muvez footwear for you.
            </p>
          </div>

          <div className="bg-card/50 border border-border rounded-lg p-8 text-left space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Your Preferences
            </h3>
            {surveyQuestions.map((q) => (
              <div
                key={q.id}
                className="flex justify-between items-start border-b border-border pb-4 last:border-b-0"
              >
                <p className="font-medium text-foreground">{q.question}</p>
                <p className="text-primary font-semibold ml-4">
                  {q.options.find((opt) => opt.value === answers[q.id])?.label}
                </p>
              </div>
            ))}
          </div>

          <a
            href="/"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-sm hover:bg-accent transition-all duration-300 font-medium tracking-wide"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar />
      <ScrollProgressBar />

      {/* Intro Section */}
      <section className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pt-20 bg-gradient-to-b from-background to-secondary/10">
        <div className="w-full max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase">
              Interactive Survey
            </p>
            <h1 className="text-5xl sm:text-6xl font-light text-foreground text-balance">
              Find Your Perfect{" "}
              <span className="font-semibold text-primary">Muvez</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Survey Questions */}
      {surveyQuestions.map((question) => (
        <SurveyQuestion
          key={question.id}
          {...question}
          onAnswer={handleAnswer}
        />
      ))}

      {/* Completion Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-secondary/10 to-background">
        <div className="w-full max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-light text-foreground text-balance">
              {isComplete ? "Ready to Continue?" : "Complete the Survey"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isComplete
                ? "You've answered all questions. Submit to see your personalized recommendations."
                : `You've answered ${Object.keys(answers).length} of ${
                    surveyQuestions.length
                  } questions.`}
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isComplete || isSubmitting}
            className={`px-8 py-4 rounded-sm font-medium tracking-wide transition-all mr-3 duration-300 ${
              isComplete && !isSubmitting
                ? "bg-primary text-primary-foreground hover:bg-accent"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Submitting..." : isComplete ? "Submit Survey" : "Complete All Questions to Submit"}
          </button>

          {submitError && (
            <p className="text-destructive font-medium">{submitError}</p>
          )}

          <a
            href="/"
            onClick={() => {
              trackEvent("button_clicked", {
                button_name: "back_to_home_survey",
              });
            }}
            className="inline-block text-primary hover:text-accent transition-colors font-medium"
          >
            Back to Home
          </a>
        </div>
      </section>
    </div>
  );
}
