import type { Action } from '../../type/type';
import { useEffect } from 'react';

function Timer({
  dispatch,
  timeRemaining,
}: {
  dispatch: React.Dispatch<Action>;
  timeRemaining: number;
}) {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  const timer = `${Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, '0')}:${(timeRemaining % 60).toString().padStart(2, '0')}`;

  return <div className='timer'>{timer}</div>;
}

export default Timer;
