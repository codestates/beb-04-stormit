import { EntityRepository, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserDTO } from './dto/user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: UserDTO): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({ username, password });
    await this.save(user);
  }
}
