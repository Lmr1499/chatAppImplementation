// src/config/ChatLogics.js

/**
 * Checks if the margin for the same sender should be applied.
 *
 * @param {Array} messages - The list of messages.
 * @param {Object} m - The current message.
 * @param {number} i - The index of the current message.
 * @param {string} userId - The ID of the logged-in user.
 * @returns {number|string} - The margin value or "auto".
 */
export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

/**
 * Checks if the current message is from the same sender as the next message.
 *
 * @param {Array} messages - The list of messages.
 * @param {Object} m - The current message.
 * @param {number} i - The index of the current message.
 * @param {string} userId - The ID of the logged-in user.
 * @returns {boolean} - Whether the current message is from the same sender.
 */
export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

/**
 * Checks if the current message is the last message in the list.
 *
 * @param {Array} messages - The list of messages.
 * @param {number} i - The index of the current message.
 * @param {string} userId - The ID of the logged-in user.
 * @returns {boolean} - Whether the current message is the last message.
 */
export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

/**
 * Checks if the current message is from the same user as the previous message.
 *
 * @param {Array} messages - The list of messages.
 * @param {Object} m - The current message.
 * @param {number} i - The index of the current message.
 * @returns {boolean} - Whether the current message is from the same user.
 */
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

/**
 * Gets the name of the sender of a message, excluding the logged-in user.
 *
 * @param {Object} loggedUser - The logged-in user's data.
 * @param {Array} users - The list of users in the chat.
 * @returns {string} - The name of the sender.
 */
export const getSender = (loggedUser, users) => {
  if (!loggedUser || !users || users.length === 0) {
    console.error("Invalid parameters passed to getSender:", { loggedUser, users });
    return "Unknown Sender";
  }

  const senderIndex = users.findIndex(user => user._id !== loggedUser._id);

  if (senderIndex === -1) {
    console.error("No sender found. The logged user may be the only user or an invalid user.");
    return "Unknown Sender";
  }

  const sender = users[senderIndex];
  return sender.name || "Unknown Sender";
};

/**
 * Gets the full information of the sender of a message, excluding the logged-in user.
 *
 * @param {Object} loggedUser - The logged-in user's data.
 * @param {Array} users - The list of users in the chat.
 * @returns {Object} - The sender's full information.
 */
export const getSenderFull = (loggedUser, users) => {
  if (!loggedUser || !users || users.length === 0) {
    console.error("Invalid parameters passed to getSenderFull:", { loggedUser, users });
    return null;
  }

  const senderIndex = users.findIndex(user => user._id !== loggedUser._id);

  if (senderIndex === -1) {
    console.error("No sender found. The logged user may be the only user or an invalid user.");
    return null;
  }

  return users[senderIndex];
};
