// 게시물의 내용이 120자보다 길면 120자만큼으로 줄입니다 - nonon
export const shortenPostContents = (contents: string) => {
  if (contents.length > 120) {
    return `${contents.slice(0, 120)}...`;
  } else {
    return contents;
  }
};

// Date를 0000년 00월 00일 00:00:00 의 형태로 파싱합니다 - nonon
export const parseDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
};

// 게시글 배열 더미데이터 - nonon
export const FAKE_ARRAY = Array(10).fill(0);

// URL 경로의 마지막 부분만 잘라줍니다 - nonon
// ex) 'localhost:3000/community/talk' -> 'talk'
export const getLastPathname = (path: string) => {
  const pathArray = path.split("/");
  return pathArray[pathArray.length - 1];
};

// path에서 가져온 커뮤니티 이름을 한글로 변환합니다 - nonon
export const translateCommunityName = (communityName: string) => {
  if (communityName === "notice") return "공지사항";
  if (communityName === "talk") return "사는얘기";
  if (communityName === "forum") return "포럼";
  if (communityName === "it") return "IT 행사";
  if (communityName === "qa") return "Q&A";
};

// document.cookie를 객체 형태로 바꿔줍니다 - nonon
export const parseCookie = (cookieString: string) => {
  const cookieArray = cookieString.split(";");

  const cookieObject: any = {};

  cookieArray.forEach((cookie) => {
    if (cookie.startsWith(" ")) {
      const slicedCookie = cookie.slice(1);

      const cookieNameValue = slicedCookie.split("=");
      cookieObject[cookieNameValue[0]] = cookieNameValue[1];
    } else {
      const cookieNameValue = cookie.split("=");
      cookieObject[cookieNameValue[0]] = cookieNameValue[1];
    }
  });

  return cookieObject;
};

// 쿠키를 설정합니다 - nonon
export const setCookie = (cookie: string, value: string) => {
  document.cookie = `${cookie}=${value}`;
};

// 쿠키를 제거합니다 - nonon
export const removeCookie = (cookie: string) => {
  document.cookie = `${cookie}=; expires=Thu, 01 Jan 1999 00:00:10 GMT;`;
};
