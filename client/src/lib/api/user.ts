import axios from ".";

// 회원가입
export const signupAPI = (body: SignUpAPIBodyType) =>
  axios.post<SignUpAPIBodyType>("/user", body);

// 로그인
export const loginAPI = (body: LoginAPIBodyType) =>
  axios.post<LoginAPIBodyType>("/user/login", body);

// 로그아웃
export const logoutAPI = () => axios.delete("/api/auth/logout");

// 프로필 정보
export const profileAPI = (email: string) => axios.get(`/user/${email}`);

// 닉네임 변경
export const updateNameAPI = (email: string, body: UpdateNameAPIBodyType) =>
  axios.patch(`/user/${email}/modify-nickname`, body);

// 비밀번호 변경
export const updatePasswordAPI = (
  email: string,
  body: UpdatePasswordAPIBodyType
) => axios.patch(`/user/${email}`, body);

// 회원탈퇴 (수정될 수 있음)
export const withdrawalAPI = (email: string) =>
  axios.delete(`/user/${email}/delete-user`);
