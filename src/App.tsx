import { useColorModeToggler } from "./components/ColorModeProvider";

function App() {
  const toggleMode = useColorModeToggler();

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white">
      <h1>My App</h1>
      <button onClick={() => toggleMode!()}>Toggle</button>
    </div>
  );
}

export default App;
