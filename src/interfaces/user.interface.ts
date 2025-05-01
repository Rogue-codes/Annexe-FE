
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;   
  phone: string;
  address: string; 
  country: string;
  state: string;
  city: string;  
  imgUrl: string;  
  recipientCode: string;  
  isVerified: boolean;  
  isActive: boolean;  
  isAdmin: boolean;  
  isRegistrationComplete: boolean;  
  bankDetails: {
    accountNumber: string;
    accountName: string;
    bank: {
      bankName: string;
      bankCode: string;
    };
  }[];
}
