import axios from ".";

// 회원가입
export const signUpAPI = (body: SignUpAPIBodyType) => axios.post("/user", body);

// 로그인
export const loginAPI = (body: LoginAPIBodyType) =>
  axios.post<LoginAPIResponseType>("/user/login", body);

// 프로필 정보
export const getProfileAPI = (userId: number) =>
  axios.get<GetProfileAPIResponseType>(`/user/${userId}`);

// 닉네임 변경
export const updateNameAPI = (userId: number, body: UpdateNameAPIBodyType) =>
  axios.patch(`/user/${userId}`, body);

// 비밀번호 변경
export const updatePasswordAPI = (
  userId: number,
  body: UpdatePasswordAPIBodyType
) => axios.patch(`/user/${userId}`, body);

// 회원탈퇴
export const withdrawalAPI = (userId: number) =>
  axios.delete(`/user/${userId}`);

// 인가: 액세스 토큰으로 유저 정보 가져오기
export const authenticateAPI = (jwt: string) =>
  axios.get<AuthenticateAPIResponseType>("/user/authenticate", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
