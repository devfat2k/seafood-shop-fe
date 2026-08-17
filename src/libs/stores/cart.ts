'use client';

import { useSyncExternalStore } from 'react';

export type CartItem = {
  id: string | number;
  name: string;
  weight?: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

const STORAGE_KEY = 'seafood_cart';

let state: CartState = {
  items: [],
  isOpen: false,
};

function parseCartItems(raw: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is CartItem =>
          typeof item === 'object' &&
          item !== null &&
          'id' in item &&
          'name' in item &&
          'price' in item,
      );
    }
  } catch (error) {
    console.error('Failed to parse cart items:', error);
  }
  return [];
}

// Initialize from localStorage on client
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      state.items = parseCartItems(raw);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
}

const listeners = new Set<() => void>();

function emitChange() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }
  for (const listener of listeners) {
    listener();
  }
}

export const cartStore = {
  getState() {
    return state;
  },

  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  openCart() {
    state = { ...state, isOpen: true };
    emitChange();
  },

  closeCart() {
    state = { ...state, isOpen: false };
    emitChange();
  },

  toggleCart() {
    state = { ...state, isOpen: !state.isOpen };
    emitChange();
  },

  addItem(newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) {
    const quantity = newItem.quantity ?? 1;
    const existingIndex = state.items.findIndex((item) => item.id === newItem.id);

    const nextItems: CartItem[] =
      existingIndex === -1
        ? [...state.items, { ...newItem, quantity }]
        : state.items.map((item, idx) =>
            idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item,
          );

    state = { ...state, items: nextItems, isOpen: true };
    emitChange();
  },

  updateQuantity(id: string | number, delta: number) {
    const nextItems = state.items
      .map((item) => {
        if (item.id === id) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);

    state = { ...state, items: nextItems };
    emitChange();
  },

  removeItem(id: string | number) {
    state = {
      ...state,
      items: state.items.filter((item) => item.id !== id),
    };
    emitChange();
  },

  clearCart() {
    state = { ...state, items: [] };
    emitChange();
  },
};

const subscribeStore = (listener: () => void) => cartStore.subscribe(listener);
const getStoreSnapshot = () => cartStore.getState();

export function useCartStore() {
  const current = useSyncExternalStore(
    subscribeStore,
    getStoreSnapshot,
    () => state, // SSR fallback
  );

  const totalCount = current.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = current.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items: current.items,
    isOpen: current.isOpen,
    totalCount,
    subtotal,
    openCart: () => {
      cartStore.openCart();
    },
    closeCart: () => {
      cartStore.closeCart();
    },
    toggleCart: () => {
      cartStore.toggleCart();
    },
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      cartStore.addItem(item);
    },
    updateQuantity: (id: string | number, delta: number) => {
      cartStore.updateQuantity(id, delta);
    },
    removeItem: (id: string | number) => {
      cartStore.removeItem(id);
    },
    clearCart: () => {
      cartStore.clearCart();
    },
  };
}
