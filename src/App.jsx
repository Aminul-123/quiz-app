import { useEffect, useReducer } from "react";
import Header from "./assets/Header";
import Main from "./assets/Main";
import Loader from "./assets/Loader";
import Error from "./assets/Error.jsx";
import StartScreen from "./assets/StartScreen";
import Question from "./assets/Question.jsx";
import NextButton from "./assets/NextButton.jsx";
import Progress from "./assets/Progress.jsx";
import FinishScreen from "./assets/FinishScreen.jsx";
import Footer from "./Footer.jsx";
import Timer from "./assets/Timer.jsx";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore : 0,
  secondsRemaining : null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining : state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion' : 
       return {
          ...state,
          index : state.index + 1,
          answer : null
    }
    case 'finish' : 
      return {
        ...state,
        status : 'finish',
        highscore : state.points > state.highscore ? state.points : state.highscore
      }
      case 'restart' : 
        return {
          // ...state,
          // status : 'ready',
          // points : 0,
          // answer : null,
          // index : 0,
          // highscore : 0
          ...initialState, 
          questions : state.questions,
          status : 'ready'
        }
        case 'tick' : 
          return {
            ...state,
            secondsRemaining : state.secondsRemaining - 1,
            status : state.secondsRemaining === 0 ? 'finish' : state.status,
          }
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points , highscore, secondsRemaining} = state;

  const numQuestion = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0)

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <>
      <div className="app">
        <Header />

        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
            <Progress index={index}
                numQuestion={numQuestion}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer}
                />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              />
              <Footer>
                <Timer 
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
                <NextButton 
                      dispatch={dispatch}
                      answer={answer}
                      index={index}
                      numQuestion={numQuestion}
                />
            </Footer>
              </>
          )}
          {status === 'finish' && <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />}
        </Main>
      </div>
    </>
  );
}
