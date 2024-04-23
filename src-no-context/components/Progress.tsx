type Props = {
  index: number;
  numQuestion: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
};
export default function Progress({ index, numQuestion, points, maxPossiblePoints, answer }: Props) {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestion} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints} points
      </p>
    </header>
  );
}
