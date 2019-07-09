export interface ICategory {
    categoryList: IShoppingCategory[];
}
export interface IShoppingCategory {
    title: string;
    icon: string;
    color: string;
    items: string[];
    groupId: number;
}
