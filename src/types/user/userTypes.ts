export interface UserCompany {
  department: string;
  name: string;
}

export interface UserAddress {
  city: string;
  postalCode: string;
  state: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  image?: string;
  profileBackground?: string;
  age?: number;
  phone?: string;
  company?: string;
  birthDate?: string;
  about?: string;
  address?: string;
  website?: string;
  role?: string;
  status?: string;
  lastLogin?: string;
}
