import { IButton } from "types";

export default function Button({ children, className, disable, onClick }: IButton) {
  return (
    <button className={className} disabled={disable} onClick={onClick}>
      {children}
    </button>
  );
}
