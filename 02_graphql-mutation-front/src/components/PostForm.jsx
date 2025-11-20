import React from 'react'
import { useState } from 'react';
import { useMutation } from '@apollo/client/react'
import { CREATE_POST, GET_ALL_POSTS } from '../queries/postQueries';

function PostForm() {

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorId: ''
  });

  const [createPostSubmit, {loading, error, data}] = useMutation(CREATE_POST, {
    refetchQueries: [GET_ALL_POSTS]
  }) // [ 실제mutation을 실행시키는 함수, {mutation실행후의 상태 loading, error, data} ]

  const handleSubmit = (e) => {
    e.preventDefault();

    //mutation 실행
    createPostSubmit({
      variables: { 
        ...formData // title: '', content: '', authorId: ''
      }
    })
    setFormData({
      title: '',
      content: '',
      authorId: ''
    })

  }

  return (
    <div>
      <h2>게시글 등록</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="제목"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})} />
        <br />
        <input 
          type="text"
          placeholder="내용"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})} />
        <br />
        <input 
          type="text"
          placeholder="작성자ID"
          value={formData.authorId}
          onChange={(e) => setFormData({...formData, authorId: e.target.value})} />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? '게시글 등록중..' : '게시글 동록'}
        </button>
        {data && <p>{data.createPost.title} 게시글이 등록되었습니다.</p>}
      </form>
    </div>
  )
}

export default PostForm