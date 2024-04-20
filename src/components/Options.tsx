import React from "react";
import { Action, IQuestion } from "types";
import Button from "./Button";

type Props = {
  question: IQuestion;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
};
export default function Options({ question, dispatch, answer }: Props) {
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
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
