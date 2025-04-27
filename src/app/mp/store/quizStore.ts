import {QuizType, StateQuizType} from "@/types";
import {create} from "zustand";
import {persist} from "zustand/middleware";

const quizStore = create<StateQuizType>()(
  persist(
    (set) => ({
      showQuiz: false,
      quiz: [] as Array<QuizType>, // Corrected the initialization of quiz
      totalScore: 0,
      setShowQuiz: () => set((state) => ({showQuiz: !state.showQuiz})),
      setQuiz: (quiz: Array<QuizType>) => set(() => ({quiz})), // Fixed parameter usage
      setTotalScore: (score) => set({totalScore: score}),
    }),
    {
      name: "user-storage", // Persisted storage name
    },
  ),
);

export default quizStore;
