import { EntityRepository, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async deleteUser(user_id: number): Promise<any> {
    const result = await this.delete(user_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find User with id ${user_id}`);
    }
    console.log('result', result);
    return result;
  }
  async getUserById(user_id: number): Promise<User> {
    const result = await this.findOne(user_id);
    if (!result) {
      throw new NotFoundException(`Can't find User with id ${user_id}`);
    } else {
      return result;
    }
  }
  async getUserByNickname(userNickname: string): Promise<User> {
    console.log(`getUserByNickname() : ${userNickname}`);
    const found = await this.findOne({ nickname: userNickname });

    console.log(found);

    return found;
  }
}
