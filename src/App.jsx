import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GenrePage } from "./pages/GenrePage";
import { ArtistsPage } from "./pages/ArtistsPage";
import { ChatPage } from "./pages/ChatPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenrePage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default App;
