/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, JSX, ReactNode } from "react";

export type actionProps = {
  type: string;
  payload?: any;
};
export interface GradeInfoProps {
  created_at: string; // ISO 8601 formatted date-time string
  description: string; // Description of the grade
  grade_level: number; // Integer representing the grade level
  updated_at: string; // ISO 8601 formatted date-time string
}
export interface AVALIABLESUBJECT {
  created_at: "string";
  description: "string";
  name: "string";
  subject_id: "string";
  updated_at: "string";
}
export interface SIGNUPFROMDATA {
  first_name: "string";
  last_name: "string";
  role: "string";
  password: "string";
  mobile: "string";
  email: "string";
}
export interface AUTHLAYOUTPROPS {
  children: ReactNode;
  showBack?: boolean;
  loading?: boolean;
}
export interface MAINLAYOUTPROPS {
  children: ReactNode;
  route: string;
  header?: string;
  window?: () => Window;
  loading?: boolean;
}
export type DispatchType = Dispatch<actionProps>;
export type genericStateType = {
  error: any;
  loading: boolean;
  data: any[];
};
export type actionPayload = {
  type: string;
  payload: any;
};
export type authStateType = {
  loggedIn: boolean;
  loading: boolean;
  data: USERDATA | null;
  error: any;
};
export interface Person {
  id?: string;
  companyName?: string;
  email?: string;
  location?: string;
  product?: string;
  capacity?: number;
  pricePerTonne?: number;
  supplierName?: string;
  supplierPrice?: number;
  shippingCost?: number;
  negotiatePrice?: boolean;
  priceRange?: number;
  savedStatus?: string;
  status?: string;
  docUrl?: string | null;
  buyerId?: string | null;
  supplierId?: string | null;
  accountManagerId?: string | null;
  userId?: string;
  createdAt?: string; 
  updatedAt?: string; 
  buyer?:{
    firstName?: string
    lastName?: string
    email?: string
  }
  supplier?:{
    firstName?: string
    lastName?: string
    email?: string
  }
  buyerAccountManager?:{
    firstName?: string
    lastName?: string
    email?: string
  }
  supplierAccountManager?:{
    firstName?: string
    lastName?: string
    email?: string
  }
  buyerName?:string;
  sellerName?:string;
  supplierLocation?:string;
  buyerLocation?:string;
  message?: string
  success?: boolean;
  data?:[]
}

export interface USERDATA {
  token: string;
  user: {
    created_at: string;
    email: string;
    onboarding_complete: boolean;
    email_verified: "false" | "true";
    first_name: string;
    last_name: string;
    login_count: number;
    mobile: string;
    mobile_verified: boolean;
    role: string;
    status: string;
    updated_at: string;
    user_id: string;

    learner_profile?: {
      created_at: Date;
      grade: number;
      learner_id: string;
      profile_image: null | string;
      updated_at: string;
      user_id: string;
    };

    user_name: null | string;
  };
}
export interface GlobalContextProps {
  authState: authStateType;
  authDispatch: DispatchType;
  subjectsDispatch: DispatchType;
  subjectsState: genericStateType;
  avaliableSubjectDispatch: DispatchType;
  avaliableSubjectsState: genericStateType;
  avaliableGradesDispatch: DispatchType;
  avaliableGradesState: genericStateType;
  countryCodeState: genericStateType;
  countryCodeDispatch: DispatchType;
}
