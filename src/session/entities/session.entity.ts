import { BaseTable } from '@/utils/BaseTable';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export interface SessionCreate extends Omit<Session, 'id'> {}

@Entity()
export class Session extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['userId'])
  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'refresh_token', type: 'varchar', nullable: true })
  refreshToken: string | null;
}
