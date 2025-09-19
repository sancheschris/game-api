import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

const JOBS_QUERY = gql`
  query Jobs {
    jobs {
      name
      health
      strength
      dexterity
      intelligence
      attack
      speed
    }
  }
`;

const CREATE_CHARACTER_MUTATION = gql`
  mutation CreateCharacter($name: String!, $job: Job!) {
    createCharacter(name: $name, job: $job) {
      success
      character {
        id
        name
        job
      }
      errors
    }
  }
`;

const LIST_CHARACTERS_QUERY = gql`
  query ListCharacters {
    listCharacters {
      id
      name
      job
    }
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  letter-spacing: 2px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const JobGrid = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const JobCard = styled.div<{ selected: boolean }>`
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

const CreateButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #7c3aed;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  transition: background 0.2s;
  &:hover {
    background: #5b21b6;
  }
`;

type Character = {
  id: string;
  name: string;
  job: string;
};

type JobStats = {
  name: string;
  health: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  attack: string;
  speed: string;
};

type JobsQueryData = {
  jobs: JobStats[];
};

type ListCharactersData = {
  listCharacters: Character[];
};

export default function CharacterForm() {
  const [name, setName] = useState("");
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    data: jobsData,
    loading: jobsLoading,
    error: jobsError,
  } = useQuery<JobsQueryData>(JOBS_QUERY);
  const { data: charactersData, refetch: refetchCharacters } =
    useQuery<ListCharactersData>(LIST_CHARACTERS_QUERY);
  const [createCharacter, { loading: creating }] = useMutation(
    CREATE_CHARACTER_MUTATION
  );

  const jobs = useMemo(() => jobsData?.jobs || [], [jobsData]);
  const characters = charactersData?.listCharacters || [];

  React.useEffect(() => {
    if (jobs.length > 0 && !selectedJob) {
      setSelectedJob(jobs[0].name);
    }
  }, [jobs, selectedJob]);

  if (jobsLoading) return <div>Loading jobs...</div>;
  if (jobsError) return <div>Error loading jobs</div>;

  type CreateCharacterResult = {
    createCharacter: {
      success: boolean;
      character?: Character;
      errors?: string[];
    };
  };

  const handleCreate = async () => {
    setErrorMsg(null);
    if (!name.trim()) {
      setErrorMsg("Name is required");
      return;
    }
    try {
      const res = await createCharacter({
        variables: { name, job: selectedJob },
      });
      const result = res.data as CreateCharacterResult | undefined;
      if (result?.createCharacter.success) {
        setName("");
        await refetchCharacters();
      } else {
        setErrorMsg(result?.createCharacter.errors?.[0] || "Unknown error");
      }
    } catch {
      setErrorMsg("Failed to create character");
    }
  };

  return (
    <Container>
      <Title>NEO RPG</Title>
      <Input
        placeholder="Character Name*"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <JobGrid>
        {jobs.map((job) => (
          <JobCard
            key={job.name}
            selected={selectedJob === job.name}
            onClick={() => setSelectedJob(job.name)}
          >
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
          </JobCard>
        ))}
      </JobGrid>
      {errorMsg && (
        <div style={{ color: "red", marginBottom: 12 }}>{errorMsg}</div>
      )}
      <CreateButton onClick={handleCreate} disabled={creating}>
        {creating ? "Creating..." : "Create Character"}
      </CreateButton>
      <div style={{ marginTop: 32 }}>
        <h2>Characters</h2>
        <ul>
          {characters.map((char) => (
            <li key={char.id}>
              {char.name} ({char.job})
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
