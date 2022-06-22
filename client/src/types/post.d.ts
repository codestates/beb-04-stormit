type SubmitPostAPIBodyType = {
  email: string;
  post_content: string;
  post_title: string;
  board_name: string;
};

type GetAllPostsResponseType = {
  post_title: string;
  post_content: string;
  nickname: string;
  timestamp: string;
  comment_count: number;
  board: string;
}[];

type GetPostsByBoardBodyType = {
  board_name: string;
};

type GetPostsByBoardResponseType = {
  post_title: string;
  nickname: string;
  timestamp: string;
  comment_count: number;
}[];

type GetPostByIdResponseType = {
  post_title: string;
  nickname: string;
  timestamp: string;
  comment: { nickname: string; comment_content: string; comment_id: number }[];
};

type UpdatePostAPIBodyType = {
  post_id: string;
  post_content: string;
  board_name: string;
  post_title: string;
};

type SubmitCommentAPIBodyType = {
  email: string;
  post_id: number;
  comment_content: string;
};

type UpdateCommentAPIBodyType = {
  comment_id: number;
  comment_content: string;
};
