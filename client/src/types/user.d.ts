type SignUpAPIBodyType = {
  email: string;
  password: string;
  nickname: string;
};

type LoginAPIResponseType = {
  email: string;
  passwordHash: string;
  nickname: string;
  userId: number;
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
  current_password: string;
  new_password: string;
};

type AuthenticateAPIBodyType = {
  access_token: string;
};

type AuthenticateAPIResponseType = {
  user_id: number;
  email: string;
  password: string;
  nickname: string;
};

type GetProfileAPIResponseType = {
  user_id: number;
  email: string;
  nickname: string;
  created_at: string;
  wallet_address: string;
  balance: number;
};
