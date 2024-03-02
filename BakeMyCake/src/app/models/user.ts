export type User = {
    id: number;
    username: string;
    email: string;
    role: 'user' | 'administrator';
    password?: string;
    confirmPassword?: string;
    gender?: string;
    age?: number;
    phone?: number;
    address: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: number;
  };
  }
  