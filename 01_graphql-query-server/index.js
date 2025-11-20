// 필요한 모듈들
import { ApolloServer } from '@apollo/server'; // Apollo Server 핵심 라이브러리 
import { expressMiddleware } from '@as-integrations/express5'; // Express에 Apollo Server를 연결해 주는 미들웨어
import express from 'express'; // HTTP 서버(Express) 모듈
import cors from 'cors'; // CORS 허용을 위한 모듈

// 샘플 데이터 (In-Memory DB)
const users = [
  { id: '1', username: 'Alice', age: 25 },
  { id: '2', username: 'Bob', age: 30 },
  { id: '3', username: 'Charlie', age: 35 },
];

const posts = [
  { id: '101', title: 'GraphQL Intro', content: 'GraphQL은 REST API 대신 사용하는 새로운 쿼리 언어입니다.', authorId: '1' },
  { id: '102', title: 'React Hooks', content: 'React Hooks는 React 16.8에 도입된 새로운 기능입니다.', authorId: '1' },
  { id: '103', title: 'Vite vs CRA', content: 'Vite와 CRA는 각각 다른 빌드 툴입니다.', authorId: '2' },
];

// 1. GraphQL 스키마 정의(Type Definitions): 어떤 타입과 쿼리를 제공할지 선언합니다.
//    - API의 데이터 구조를 정의하는 과정 (메뉴판)
//    - Query 타입은 모든 GraphQL 스키마에 필수이며, 데이터 조회(읽기)의 진입점
const typeDefs = `
  type User {
    id: ID!
    username: String!
    age: Int
    posts: [Post]
  }
  
  type Post {
    id: ID!
    title: String!
    content: String
    author: User
  }

  type Query {
    users: [User]
    posts: [Post]
    user(id: ID!): User
    post(id: ID!): Post
  }
`;

// 2. 리졸버: 스키마에 정의된 필드가 실제로 어떤 데이터를 반환할지 구현합니다.
//    - 스키마 정의에 따라 실제 데이터를 반환하는 함수 (요리법)
const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
    // 두번째 인수로 클라이언트가 보낸 인수가 담겨옴 (예 {id: '1'})
    user: (_, { id }) => users.find(user => user.id === id),
    post: (_, { id }) => posts.find(post => post.id === id)
  },

  // 중헙 이조버 강의
  User: {
    //parent는 상위 리졸버()
    posts: (parent) => posts.filter(post => post.authorId === parent.id)
  },

  Post: {
    // parent는 상위 리졸버(Post)의 결과
    author: (parent) => users.find(user => user.id === parent.authorId)
  }
};

// 3. Apollo Server와 Express를 초기화하고 실행하는 함수
async function startServer() {
  // 3_1) GraphQL 요청을 처리할 Apollo Server 인스턴스 생성 (typeDefs와 resolvers를 사용하여 생성)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  // 3_2) Apollo Server가 요청을 받을 준비를 마칠 때까지 대기
  await server.start();

  // 3_3) REST 엔드포인트, 미들웨어 등을 연결할 Express 앱 생성
  const app = express();
  // 3_4) /graphql 엔드포인트로 들어오는 요청에 대한 미들웨어 체인 구성
  app.use(
    '/graphql',               // - /graphql 엔드포인트로 들어오는 요청에 대한 미들웨어 체인 구성
    cors(),                   // - 다른 도메인에서 접근할 수 있도록 CORS 허용
    express.json(),           // - 요청 본문을 JSON으로 파싱
    expressMiddleware(server) // - Apollo Server와 Express를 연결 (Express 에서 GraphQL 요청을 처리할 수 있도록 연결)
  );
  // 3_5) 서버가 열릴 포트 지정 후 실행
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL 서버가 http://localhost:${PORT}/graphql 에서 실행 중입니다.`);
  });
}

// 4. 서버 실행
startServer();