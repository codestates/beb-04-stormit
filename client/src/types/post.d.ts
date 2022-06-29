type SubmitPostAPIBodyType = {
  user_id: number;
  post_content: string;
  post_title: string;
  board_title: string;
};

type GetAllPostsResponseType = {
  post_id: number;
  post_title: string;
  post_content: string;
  nickname: string;
  created_at: string;
  comment_count: number;
  board_title: string;
}[];

type GetPostsByBoardBodyType = {
  board_title: string;
};

type GetPostsByBoardResponseType = {
  post_id: number;
  post_title: string;
  nickname: string;
  created_at: string;
  comment_count: number;
}[];

type GetPostByIdResponseType = {
  post_title: string;
  post_content: string;
  nickname: string;
  created_at: string;
  board_title: string;
  comments: {
    comment_nickname: string;
    comment_content: string;
    comment_id: number;
    comment_created_at: string;
  }[];
};

type UpdatePostAPIBodyType = {
  board_title: string;
  post_title: string;
  post_content: string;
};

type SubmitCommentAPIBodyType = {
  user_id: number;
  post_id: number;
  comment_content: string;
};

type UpdateCommentAPIBodyType = {
  comment_content: string;
};
