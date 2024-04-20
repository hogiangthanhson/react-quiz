import { useReducer } from "react";

type Action = {
  type: "inc" | "dec" | "setCount" | "setStep" | "reset";
  payload: number;
};

const initialState = { count: 0, step: 1 };

function reducer(state: { count: number; step: number }, action: Action) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknow action");
  }
}

function DateCounter() {
  const [state, dispatch]: any = useReducer<any>(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input type="range" min="0" max="10" value={step} onChange={defineStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
