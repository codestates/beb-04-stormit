type SubmitPostAPIBodyType = {
  username: string;
  post_content: string;
  post_title: string;
  board_name: string;
};

type GetAllPostsResponseType = {
  post_id: number;
  post_title: string;
  post_content: string;
  nickname: string;
  created_at: string;
  comment_count: number;
  board_name: string;
}[];

type GetPostsByBoardBodyType = {
  board_name: string;
};

type GetPostsByBoardResponseType = {
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
  board_name: string;
  comments: {
    nickname: string;
    comment_content: string;
    comment_id: number;
    created_at: string;
  }[];
};

type UpdatePostAPIBodyType = {
  post_id: string;
  board_name: string;
  post_title: string;
  post_content: string;
};

type SubmitCommentAPIBodyType = {
  username: string;
  post_id: number;
  comment_content: string;
};

type UpdateCommentAPIBodyType = {
  comment_id: number;
  comment_content: string;
};
