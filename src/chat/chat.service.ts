import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-chat.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '@/chat/entities/chat.entity';
import { Repository } from 'typeorm';
import { UserService } from '@/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  async create(newMessage: CreateMessageDto): Promise<Message> {
    const author = await this.userService.findById(newMessage.authorId);

    if (!author) {
      throw new BadRequestException('Author does not exist');
    }

    const messageToCreate = {
      author,
      text: newMessage.text,
    };

    return this.messageRepository.save(messageToCreate);
  }

  async findAll() {
    return this.messageRepository.find({
      relations: ['author'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatInput: any) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
