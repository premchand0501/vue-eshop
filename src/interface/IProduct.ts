export interface IProduct{
    name: String;
    description: String;
    image: String;
    discount: number;
    price: number;
    discountedPrice: number;
    category: string;
    brand: string;
    groupId: number;
}
export interface IProductGroup{
    icon: string;
    id: number;
    title: String;
    description: String;
    products: IProduct[];
}
export interface IProductList{
    group: IProductGroup[];
}