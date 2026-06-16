export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  profession: Profession;
  website: string;
  experience: string;
  githubUrl: string;
  linkedInUrl: string;
  facebookUrl: string;
  skills: string[];
  createdAt: string;
  picture: File | null;
}

export enum Profession {
  DIGITAL_MARKETER = 'digital_marketer',
  FULL_STACK_DEVELOPER = 'full_stack_developer',
  FRONT_END_DEVELOPER = 'front_end_developer',
  BACK_END_DEVELOPER = 'back_end_developer',
  MOBILE_DEVELOPER = 'mobile_developer',
  UI_UX_DESIGNER = 'ui_ux_designer',
  PRODUCT_DESIGNER = 'product_designer',
  DATA_ANALYST = 'data_analyst',
  DATA_ENGINEER = 'data_engineer',
}
