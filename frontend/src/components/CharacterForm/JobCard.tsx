import { styled } from "styled-components";
import type { JobStats } from "../../types/JobStats";

const Card = styled.div<{ selected: boolean }>`
  flex: 1;
  border: 2px solid ${({ selected }) => (selected ? "#7c3aed" : "#ccc")};
  border-radius: 12px;
  padding: 1.5rem;
  background: ${({ selected }) => (selected ? "#f3f0ff" : "#fff")};
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
  box-shadow: ${({ selected }) =>
    selected ? "0 2px 12px rgba(124,58,237,0.08)" : "none"};
`;

const StatBox = styled.div`
  background: #f9f9fb;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
`;

const Stat = styled.p`
  margin: 0.3rem 0;
  font-weight: 500;
`;

export type JobCardProps = {
  job: JobStats;
  selected: boolean;
  onClick: () => void;
};

const JobCard = ({
  job,
  selected,
  onClick,
}: JobCardProps): React.ReactElement => {
  return (
    <Card selected={selected} onClick={onClick}>
      <h2 style={{ textAlign: "center" }}>{job.name}</h2>
      <StatBox>
        <Stat>
          ❤️ <b>Life Points:</b> {job.health}
        </Stat>
        <Stat>
          💪 <b>Strength:</b> {job.strength}
        </Stat>
        <Stat>
          🦶 <b>Dexterity:</b> {job.dexterity}
        </Stat>
        <Stat>
          🧠 <b>Intelligence:</b> {job.intelligence}
        </Stat>
        <Stat>
          💥 <b>Attack:</b> {job.attack}
        </Stat>
        <Stat>
          🏎️ <b>Speed:</b> {job.speed}
        </Stat>
      </StatBox>
    </Card>
  );
};

export default JobCard;
