import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { deleteContentDto } from '../content/dto/delete-content.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findByFields(
    options: FindOneOptions<UserDTO>,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }

  async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
    await this.transformPassword(userDTO);
    return await this.userRepository.save(userDTO);
  }

  async delete(user_id: number): Promise<any> {
    return this.userRepository.deleteUser(user_id);
  }

  async updateHashedRt(user_id: number, hash: any): Promise<any> {
    return this.userRepository.update({ user_id: user_id }, { hashedRt: hash });
  }

  async updateNickname(user_id: number, body: any): Promise<any> {
    return this.userRepository.update(
      { user_id: user_id },
      { nickname: body.nickname },
    );
  }

  async updatePassword(userDTO: UserDTO, new_password: string): Promise<any> {
    userDTO.password = new_password;
    // await this.userRepository.update({username: userDTO.username}, {password:new_password})
    await this.transformPassword(userDTO);
    return this.userRepository.update(
      { username: userDTO.username },
      { password: userDTO.password },
    );
  }

  async transformPassword(user: UserDTO): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }

  async getUserIfRefreshTokenMatches(
    refresh_token: string,
    id: number,
  ): Promise<any> {
    const user = await this.findByFields({ where: { user_id: id } });
    const isRefreshTokenMatching = await bcrypt.compare(
      refresh_token,
      user.hashedRt,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(user_id: number): Promise<any> {
    return this.userRepository.update({ user_id: user_id }, { hashedRt: null });
  }
  async getUserByNickname(userNickname: string): Promise<User> {
    return this.userRepository.getUserByNickname(userNickname);
  }
  async getUserById(user_id: number): Promise<User> {
    return this.userRepository.getUserById(user_id);
  }
}
