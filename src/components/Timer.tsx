import { useQuiz } from "contexts/QuizContext";
import { useEffect } from "react";

export default function Timer() {
  const { secondsRemaining, dispatch } = useQuiz();
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
