import '../App.css';
import Main from './Main.tsx';
import Header from './Header.tsx';
import { useEffect, useReducer } from 'react';
import Loader from '../Loader.tsx';
import ErrorMessage from '../ErrorMessage.tsx';
import StartScreen from './StartScreen.tsx';
import Quiz from './Quiz.tsx';
import type { State, Action } from '../../type/type.ts';
import NextButton from './NextButton.tsx';
import Progress from './Progress.tsx';
import FinishQuiz from './FinishQuiz.tsx';
import Footer from './Footer.tsx';
import Timer from './Timer.tsx';

const initialState: State = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  timeRemaining: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        timeRemaining: state.questions.length * 30,
      };
    case 'newAnswer': {
      const question = state.questions.at(state.index);
      const isCorrect = question?.correctOption === action.payload;
      return {
        ...state,
        points: isCorrect ? state.points + question?.points : state.points,
        answer: action.payload,
      };
    }
    case 'nextQuestion': {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case 'finish': {
      return { ...state, status: 'finished', index: 0, answer: null };
    }
    case 'restart': {
      return { ...initialState, questions: state.questions, status: 'ready' };
    }
    case 'tick': {
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? 'finished' : state.status,
      };
    }
    default:
      throw new Error('Unknown action type');
  }
}

function App() {
  const [
    { questions, status, index, answer, points, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(response => response.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);
  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorMessage />}
        {status === 'ready' && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              points={points}
              answer={answer}
            />
            <Quiz
              questions={questions}
              index={index}
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}

        {status === 'finished' && (
          <FinishQuiz
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />
        )}

        {status === 'active' && (
          <Footer>
            <Timer
              dispatch={dispatch}
              timeRemaining={timeRemaining}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />
          </Footer>
        )}
      </Main>
    </div>
  );
}

export default App;
