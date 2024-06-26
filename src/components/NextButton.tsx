import Button from "./Button";
import { useQuiz } from "contexts/QuizContext";

export default function NextButton(): any {
  const { answer, index, numQuestions, dispatch } = useQuiz();
  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <Button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </Button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <Button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
        Finish
      </Button>
    );
  }
}
