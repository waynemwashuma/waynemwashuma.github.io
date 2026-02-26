import { createContext } from "react";
import { User } from "../common/index.ts";

export const userContext = createContext(new User())