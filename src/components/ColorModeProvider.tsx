import {
  createContext,
  DispatchWithoutAction,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

type Props = {
  children: ReactNode;
};

type ColorThemeValueType = "light" | "dark";

const ColorModeValueContext = createContext<ColorThemeValueType>(null!);
const ColorModeTogglerContext = createContext<DispatchWithoutAction>(null!);

const getColorModeValueFromStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const colorTheme = (localStorage.getItem("theme") ||
      "light") as ColorThemeValueType;

    return colorTheme;
  }

  return "light";
};

const themeModeToggler = (state: ColorThemeValueType) => {
  switch (state) {
    case "dark": {
      return "light";
    }
    case "light": {
      return "dark";
    }
    default: {
      throw new Error("Неверное значение цветовой темы");
    }
  }
};

export const ColorModeProvider = ({ children }: Props) => {
  const [themeMode, toggleThemeMode] = useReducer(
    themeModeToggler,
    "light",
    getColorModeValueFromStorage
  );

  useEffect(() => {
    if (themeMode === "dark") {
      localStorage.setItem("theme", "dark");
      document!.querySelector("html")!.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document!.querySelector("html")!.classList.remove("dark");
    }
  }, [themeMode]);

  return (
    <ColorModeTogglerContext.Provider value={toggleThemeMode}>
      <ColorModeValueContext.Provider value={themeMode}>
        {children}
      </ColorModeValueContext.Provider>
    </ColorModeTogglerContext.Provider>
  );
};

export const useColorModeValue = () => useContext(ColorModeValueContext);
export const useColorModeToggler = () => useContext(ColorModeTogglerContext);
