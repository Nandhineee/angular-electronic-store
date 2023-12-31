export interface Order {
    id: number;
    total: number;
    username: String;
    createdAt?: Date;
    addressId?:number;
    orderStatus?:number;

    gadgetList: {
      id?: number;
      title: String;
      description?: string;
      price: number;
      count: number;
    }[];
}
