import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      try {
        const storedUser = localStorage.getItem("userInfo");
        if (!storedUser) {
          navigate("/");
          return;
        }

        const userInfo = JSON.parse(storedUser);
        setUser(userInfo);
      } catch (error) {
        console.error("Failed to parse userInfo:", error);
        localStorage.removeItem("userInfo");
        navigate("/");
      }
    };

    getUser();
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const chatState = () => useContext(ChatContext);

export default ChatProvider;
