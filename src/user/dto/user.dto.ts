import { OmitType } from '@nestjs/swagger';
import { User } from '@/user/entities/user.entity';

export class UserOut extends OmitType(User, ['passhash']) {}
