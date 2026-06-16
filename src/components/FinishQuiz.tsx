import type { Action } from '../../type/type';

function FinishQuiz({
  points,
  maxPoints,
  dispatch,
}: {
  points: number;
  maxPoints: number;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <>
      <p className='result'>
        Finished! You scored {points} out of {maxPoints} points.
      </p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishQuiz;
