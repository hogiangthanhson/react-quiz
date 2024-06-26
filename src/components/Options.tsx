import Button from "./Button";
import { useQuiz } from "contexts/QuizContext";

export default function Options({ question }: { question: any }) {
  const { answer, dispatch } = useQuiz();
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {question.options.map((option: any, index: number) => (
        <Button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer ? (index === question.correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}
          disable={hasAnswer}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
          }}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
