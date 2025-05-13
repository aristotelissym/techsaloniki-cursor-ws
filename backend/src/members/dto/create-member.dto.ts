import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { Sex, CatDogPreference } from '../entities/member.entity';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEnum(Sex)
  sex: Sex;

  @IsOptional()
  @IsString()
  hometown?: string;

  @IsOptional()
  @IsString()
  job_title?: string;

  @IsNotEmpty()
  @IsEnum(CatDogPreference)
  cat_dog_lover: CatDogPreference;
} 