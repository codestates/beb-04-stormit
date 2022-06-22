type SignUpAPIBodyType = {
  email: string;
  password: string;
  nickname: string;
};

type LoginAPIBodyType = {
  email: string;
  password: string;
};

type UpdateNameAPIBodyType = {
  user_id: number;
  nickname: string;
};

type UpdatePasswordAPIBodyType = {
  user_id: number;
};
