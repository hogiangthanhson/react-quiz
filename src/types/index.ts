import React from "react";

export type IQuestion = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: number;
};

export type State = {
  questions: IQuestion[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
};

export type Action = {
  type: string;
  payload?: any;
};

export type IButton = {
  children: React.ReactNode;
  className: string;
  disable?: boolean;
  onClick?: () => void;
};
