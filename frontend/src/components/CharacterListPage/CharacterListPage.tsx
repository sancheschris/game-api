import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { Character } from "../../types/Character";
import { styled } from "styled-components";

const LIST_CHARACTERS_QUERY = gql`
  query ListCharacters {
    listCharacters {
      id
      name
      job
      alive
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

const Th = styled.th`
  border-bottom: 2px solid #ccc;
  padding: 0.75rem;
  text-align: left;
`;

const Td = styled.td`
  border-bottom: 1px solid #eee;
  padding: 0.75rem;
`;

export type CharacterListProps = {
  listCharacters: Character[];
};

const CharacterListPage = (): React.ReactElement => {
  const { data, loading, error } = useQuery<CharacterListProps>(
    LIST_CHARACTERS_QUERY
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading characters.</div>;

  return (
    <div>
      <h1>Character List</h1>
      <Table>
        <thead>
          <tr>
            <Th>Character Name</Th>
            <Th>Job</Th>
            <Th>Status</Th>
            <Th>Details</Th>
          </tr>
        </thead>
        <tbody>
          {data?.listCharacters.map((char) => (
            <tr key={char.id}>
              <Td>{char.name}</Td>
              <Td>{char.job}</Td>
              <Td>{char.alive}</Td>
              <Td>
                <a href={`/characters/${char.id}`}>Click Here</a>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CharacterListPage;
