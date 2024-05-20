import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '@/session/entities/session.entity';
import { SessionDto } from '@/session/dto/session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}
  create(createSessionDto: SessionDto) {
    const newSesssion = this.sessionRepository.create({
      userId: createSessionDto.userId,
      refreshToken: createSessionDto.refreshToken,
    });

    return this.sessionRepository.save(newSesssion);
  }

  findAll() {
    return this.sessionRepository.find();
  }

  findOne(userId: number) {
    return this.sessionRepository.findOne({
      where: {
        userId: userId,
      },
    });
  }

  upsert(createSessionDto: SessionDto) {
    const { userId, refreshToken } = createSessionDto;
    return this.sessionRepository.upsert({ userId, refreshToken }, ['userId']);
  }
}
