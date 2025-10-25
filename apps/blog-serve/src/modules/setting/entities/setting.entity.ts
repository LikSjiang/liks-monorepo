import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('setting')
export class Setting {
  @PrimaryGeneratedColumn('uuid', { comment: '选项ID' })
  id: string;

  @Column({ type: 'varchar', length: 255, comment: '选项名称' })
  name: string;

  @Column({ type: 'text', nullable: true, comment: '选项值' })
  value: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '选项描述' })
  description?: string;

  @Column({ type: 'int', nullable: true, comment: '排序' })
  sort?: number;

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
