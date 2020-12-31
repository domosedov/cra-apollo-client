import { useSetColorTheme } from "./components/ColorThemeContext";

function App() {
  const setTheme = useSetColorTheme();

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white">
      <h1>My App</h1>
      <button onClick={() => setTheme!("dark")}>Click</button>
    </div>
  );
}

export default App;
