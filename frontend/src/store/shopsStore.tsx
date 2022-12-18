import create from "zustand";
import { Shop } from "../type/shop";

type ShopsStore = {
    shops: Shop[];
    setShops: (shops: Shop[]) => void;
    addShop: (shop: Shop) => void;
}

const useShopsStore = create<ShopsStore>(
    (set): ShopsStore => ({
        shops: [],
        setShops: (shops: Shop[]) =>
            set((state) => ({
                ...state,
                shops,
            })),
        addShop: (shop: Shop) =>
            set((state) => ({
                ...state,
                shops: [
                    shop,
                    ...state.shops
                ]
            }))
    })
);

export default useShopsStore;