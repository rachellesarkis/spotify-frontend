import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "../assets/ArrowLeft";
import { ChatMessage } from "../assets/ChatMessage";
import { Send } from "../assets/Send";
import { formatNumber } from "../utils/formatNumber";
import { sendMessage, getChatHistory } from "../utils/apiService";
import { v4 as uuidv4 } from "uuid";

import "../styles/chat.css";

export const ChatPage = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);

    const getArtistData = async () => {
      const storedData = localStorage.getItem("artistToChat");
      if (storedData) {
        const artistData = JSON.parse(storedData);
        setArtist(artistData);
      } else {
        navigate("/");
      }
    };

    getArtistData();
    if (userId && artistId) {
      const fetchChatHistory = async () => {
        try {
          const history = await getChatHistory(userId, artistId);
          setChatHistory(Array.isArray(history) ? history : []);
        } catch (error) {
          console.error("Error fetching chat history:", error.message);
          setChatHistory([]);
        }
      };

      fetchChatHistory();
    }
  }, [navigate, artistId, userId]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    setLoading(true);

    try {
      const response = await sendMessage(
        userId,
        artistId,
        artist.name,
        userMessage
      );
      const { userMessage: sentUserMessage, aiResponse } = response;

      setChatHistory([
        ...chatHistory,
        {
          userId,
          artistId,
          userMessage: sentUserMessage,
          aiResponse,
          index: chatHistory.length,
        },
      ]);

      setUserMessage("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-navbar">
        <div className="chat-navigate-back" onClick={() => navigate("/")}>
          <ArrowLeft />
        </div>
        {artist && (
          <>
            <img
              src={artist.images[0]?.url}
              alt={artist.name}
              className="chat-artist-image"
            />
            <div>
              <p className="chat-artist-name">{artist.name}</p>
              <p className="chat-artist-followers">
                {formatNumber(artist.followers.total)} followers
              </p>
            </div>
            <p className="chat-artist-popularity">{artist.popularity}</p>
          </>
        )}
      </div>
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.length > 0 ? (
            chatHistory.map((chat, index) => (
              <div key={index} className="chat-message">
                {chat.userId === userId && (
                  <>
                    <div className="chat-user-message">
                      <p>{chat.userMessage}</p>
                    </div>
                    <div className="chat-ai-message">
                      <p>{chat.aiResponse}</p>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="chat-not-available">
              No chat history available with this artist. Start a conversation!
            </p>
          )}
        </div>
        <div className="chat-input">
          <ChatMessage />
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here."
          />
          <button onClick={handleSendMessage} disabled={loading}>
            Send <Send />
          </button>
        </div>
      </div>
    </div>
  );
};
