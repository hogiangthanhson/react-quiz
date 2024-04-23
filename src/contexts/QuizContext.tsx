import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Action, IQuestion, State } from "types";

interface Context {
  status: string;
  questions: IQuestion[];
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
  numQuestions: number;
  maxPossiblePoints: number;
  dispatch: React.Dispatch<Action>;
}

const defaultValue: Context = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  numQuestions: 0,
  maxPossiblePoints: 0,
  dispatch: function (value: Action): void {
    throw new Error("Function not implemented.");
  },
};

const QuizContext = createContext(defaultValue);

const SECS_PER_QUESTION = 30;

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading" };
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
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          question && action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.points, state.highscore),
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: null,
      };
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining && state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }
    default:
      return state;
  }
}

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [{ status, questions, index, answer, points, highscore, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("QuizContext was used outside QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
