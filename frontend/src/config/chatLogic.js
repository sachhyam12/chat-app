export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderInfo = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[0] : users[1];
};

export const isSameSender = (messages, msg, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== msg.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, msg, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === msg.sender._id &&
    messages[i].sender._id !== userId
  )
    return 30;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== msg.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, msg, i) => {
  return i > 0 && messages[i - 1].sender._id === msg.sender._id;
};
