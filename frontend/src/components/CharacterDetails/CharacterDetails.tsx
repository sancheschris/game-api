import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { Character } from "../../types/Character";
import { styled } from "styled-components";
import { formatToThreeDecimalPercent } from "../../util/formatters";

const CHARACTER_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      job
      health
      strength
      dexterity
      intelligence
      attackModifier
      speedModifier
      alive
    }
  }
`;

const Container = styled.div`
  max-width: 600px;
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

const DetailsCard = styled.div`
  border: 1px solid #d3d3d3;
  background: white;
  padding: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr; /* Added 1px column for the line */
  gap: 1rem;
  margin-top: 1rem;
`;

const VerticalLine = styled.div`
  background-color: #d3d3d3;
  width: 2px;
  height: 100%;
`;

const StatItem = styled.div`
  padding: 0.5rem 0;
  color: #ccc;
`;

type CharacterDetailsProps = {
  characterId: string;
  isModal?: boolean;
};

const CharacterDetails = ({
  characterId,
  isModal = false,
}: CharacterDetailsProps): React.ReactElement => {
  const { data, loading, error } = useQuery<{ character: Character }>(
    CHARACTER_QUERY,
    { variables: { id: characterId } }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading character.</div>;
  if (!data?.character) return <div>Character not found.</div>;

  const char = data.character;

  const content = (
    <>
      <Header>
        <Title>Character Details</Title>
      </Header>

      <DetailsCard>
        <StatsGrid>
          <div>
            <StatItem>
              <strong>Name:</strong> {char.name}
            </StatItem>
            <StatItem>
              <strong>Current Life Points:</strong> {char.health}
            </StatItem>
            <StatItem>
              <strong>Maximum Life Points:</strong> {char.health}
            </StatItem>
            <StatItem>
              <strong>Strength:</strong> {char.strength}
            </StatItem>
            <StatItem>
              <strong>Dexterity:</strong> {char.dexterity}
            </StatItem>
          </div>

          <VerticalLine />

          <div>
            <StatItem>
              <strong>Job:</strong> {char.job}
            </StatItem>
            <StatItem>
              <strong>Intelligence:</strong> {char.intelligence}
            </StatItem>
            <StatItem>
              <strong>Status:</strong> {char.alive ? "Alive" : "Dead"}
            </StatItem>
            <StatItem>
              <strong>Attack Modifier:</strong>{" "}
              {formatToThreeDecimalPercent(char.attackModifier)}
            </StatItem>
            <StatItem>
              <strong>Speed Modifier:</strong>{" "}
              {formatToThreeDecimalPercent(char.speedModifier)}
            </StatItem>
          </div>
        </StatsGrid>
      </DetailsCard>
    </>
  );

  // If used as modal, don't wrap in Container
  if (isModal) {
    return <div>{content}</div>;
  }

  // If used as standalone page, wrap in Container
  return <Container>{content}</Container>;
};

export default CharacterDetails;
