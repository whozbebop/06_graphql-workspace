import { useState } from "react";
import { useMutation } from '@apollo/client/react'
import PostDetail from "./components/PostDetail";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import { DELETE_POST, GET_ALL_POSTS } from "./queries/postQueries";

function App() {

  // 선택된 게시글의 id를 관리하는 상태변수
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [deletePost, {loading, error, data}] = useMutation(DELETE_POST, {
    refetchQueries: [GET_ALL_POSTS]
  })

  const handleDeletePost = async (e) => {
    const response = await deletePost({
      variables: {postId: selectedPostId}
    });
    alert(`${response.data.deletePost.title} 게시글이 삭제되었습니다.`);
    setSelectedPostId(null);
  }

  return (
    <>
      <PostList setSelectedPostId={setSelectedPostId} />
      {selectedPostId && ( 
        <>
          <PostDetail postId={selectedPostId} />
          {/*
          실습
          현재 선택된 게시글이 삭제되도록 하시오.
          삭세 완료 후에는 알람창 발생("xxx 게시글이 삭제되었습니다.")
          */}
          <button onClick={handleDeletePost}>해당 게시글 삭제</button>
        </>
      )}
      <hr />
      <PostForm />
    </>
  )
}

export default App
