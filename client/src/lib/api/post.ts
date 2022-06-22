import axios from ".";

export const submitPostAPI = (content_id: number, body: PostAPIBodyType) =>
  axios.post(`/board/write-content?content_id=${content_id}`, body);
