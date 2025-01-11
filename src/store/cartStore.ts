import { create } from "zustand";

interface CartItem {
    id: number;
    image: string;
    price: string;
    name: string;
    quantity: number;
}

type CartStore = {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    getTotalPrice: () => number;
    removeItem: (item: CartItem) => void;
    clearStore: () => void;
};

const useCartStore = create<CartStore>((set, get) => ({
    cartItems: [],
    addItem: (item: CartItem) => set((state) => {
        const checkExisting = state.cartItems.find((cartItem) => cartItem.id === item.id)
        if (checkExisting) {
            const updateCart = state.cartItems.map((cartItem) =>
                cartItem.id == item.id ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1

                } :
                    cartItem
            );
            return { cartItems: updateCart }
        }
        else {

            return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
        }

    }),
    getTotalPrice: () => {
        const state = get();

        return state.cartItems.reduce((total, item) => {
            const price = parseFloat(item.price);
            return total + price * (item.quantity);
        }, 0);
    },
    removeItem: (item: CartItem) => set((state) => {
        const data = state.cartItems.filter((cartItem) => cartItem.id !== item.id)
        return { cartItems: data }
    }),
    clearStore: () => set({ cartItems: [] }),



}));

export default useCartStore;
