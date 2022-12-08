import { Category } from "./category"
import { Shop } from "./shop"

export type Price = {
    price: number,
    rate: number,
    shop: Shop,
}

export type Item = {
    id: string,
    name: string,
    description: string,
    categories: Category[],
    prices: Price[],
    imageUrl: string,
}