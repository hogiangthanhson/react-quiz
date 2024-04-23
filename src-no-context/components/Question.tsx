import { Action, IQuestion } from "types";
import Options from "./Options";

type Props = {
  question: IQuestion;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
};
export default function Question({ question, dispatch, answer }: Props) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
