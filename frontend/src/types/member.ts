export type Sex = 'Male' | 'Female' | 'Other';
export type CatDogPreference = 'Cat' | 'Dog' | 'Both';

export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  sex: Sex;
  hometown: string;
  job_title: string;
  cat_dog_lover: CatDogPreference;
}

export type MemberFormData = Omit<Member, 'id'>; 