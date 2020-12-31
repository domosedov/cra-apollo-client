import { gql, useQuery } from "@apollo/client";
import { useColorModeToggler } from "./components/ColorModeProvider";

const QUERY = gql`
  {
    isAdmin
    someText
  }
`;

function App() {
  const toggleMode = useColorModeToggler();

  const { data } = useQuery(QUERY);

  console.log(data);

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white">
      <h1>My App</h1>
      <button onClick={() => toggleMode!()}>Toggle</button>
    </div>
  );
}

export default App;
