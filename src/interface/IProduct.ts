export interface IProduct {
    name: string;
    description: string;
    image: string;
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
    products: IProduct[];
    landingProducts: IProduct[];
    landingPageCategories: string[]
}
export interface IProductDetails {
    detail: IProduct | undefined;
}
export interface Query {
    key: string;
    value: any;
}