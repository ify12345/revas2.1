
export interface Profile {
  id: number;
  jobTitle: null | string;
  businessName: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  streetAddress1: string;
  streetAddress2: null | string;
  city: string;
  countryId: number;
  zipCode: string;
  hasVerifiedEmail: boolean;
  profilePhotoUrl: string;
  state: null | string;
  country: {
    countryName: string;
    countryId: number;
    countryCode: string;
    countryDialCode: string;
  };
  doesHomeService: boolean;
  roles: Role[];
}

export enum Role {
  ADMIN = 1,
  MANAGER = 2,
  STAFF = 3,
  CLIENT = 4,
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_active: boolean;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
  token?: string
}

export interface ApiError {
  msg: string;
  status: number;
}

export interface ErrorPayload {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
    status: number;
  };
}


export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  email: string;
  phone_number: string;
  user_id: string;
  email_verified: boolean;
  phone_verified: boolean;
  profile: object;
  user: {
    user_type_id: string;
    user_type: string;
  };
}

export interface forgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface GetOverviewResponse {
  success: boolean;
  message: string;
  data: {
    overview: {
      totalEarning: number;
      totalBooked: number;
    };
  };
}

