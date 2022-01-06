import { createContext } from "react";

export type BackgroundContextType = {
  backgroundColor: string;
  setBackgroundColor: (c: string) => void;
};

export const BackgroundContext = createContext<BackgroundContextType>({
  backgroundColor: "",
  setBackgroundColor: () => {},
});
