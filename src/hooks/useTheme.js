"use client";

import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider.jsx";

const useTheme = () => useContext(ThemeContext);

export default useTheme;
