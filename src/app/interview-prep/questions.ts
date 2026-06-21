import rawQuestions from "./questions.json";

export interface Question {
  id: string;
  category: string;
  title: string;
  intro?: string;
  bullets?: string[];
  sampleAnswer?: string;
}

export const questions: Question[] = rawQuestions as Question[];
