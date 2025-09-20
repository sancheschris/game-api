import CharacterForm from "./components/CharacterForm/CharacterForm";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CharacterListPage from "./components/CharacterListPage/CharacterListPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Create Character</Link>
        {" | "}
        <Link to="/characters">Character List</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CharacterForm />} />
        <Route path="/characters" element={<CharacterListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
