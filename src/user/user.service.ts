import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserCreate } from '@/user/entities/user.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      relations: ['posts', 'comments'],
      where: {
        username,
      },
    });
  }

  async findById(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async update(userId: number, options: QueryDeepPartialEntity<User>) {
    return this.userRepository.update(userId, {
      ...options,
    });
  }

  async create(user: UserCreate) {
    const { username, passhash } = user;

    const isUserExists = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (isUserExists) {
      throw new ConflictException('User already exists');
    }

    const createdUser = this.userRepository.create({
      username,
      passhash,
    });

    return await this.userRepository.save(createdUser);
  }

  userForToken(user: User) {
    return omit(user, ['passhash']);
  }
}
