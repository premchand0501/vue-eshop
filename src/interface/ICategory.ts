export interface ICategory{
    shoppingList: IShoppingCategory[];
}
export interface IShoppingCategory{
    title: string;
    icon: string;
    color: string;
    items: string[];
}