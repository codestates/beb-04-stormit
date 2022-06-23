import axios from ".";

/* ------------------------ 게시글 관련 API ------------------------ */

// 게시글 작성
export const submitPostAPI = (body: SubmitPostAPIBodyType) =>
  axios.post("board/post", body);

// 전체 게시글 목록 가져오기
export const getAllPostAPI = () => axios.get<GetAllPostsResponseType>("/board");

// 게시판 별 게시글 목록 가져오기
export const getPostsByBoardAPI = (body: GetPostsByBoardBodyType) =>
  axios.post<GetPostsByBoardResponseType>("/board", body);

// 게시글 id로 게시글 상세 내용 가져오기
export const getPostByIdAPI = (id: number) =>
  axios.get<GetPostByIdResponseType>(`/board/post/${id}`);

// 게시글 수정
export const updatePostAPI = (body: UpdatePostAPIBodyType) =>
  axios.post("/board/post", body);

// 게시글 id로 게시글 삭제
export const deletePostByIdAPI = (id: number) =>
  axios.delete(`/board/post/${id}`);

/* ------------------------ 댓글 관련 API ------------------------ */

// 댓글 작성
export const submitCommentAPI = (body: SubmitCommentAPIBodyType) =>
  axios.post("/board/post/comment", body);

// 댓글 수정
export const updateCommentAPI = (body: UpdateCommentAPIBodyType) =>
  axios.put("/board/post/comment", body);

// 댓글 삭제
export const deleteCommentAPI = (id: number) =>
  axios.delete(`/board/post/comment/${id}`);
