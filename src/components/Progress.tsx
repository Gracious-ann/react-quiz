function Progress({
  index,
  numQuestions,
  maxPoints,
  points,
  answer,
}: {
  index: number;
  numQuestions: number;
  maxPoints: number;
  answer: number | null;
  points: number;
}) {
  return (
    <div className='progress'>
      <progress
        value={index + Number(answer !== null)}
        max={numQuestions}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> of {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </div>
  );
}
export default Progress;
