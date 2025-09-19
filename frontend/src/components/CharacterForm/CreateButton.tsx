import { styled } from "styled-components";

const Button = styled.button`
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

export type ButtonProps = {
  onClick: () => void;
  loading: boolean;
};

const CreateButton = ({
  onClick,
  loading,
}: ButtonProps): React.ReactElement => {
  return (
    <Button onClick={onClick} disabled={loading}>
      {loading ? "Creating..." : "Create Character"}
    </Button>
  );
};

export default CreateButton;
