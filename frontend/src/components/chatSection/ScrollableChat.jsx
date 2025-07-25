import { Avatar as CAvatar, Tooltip as CTooltip, Box } from "@chakra-ui/react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
} from "../../config/chatLogic.js";
import { chatState } from "../../Context/ChatProvider.jsx";
import React, { useEffect, useRef } from "react";

const ScrollableChat = ({ messages }) => {
  const { user } = chatState();
  const userId = user.data.user._id;
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" }); // or "smooth"
  }, [messages]);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      flex="1"
      overflowY="auto"
      paddingX={3}
      paddingY={1}
      maxHeight="100%"
      className="hide-scrollbar"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        flex="1"
      >
        {messages &&
          messages.map((msg, i) => (
            <div style={{ display: "flex" }} key={msg._id}>
              {(isSameSender(messages, msg, i, userId) ||
                isLastMessage(messages, i, userId)) && (
                <CTooltip.Root label={msg.sender.name} hasArrow>
                  <CAvatar.Root
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    src={msg.sender.avatar}
                    name={msg.sender.name}
                  >
                    <CAvatar.Image
                      src={msg.sender.avatar}
                      name={msg.sender.name}
                    />
                  </CAvatar.Root>
                </CTooltip.Root>
              )}
              <Box display="flex" width="100%">
                <span
                  style={{
                    backgroundColor: `${
                      msg.sender._id === userId ? "#95A8E0" : "teal"
                    }`,
                    color: "black",
                    borderRadius: "20px",
                    padding: "3px 10px",
                    maxWidth: "75%",
                    marginLeft: isSameSenderMargin(messages, msg, i, userId),
                    marginTop: isSameSender(messages, msg, i, userId) ? 3 : 8,
                  }}
                >
                  {msg.content}
                </span>
              </Box>
            </div>
          ))}
        <div ref={bottomRef} />
      </Box>
    </Box>
  );
};

export default ScrollableChat;
