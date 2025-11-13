import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Index } from 'typeorm'
import { ISetting, SettingValueType } from '../../Interface'

@Entity()
@Index(['key', 'workspaceId'], { unique: true })
export class Setting implements ISetting {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    key: string

    @Column({ type: 'text', nullable: true })
    value: string | null

    @Column({ type: 'varchar', default: 'string' })
    valueType: SettingValueType

    @Column({ type: 'text', nullable: true })
    workspaceId?: string | null

    @Column({ type: 'timestamp' })
    @CreateDateColumn()
    createdDate: Date

    @Column({ type: 'timestamp' })
    @UpdateDateColumn()
    updatedDate: Date
}
