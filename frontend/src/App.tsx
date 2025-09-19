// import { gql } from "@apollo/client";
// import { useQuery } from "@apollo/client/react";

import CharacterForm from "./features/CharacterForm";

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
    <div>
      <CharacterForm />
    </div>
  );
}

export default App;
