import { useEffect } from "react";
import { Action } from "types";

type Props = {
  dispatch: React.Dispatch<Action>;
  secondsRemaining: number | null;
};
export default function Timer({ dispatch, secondsRemaining }: Props) {
  const mins = secondsRemaining && Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining && secondsRemaining % 60;
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {mins && mins < 10 && "0"}
      {mins} : {seconds && seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
