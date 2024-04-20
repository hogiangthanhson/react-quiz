import React from "react";
import { Action } from "types";
import Button from "./Button";

type Props = {
  dispatch: React.Dispatch<Action>;
  answer: number | null;
  index: number;
  numQuestion: number;
};

export default function NextButton({ dispatch, answer, index, numQuestion }: Props) {
  if (answer === null) return null;

  if (index < numQuestion - 1) {
    return (
      <Button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </Button>
    );
  }

  if (index === numQuestion - 1) {
    return (
      <Button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
        Finish
      </Button>
    );
  }

  return null;
}
