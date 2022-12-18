import create from "zustand";
import { Product } from "../type/product";

type ProductsStore = {
    products: Product[];
    setProducts: (products: Product[]) => void;
}

const useProductsStore = create<ProductsStore>(
    (set): ProductsStore => ({
        products: [],
        setProducts: (products: Product[]) =>
            set((state) => ({
                ...state,
                products,
            })),
    })
);

export default useProductsStore;