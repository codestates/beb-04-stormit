// 게시물의 제목이 length보다 길면 length만큼으로 줄입니다 - nonon
export const shortenPostTitle = (title: string, length: number) => {
  if (title.length > length) {
    return `${title.slice(0, length)}...`;
  } else {
    return title;
  }
};

// 게시물의 내용이 length보다 길면 length만큼으로 줄입니다 - nonon
export const shortenPostContents = (contents: string, length: number) => {
  if (contents.length > length) {
    return `${contents.slice(0, length)}...`;
  } else {
    return contents;
  }
};

// Date를 0000년 00월 00일 00:00:00 의 형태로 파싱합니다 - nonon
export const parseDateAbsolute = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
};

// Date를 0 분전, 0 시간 전, 0 일 전, 0 년 전과 같은 형태로 파싱합니다 - nonon
export const parseDateRelative = (date: Date) => {
  const currentDate = new Date();
  const betweenTime =
    Math.floor(currentDate.getTime() - date.getTime()) / 1000 / 60;

  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) return `${betweenTime} 분 전`;

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) return `${betweenTimeHour} 시간 전`;

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) return `${betweenTimeDay} 일 전`;

  return `${Math.floor(betweenTimeDay / 365)} 년 전`;
};

// 게시글 배열 더미데이터 - nonon
export const FAKE_ARRAY = Array(105)
  .fill(0)
  .map((_, index) => index + 1);

// URL 경로의 마지막 부분만 잘라줍니다 - nonon
// ex) 'localhost:3000/community/talk' -> 'talk'
export const getLastPathname = (path: string) => {
  const pathArray = path.split("/");
  return pathArray[pathArray.length - 1];
};

// path에서 가져온 커뮤니티 이름을 한글로 변환합니다 - nonon
export const translateCommunityName = (communityName: string) => {
  if (communityName === "bitcoin") return "비트코인";
  if (communityName === "ethereum") return "이더리움";
  if (communityName === "solana") return "솔라나";
  if (communityName === "dogecoin") return "도지코인";
  if (communityName === "decentraland") return "디센트럴랜드";

  return "없음";
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
export const setCookie = (cookie: string, value: string, maxAge?: string) => {
  let cookieString = `${cookie}=${value}; path=/;`;
  if (maxAge) cookieString = cookieString + ` max-age=${maxAge}`;
  document.cookie = cookieString;
};

// 쿠키를 제거합니다 - nonon
export const removeCookie = (cookie: string) => {
  document.cookie = `${cookie}=; expires=Thu, 01 Jan 1999 00:00:10 GMT;`;
};

// 맨 위로 이동합니다 - nonon
export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

// 함수에 디바운스를 적용합니다 - nonon
export const debounce = (func: any, wait = 166) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: any) => {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};

// 로컬스토리지에 조회한 글을 저장합니다 - nonon
export const setViewed = (postId: number) => {
  const viewedList = localStorage.getItem("viewed")?.split("&");
  if (!viewedList) {
    localStorage.setItem("viewed", String(postId));
  } else {
    localStorage.setItem("viewed", viewedList.join("&"));
  }
};

// 글을 조회한 적이 있는지 확인합니다 - nonon
export const isViewed = (postId: number) => {
  const viewedList = localStorage.getItem("viewed")?.split("&");
  if (!viewedList) return false;

  return viewedList.includes(String(postId)) ? true : false;
};
