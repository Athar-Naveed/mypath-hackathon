
export const isMessageSender = (senderId: string, userId: string) => {
  return senderId === userId;
};
