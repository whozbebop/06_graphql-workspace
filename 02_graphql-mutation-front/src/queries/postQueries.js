import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPost {
    posts {
      id
      title
    }
  }
`

export const GET_POST_DETAIL = gql`
  query GetPostDetail($postId: ID!) {
    post(id: $postId)  {
      id
      title
      content
      author {
        username
      }
    }
  }
`

export const CREATE_POST = gql`
mutation CreateNewPost($title: String!, $content: String, $authorId: ID!) {
  createPost(title: $title, content: $content, authorId: $authorId) {
    id
    title
    content
    author {
      id
      username
    }
  }
}
`
export const DELETE_POST = gql`
mutation Delete_Post($postId: ID!){
  deletePost(id: $postId) {
    id
    title
  }
}
`