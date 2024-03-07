import * as uuid from "uuid";

/*
    In this service, the user id is generated as anonymos id while the user is not signed up
    When the user signs up, it should be replated by the real user id
*/

export const getUserId = (): string => {
  // Check if the user has already an id
  const storedUserId = localStorage.getItem("user-id");
  if (storedUserId) {
    return storedUserId;
  }

  // If not assigned, rgenerate an id
  const userId = uuid.v4();
  localStorage.setItem("user-id", userId);
  return userId;
};
