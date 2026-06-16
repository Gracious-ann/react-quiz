import type { Action, QuizQuestion } from '../../type/type';

function Options({
  options,
  dispatch,
  answer,
  question,
}: {
  options: string[];
  dispatch: React.Dispatch<Action>;
  answer: number | null;
  question: QuizQuestion;
}) {
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
      {options.map((option, index) => (
        <button
          disabled={hasAnswered}
          className={`btn btn-option ${answer === index ? 'answer' : ''} ${hasAnswered && index === question.correctOption ? 'correct' : hasAnswered && index !== question.correctOption ? 'wrong' : ''}`}
          key={option}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
