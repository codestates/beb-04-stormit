import axios from ".";

// 회원가입
export const signUpAPI = (body: SignUpAPIBodyType) => axios.post("/user", body);

// 로그인
export const loginAPI = (body: LoginAPIBodyType) =>
  axios.post<LoginAPIResponseType>("/user/login", body);

// 프로필 정보
export const getProfileAPI = (email: string) =>
  axios.get<GetProfileAPIResponseType>(`/user/${email}`);

// 닉네임 변경
export const updateNameAPI = (email: string, body: UpdateNameAPIBodyType) =>
  axios.patch(`/user/${email}`, body);

// 비밀번호 변경
export const updatePasswordAPI = (
  email: string,
  body: UpdatePasswordAPIBodyType
) => axios.patch(`/user/${email}`, body);

// 회원탈퇴
export const withdrawalAPI = (email: string) => axios.delete(`/user/${email}`);

// 액세스 토큰으로 유저 정보 가져오기
export const authenticateAPI = (body: AuthenticateAPIBodyType) =>
  axios.post<AuthenticateAPIResponseType>("/user/authenticate", body);
