export type QuizQuestion = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type State = {
  questions: QuizQuestion[];
  status: 'loading' | 'ready' | 'error' | 'active' | 'finished' | 'restart';
  index: number;
  answer: number | null;
  points: number;
  timeRemaining: number;
};

export type Action =
  | { type: 'dataReceived'; payload: QuizQuestion[] }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'newAnswer'; payload: number }
  | { type: 'nextQuestion' }
  | { type: 'finish' }
  | { type: 'restart' }
  | { type: 'tick' };
