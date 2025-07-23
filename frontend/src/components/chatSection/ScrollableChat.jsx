import { Tooltip, Avatar } from "@chakra-ui/react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
} from "../../config/chatLogic.js";
import { chatState } from "../../Context/ChatProvider.jsx";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {
  const { user } = chatState();

  const userId = user.data.user._id;
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((msg, i) => (
          <div style={{ display: "flex" }} key={msg._id}>
            {(isSameSender(messages, msg, i, userId) ||
              isLastMessage(messages, i, userId)) && (
              <Tooltip content={msg.sender.name} showArrow>
                <Avatar.Root size="sm">
                  <Avatar.Image
                    mt={"7px"}
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    src={msg.sender.avatar}
                  />
                  <Avatar.Fallback name={msg.sender.name} />
                </Avatar.Root>
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: "teal",
                color: "black",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, msg, i, userId),
                marginTop: isSameSender(messages, msg, i, userId) ? 3 : 10,
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
