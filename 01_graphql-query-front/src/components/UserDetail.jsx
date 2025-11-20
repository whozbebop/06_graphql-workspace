import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import React from 'react'

const GET_USER_DETAIL = gql`
  query GetUserById($userId: ID!) {
    user(id: $userId) {
      id
      username
      age
    }
  }
`

function UserDetail({ userId }) {
  const { loading, error, data } = useQuery(GET_USER_DETAIL, { variables: { userId } })
  // data === {user: {id, username, age}, {}, ...}

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>선택된 회원의 상세 정보</h2>
      <p>ID: {data.user.id}</p>
      <p>Username: {data.user.username}</p>
      <p>Age: {data.user.age}</p>
    </div>
  )
}

export default UserDetail