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
    }
  }
`;

export const resetUserPasswordMutation = gql`
  mutation ($email: String!, $oldPassowrd: String!, $newPassword: String!) {
    resetUserPassword(email: $email, oldPassowrd: $oldPassowrd, newPassword: $newPassword) {
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
