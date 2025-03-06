/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/
export interface Product {
  id: string;
  articleNumber: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/* Lägg till era produkter här */
export const products: Product[] = [
  {
    id: "1",
    articleNumber: "11",
    image: "",
    title: "Toner",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
  {
    id: "2",
    articleNumber: "22",
    image: "",
    title: "Refreshing Pore Mask",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
  {
    id: "3",
    articleNumber: "33",
    image: "",
    title: "Dynasty cream",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
  {
    id: "4",
    articleNumber: "44",
    image: "",
    title: "Toner",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
  {
    id: "5",
    articleNumber: "55",
    image: "",
    title: "Toner",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
  {
    id: "6",
    articleNumber: "66",
    image: "",
    title: "Toner",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
];
