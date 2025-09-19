import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import JobGrid from "./JobGrid";
import CreateButton from "./CreateButton";
import type { Character } from "../../types/Character";
import type { JobStats } from "../../types/JobStats";

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

// type Character = {
//   id: string;
//   name: string;
//   job: string;
// };

// type JobStats = {
//   name: string;
//   health: number;
//   strength: number;
//   dexterity: number;
//   intelligence: number;
//   attack: string;
//   speed: string;
// };

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
      <JobGrid
        jobs={jobs}
        selectedJob={selectedJob}
        onSelect={setSelectedJob}
      />
      {errorMsg && (
        <div style={{ color: "red", marginBottom: 12 }}>{errorMsg}</div>
      )}
      <CreateButton onClick={handleCreate} loading={jobsLoading} />
      {/* <div style={{ marginTop: 32 }}>
        <h2>Characters</h2>
        <ul>
          {characters.map((char) => (
            <li key={char.id}>
              {char.name} ({char.job})
            </li>
          ))}
        </ul>
      </div> */}
    </Container>
  );
}
