import { gql } from "@apollo/client";
export const createUserMutation = gql`
  mutation ($data: UserGQLInput!) {
    createUser(data: $data) {
      id
      name
      surname
      email
    }
  }
`;

export const createTodoMutation = gql`
  mutation ($data: TodoGQLInput!) {
    createTodo(data: $data) {
      id
      title
      createdAt
    }
  }
`;

export const resetUserPasswordMutation = gql`
  mutation ($email: String!, $oldPassword: String!, $newPassword: String!) {
    resetUserPassword(email: $email, oldPassword: $oldPassword, newPassword: $newPassword) {
      id
      name
      surname
      email
    }
  }
`;

export const deleteTodoMutation = gql`
  mutation ($id: Float!) {
    deleteTodo(id: $id)
  }
`;
