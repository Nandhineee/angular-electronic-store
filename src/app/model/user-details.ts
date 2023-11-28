import { Address } from "./address";

export interface UserDetails {
    id:number;
    username: string;
    name: string;
    joinedAt: string;
    role:string
    addressList: Address[];
  
}
