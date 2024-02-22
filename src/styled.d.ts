import "styled-components";
import { KobotTheme } from "./ui/theme";

// styled-components theme type extension
declare module "styled-components" {
  export interface DefaultTheme extends KobotTheme {}
}
