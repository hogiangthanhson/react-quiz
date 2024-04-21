import { Action } from "types";
import Button from "./Button";

type Props = {
  points: number;
  maxPossiblePoints: number;
  highscore: number;
  dispatch: React.Dispatch<Action>;
};
export default function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }: Props) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😁";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You score <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} point)</p>
      <Button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </Button>
    </>
  );
}
