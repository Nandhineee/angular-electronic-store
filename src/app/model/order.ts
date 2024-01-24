import { Address } from "./address";
import { Product } from "./product";

export interface Order {
    id: number;
    total: number;
    username: String;
    count?: number;
    createdAt?: String;
    addressId?:number;
    orderStatus?:number; 
    orderedProductList?: Product[];
    orderStatusId?:number;
    
    // address?:string,
    // pincode?:number,
    // city?:string

    gadgetList: {
      id?: number;
      title: String;
      description?: string;
      price: number;
      count: number;
      orderTime?:string;
    }[];
}
