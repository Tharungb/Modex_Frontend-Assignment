"use client";

import { useMemo, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number;
  tag?: string;
};

export default function Home() {
  const questions: Question[] = [
    {
      question: "What sound does a cat make?",
      options: ["Bark", "Meow", "Oink"],
      answer: 1,
      tag: "Animal basics",
    },
    {
      question: "What would you probably find in your fridge?",
      options: ["Shoes", "Ice Cream", "Books"],
      answer: 1,
      tag: "Common sense",
    },
    {
      question: "What color are ripe bananas?",
      options: ["Blue", "Yellow", "Red"],
      answer: 1,
      tag: "Everyday life",
    },
    {
      question: "How many stars are in the sky?",
      options: ["Two", "Countless", "One Hundred"],
      answer: 1,
      tag: "Space",
    },
  ];

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const isComplete = step >= questions.length;
  const currentQuestion = !isComplete ? questions[step] : null;

  const progressClass = useMemo(() => {
    if (isComplete) return "w-full";
    const pct = Math.round(((step + 1) / questions.length) * 100);
    if (pct <= 25) return "w-1/4";
    if (pct <= 50) return "w-2/4";
    if (pct <= 75) return "w-3/4";
    return "w-full";
  }, [isComplete, step, questions.length]);

  const handleNext = () => {
    if (isComplete || !currentQuestion) return;

    if (selected === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
    setSelected(null);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    setSelected(null);
    setStep((prev) => prev - 1);
  };

  const restartQuiz = () => {
    setStep(0);
    setScore(0);
    setSelected(null);
  };

  if (isComplete) {
    const percent = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-[#EAF7FF] flex items-center justify-center px-6 py-12 text-[#0A3D62]">
        <div className="w-full max-w-4xl rounded-3xl border border-white/70 bg-white shadow-2xl p-10">
          <div className="flex flex-col gap-4 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#DBF1FF] px-4 py-2 text-sm font-medium uppercase tracking-[0.2em] text-[#0A3D62]">
              <span>Well Played</span>
            </div>
            <h2 className="text-4xl font-semibold leading-tight">You finished the quiz</h2>
            <p className="text-sm text-gray-600">
              Keep the streak alive! Each round sharpens your intuition.
            </p>

            <div className="mx-auto mt-6 flex max-w-sm flex-col items-center justify-center gap-3 rounded-2xl bg-[#E4F4FF] px-8 py-6 shadow">
              <span className="text-sm uppercase tracking-[0.2em] text-gray-600">
                Final score
              </span>
              <span className="text-6xl font-bold text-[#0A3D62]">{percent}%</span>
              <span className="text-xs text-gray-600">
                {score} of {questions.length} correct
              </span>
            </div>

            <button
              onClick={restartQuiz}
              className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#DBF1FF] px-6 py-3 text-sm font-semibold text-[#0A3D62] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#63A4FF]"
            >
              Play again
              <span aria-hidden>↻</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#8BC6EC] to-[#63A4FF] text-[#0A3D62]">
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <header className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0A3D62]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live quiz session
            </div>
            <div className="flex items-center gap-2 text-xs text-[#0A3D62]">
              <span className="rounded-full bg-white/70 px-3 py-1">No timers</span>
              <span className="rounded-full bg-white/70 px-3 py-1">
                {questions.length} questions
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">Curiosity Lab</h1>
            <p className="text-sm text-[#0A3D62]/80">
              Freshened visual system with glassy cards, high contrast typography, and softer gradients.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr,1.4fr]">
          <section className="flex flex-col gap-4 rounded-3xl border border-white/80 bg-white/90 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#0A3D62]/80">Progress</p>
                <p className="text-3xl font-semibold">
                  {step + 1}
                  <span className="text-lg text-[#0A3D62]/70"> / {questions.length}</span>
                </p>
              </div>
              <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                +1 for each correct answer
              </div>
            </div>

            <div className="relative h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#63A4FF] via-[#8BC6EC] to-[#CDEBFF] transition-all ${progressClass}`}
                aria-hidden
              />
            </div>
            <div className="flex items-center justify-between text-xs text-[#0A3D62]/80">
              <span>Session completion</span>
              <span>
                {progressClass === "w-1/4"
                  ? "25%"
                  : progressClass === "w-2/4"
                  ? "50%"
                  : progressClass === "w-3/4"
                  ? "75%"
                  : "100%"}
              </span>
            </div>

            <div className="grid gap-3 rounded-2xl bg-[#F7FCFF] p-4">
              <div className="flex items-center justify-between text-sm text-[#0A3D62]">
                <span>Current streak</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                  {score} correct
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-[#0A3D62]">
                <span>Selected option</span>
                <span className="rounded-full bg-white px-3 py-1 text-[#0A3D62]">
                  {selected === null ? "Choose an answer" : currentQuestion.options[selected]}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-[#0A3D62]">
                <span>Category</span>
                <span className="rounded-full bg-[#DBE9FF] px-3 py-1 text-[#0A3D62]">
                  {currentQuestion.tag ?? "General"}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#DBE9FF] bg-white p-5 text-sm text-[#0A3D62]">
              <p className="font-semibold text-[#0A3D62]">How it works</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Pick the option that feels right; no penalties for trying.</li>
                <li>Use the back arrow to revisit any question instantly.</li>
                <li>Hit submit on the final step to see your new score.</li>
              </ul>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-white/80 bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#DBF1FF] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0A3D62]">
                Q{step + 1}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {currentQuestion.tag ?? "General"}
              </span>
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#0A3D62]/70">
                Question
              </p>
              <h2 className="text-2xl font-semibold">
                {currentQuestion.question}
              </h2>
            </div>

        <div className="mt-6 grid gap-4" role="radiogroup" aria-label="Quiz options">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selected === index;
                return (
                  <div key={option}>
                {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
                    <button
                  type="button"
                      onClick={() => setSelected(index)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left text-base transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                        isSelected
                      ? "border-[#63A4FF] bg-[#E4F4FF] shadow"
                      : "border-[#DBE9FF] bg-[#F7FCFF] hover:border-[#63A4FF] hover:bg-white"
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                    <span className="flex-1">{option}</span>
                        {isSelected ? (
                      <span className="rounded-full bg-white px-3 py-1 text-xs text-[#0A3D62]">
                            Selected
                          </span>
                        ) : (
                      <span className="text-xs text-[#0A3D62]/70">Tap to choose</span>
                        )}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full border border-[#DBE9FF] px-4 py-2 text-sm font-semibold text-[#0A3D62] transition hover:-translate-y-0.5 hover:border-[#63A4FF] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                ← Back
              </button>

              <button
                onClick={handleNext}
                disabled={selected === null}
                className="inline-flex items-center gap-2 rounded-full bg-[#DBF1FF] px-6 py-3 text-sm font-semibold text-[#0A3D62] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#63A4FF] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
              >
                {step === questions.length - 1 ? "Submit" : "Next step"} →
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
