import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, comment: '文件名称' })
  name: string;

  @Column({ type: 'varchar', length: 255, comment: '文件原名称' })
  originalname: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '文件哈希值' })
  hash: string;

  @Column({ type: 'varchar', length: 250, comment: '文件大小' })
  size: string;

  @Column({ type: 'varchar', length: 250, comment: '文件路径' })
  url: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: 'MIME' })
  mime: string;

  @Column({ type: 'tinyint', nullable: true, comment: '文件是否删除', default: 0 })
  deleted: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;
}
