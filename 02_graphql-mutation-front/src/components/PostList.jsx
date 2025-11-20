import { useQuery } from '@apollo/client/react'
import { GET_ALL_POSTS } from '../queries/postQueries';

function PostList({ setSelectedPostId }) {
  const {loading, error, data} = useQuery(GET_ALL_POSTS);
  // data === { posts: [{id, title}, {}, ..] }

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>게시글 목록</h2>
      <ul>
        {data.posts.map((post) => (
          <li key={post.id} onClick={() => setSelectedPostId(post.id)}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList