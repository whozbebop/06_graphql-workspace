import { useState } from "react"
import UserList from "./components/UserList"
import UserDetail from "./components/UserDetail"

function App() {

  // 선택된 사용자의 id를 관리하는 상태변수
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <>
      <UserList setSelectedUserId={setSelectedUserId} />
      {selectedUserId && <UserDetail userId={selectedUserId} />}

      <hr />

      {/* 
        실습
        1. 게시글 목록이 보여지는 PostList 컴포넌트 작성 (게시글의 title만 정보 노출)
        2. 선택된 게시글 상세 정보가 보여지는 PostDetail 컴포넌트 (게시글의 title, content, 작성자명 정보 노출)
      */}
    </>
  )
}

export default App
