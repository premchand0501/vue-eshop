export interface IProduct {
    name: String;
    description: String;
    image: String;
    discount: number;
    price: number;
    discountedPrice: number;
    category: string;
    brand: string;
    groupId: number;
    showOnLandingPage: boolean;
    productId: number
}
export interface IProductList {
    group: IProduct[];
}
export interface IProductDetails {
    detail: IProduct | undefined;
}
export interface Query {
    key: string;
    value: any;
}