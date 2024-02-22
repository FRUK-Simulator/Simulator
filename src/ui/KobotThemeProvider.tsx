import { FC, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

export const KobotThemeProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
