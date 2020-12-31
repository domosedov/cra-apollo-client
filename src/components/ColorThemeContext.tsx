import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type ColorThemeValueType = "light" | "dark";

const ColorThemeContextState = createContext<ColorThemeValueType | null>(null);
const ColorThemeContextDispatch = createContext<Dispatch<
  SetStateAction<ColorThemeValueType>
> | null>(null);

const getColorThemeFromStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const colorTheme = (localStorage.getItem("theme") &&
      "light") as ColorThemeValueType;

    return colorTheme;
  }

  return "light";
};

export const ColorThemeProvider = ({ children }: Props) => {
  const [themeColor, setThemeColor] = useState(() =>
    getColorThemeFromStorage()
  );

  console.log(themeColor);
  console.log(setThemeColor);

  useEffect(() => {
    if (themeColor === "dark") {
      localStorage.setItem("theme", "dark");
      document!.querySelector("html")!.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document!.querySelector("html")!.classList.remove("dark");
    }
  }, [themeColor]);

  return (
    <ColorThemeContextDispatch.Provider value={setThemeColor}>
      <ColorThemeContextState.Provider value={themeColor}>
        {children}
      </ColorThemeContextState.Provider>
    </ColorThemeContextDispatch.Provider>
  );
};

export const useColorTheme = () => useContext(ColorThemeContextState);
export const useSetColorTheme = () => useContext(ColorThemeContextDispatch);
