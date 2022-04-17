import { gql } from "@apollo/client";

export const getUserByEmailAndPasswordQuery = gql`
  query ($email: String!, $password: String!) {
    getUserByEmailAndPassword(email: $email, password: $password) {
      id
      name
      surname
      email
    }
  }
`;

export const getAllTodosByUserIDQuery = gql`
  query ($userID: Float!) {
    getAllTodosByUserID(userID: $userID) {
      id
      userID
      title
      createdAt
    }
  }
`;
