import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 100,unique:true })
    username: string
    @Column({ type: 'varchar', unique: true, length: 100 })
    email: string
    @Column({ type: 'varchar', length: 100 ,unique:true})
    password: string
}