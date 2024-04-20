import Main from "Main";
import Error from "components/Error";
import Header from "components/Header";
import Loader from "components/Loader";
import StartScreen from "components/StartScreen";
import { useEffect, useReducer } from "react";
import { IQuestion } from "types";

type State = {
  questions: IQuestion[];
  status: "loading" | "error" | "ready" | "active" | "finished";
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: State = {
  questions: [],
  status: "loading",
};

function reducer(state: State = initialState, action: Action): State {
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
    default:
      return state;
  }
}
function App() {
  const [{ status, questions }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
    return () => {};
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  );
}

export default App;
