import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { Character } from "../../types/Character";
import { styled } from "styled-components";
import { useState } from "react";
import Modal from "../CharacterDetails/Modal";
import CharacterDetails from "../CharacterDetails/CharacterDetails";

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

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #999;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  display: inline-block;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2 px solid #d3d3d3;
`;

const Th = styled.th`
  background: #f5f5f5;
  border: 1px solid #d3d3d3;
  padding: 0.75rem;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #d3d3d3;
  padding: 0.75rem;
  background: white;
`;

const DetailsButton = styled.button`
  color: #666;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: #333;
  }
`;

const CharacterListPage = (): React.ReactElement => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );

  const { data, loading, error } = useQuery<{ listCharacters: Character[] }>(
    LIST_CHARACTERS_QUERY
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading characters.</div>;

  const handleDetailsClick = (characterId: string) => {
    setSelectedCharacterId(characterId);
  };

  const handleCloseModal = () => {
    setSelectedCharacterId(null);
  };

  return (
    <Container>
      <Header>
        <Title>NEO RPG</Title>
      </Header>

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
              <Td>{char.alive ?? true ? "Alive" : "Dead"}</Td>
              <Td>
                <DetailsButton onClick={() => handleDetailsClick(char.id)}>
                  Click Here
                </DetailsButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedCharacterId && (
        <Modal onClose={handleCloseModal}>
          <CharacterDetails characterId={selectedCharacterId} asModal={true} />
        </Modal>
      )}
    </Container>
  );
};

export default CharacterListPage;
