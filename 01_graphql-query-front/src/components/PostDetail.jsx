import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import React from 'react'

const GET_POST_DETAIL = gql`
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

function PostDetail({ postId }) {

   const {loading, error, data} = useQuery(GET_POST_DETAIL, { variables: { postId } })
   // data === { post: {id, title, content, author: {username}}}

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>선택된 게시글 상세 정보</h2>
      <p>ID: {data.post.id}</p>
      <p>Title: {data.post.title}</p>
      <p>Content: {data.post.content}</p>
      <p>작성자명: {data.post.author.username} 
      </p>
    </div>
  )
}

export default PostDetail