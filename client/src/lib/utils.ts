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
