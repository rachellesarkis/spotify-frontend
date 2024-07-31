import { v4 as uuidv4 } from "uuid";

export const generateUserId = () => {
  const storedUserId = localStorage.getItem("userId");
  if (!storedUserId) {
    const newUserId = uuidv4();
    localStorage.setItem("userId", newUserId);
    return newUserId;
  } else {
    return storedUserId;
  }
};
