export type Order={
    id?:number,
    itemName?:string,
    price?: number,
    quantity?: number,
    total?:number,
    customerName?: string,
    email?: string,
    phone?: number,
    address: {
     street?: string,
     zipCode?: number
  }
  processed?: boolean;
}