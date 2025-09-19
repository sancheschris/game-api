import { styled } from "styled-components";
import type { JobStats } from "../../types/JobStats";
import JobCard from "./JobCard";

const Grid = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

export type JobGridProps = {
  jobs: JobStats[];
  selectedJob: string;
  onSelect: (jobName: string) => void;
};

const JobGrid = ({
  jobs,
  selectedJob,
  onSelect,
}: JobGridProps): React.ReactElement => {
  return (
    <Grid>
      {jobs.map((job) => (
        <JobCard
          key={job.name}
          job={job}
          selected={selectedJob === job.name}
          onClick={() => onSelect(job.name)}
        />
      ))}
    </Grid>
  );
};

export default JobGrid;
