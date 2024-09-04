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
import { useQuiz } from "./contexts/QuizContext.jsx";

export default function App() {

  const { questions, status, index, answer, points, highscore, secondsRemaining, numQuestion, maxPossiblePoints} = useQuiz()
  
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
