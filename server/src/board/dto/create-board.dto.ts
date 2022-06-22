import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// DTO(Data Transfer Object)
// 계층간 데이터 교환을 위한 객체
// DB에서 데이터를 얻어 Service나 Controller 등으로 보낼 때 사용하는 객체를 말한다.
// DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체
// inferface나 class를 이용해서 정의할 수 있다. (nest에서는 class를 추천함)
// class는 인터페이스와 다르게 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할 떄 더 유용하다.
// 쓰는 이유
// 데이터 유효성을 체크하는데 효율적임
// 더 안정적인 코드로 만들어준다.
export class CreateBoardDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly post_name: string;

  @IsString()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  readonly board_name: string;
}
