// import { gql } from "@apollo/client";
// import { useQuery } from "@apollo/client/react";

import CharacterForm from "./components/CharacterForm/CharacterForm";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CharacterListPage from "./components/CharacterListPage/CharacterListPage";

// const LIST_CHARACTERS = gql`
//   query {
//     listCharacters {
//       id
//       name
//       job
//     }
//   }
// `;

// type Character = {
//   id: string;
//   name: string;
//   job: string;
// };

// type ListCharactersResponse = {
//   listCharacters: Character[];
// };

function App() {
  // const { loading, error, data } =
  //   useQuery<ListCharactersResponse>(LIST_CHARACTERS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // return (
  //   <>
  //     <div>
  //       <h1>Characters</h1>
  //       <ul>
  //         {data?.listCharacters.map((char: Character) => (
  //           <li key={char.id}>
  //             {char.name} ({char.job})
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   </>
  // );
  return (
    <Router>
      <nav>
        <Link to="/">Create Character</Link>
        {" | "}
        <Link to="/characters">Character List</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CharacterForm />} />
        <Route
          path="/characters"
          element={<CharacterListPage listCharacters={[]} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
