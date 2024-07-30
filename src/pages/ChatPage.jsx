import { useParams } from "react-router-dom";

import "../styles/chat.css";

export const ChatPage = () => {
  const { artistId } = useParams();
  return <div>{artistId}</div>;
};
