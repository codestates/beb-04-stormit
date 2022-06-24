## 게시판
### 게시판 삭제하기
method: DELETE
URL: http://localhost:3000/board/1

---
### 게시판 생성하기
method: POST
URL: http://localhost:3000/board/
JSON: 
```
{
	"board_title" : "자유게시판"
}
```

---
### 게시판에 등록된 글 가져오기 
method: GET
URL: http://localhost:3000/board/1

---
### 게시판 전체 가져오기 (아직 게시판 이름만 가져옴)
method: GET
URL: http://localhost:3000/board

---
### 게시물 가져오기
method: GET
URL: http://localhost:3000/board/post/total

---
### 게시물 전체 가져오기
method: GET
URL: http://localhost:3000/board/post/1

---
### 게시물 삭제
method: DELETE 
URL: http://localhost:3000/board/post/1

---
### 게시물 작성( 기능우겨넣어 구현하다보니 현재 board_title이 의미없이 사용됨. 수정 필요)
method: POST
URL: http://localhost:3000/board/post
JSON:
```
{
	"email" : "abcd112@naver.com",
	"post_title": "31234",
	"post_content" : "3ㄷㄱㅎ 글씀",
	"board_title":"일간게시판",
	"user_id" : 1,
	"board_id": "1"

}

---
### 게시물 수정
method: PATCH
URL: http://localhost:3000/board/post/1
JSON:
{
	"email" : "abcd112@naver.com",
	"board_name": "spefkap1ㅈㄷㄹㄴㅇㅈㄷㄹㅈㄷㄹㄹㄴㅇㄹ23",
	"post_name" : "gi",
	"content":"내용임sss"
}
```
