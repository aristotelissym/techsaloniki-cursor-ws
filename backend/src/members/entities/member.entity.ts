import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum Sex {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum CatDogPreference {
  CAT = 'Cat',
  DOG = 'Dog',
  BOTH = 'Both',
}

@Entity('members')
export class Member {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

  @Column('varchar', { length: 255, nullable: false })
  first_name: string;

  @Column('varchar', { length: 255, nullable: false })
  last_name: string;

  @Column({
    type: 'enum',
    enum: Sex,
    nullable: false,
  })
  sex: Sex;

  @Column('varchar', { length: 255, nullable: true })
  hometown: string;

  @Column('varchar', { length: 255, nullable: true })
  job_title: string;

  @Column({
    type: 'enum',
    enum: CatDogPreference,
    nullable: false,
  })
  cat_dog_lover: CatDogPreference;
} 