import { EntityRepository, Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { NotFoundException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async deleteUser(user_id: number): Promise<void> {
        const result = await this.delete(user_id);
        if (result.affected === 0) {
          throw new NotFoundException(`Can't find User with id ${user_id}`);
        }
        console.log('result', result);
    }
}