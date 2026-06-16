import Options from './Options.tsx';
import type { Action, QuizQuestion } from '../../type/type.ts';

function Quiz({
  questions,
  index,
  dispatch,
  answer,
}: {
  questions: QuizQuestion[];
  index: number;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
}) {
  const question = questions[index];
  return (
    <div>
      <h2>{question.question}</h2>
      <Options
        options={question.options}
        dispatch={dispatch}
        answer={answer}
        question={question}
      />
    </div>
  );
}

export default Quiz;
