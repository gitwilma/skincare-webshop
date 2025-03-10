/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/
export interface Product {
  id: string;
  articleNumber: string;
  image: string;
  title: string;
  slug: string;
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
    image:
      "https://beautyofjoseon.com/cdn/shop/files/RiceMilkThumb_0003_LayerComp4_1.jpg?v=1736150232&width=900",
    title: "Toner",
    slug: "Toner",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
  {
    id: "2",
    articleNumber: "22",
    image:
      "https://beautyofjoseon.com/cdn/shop/files/1_ed366512-7a8b-481b-aff1-13ff67549ae7.png?v=1705211742&width=900",
    title: "Refreshing Pore Mask",
    slug: "Refreshing-Pore-Mask",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
  {
    id: "3",
    articleNumber: "33",
    image:
      "https://beautyofjoseon.com/cdn/shop/files/1_8f4b1947-4539-4aff-b2f7-18192c23cbf8.png?v=1705211384&width=528",
      title: "Glow Serum",
      slug: "Glow-serum",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
  {
    id: "4",
    articleNumber: "44",
    image:
      "https://beautyofjoseon.com/cdn/shop/files/1_c7df0b43-9352-46c1-8dac-dd0602014d6b.png?v=1705211262&width=1080",
    title: "Essence Water",
    slug: "Essence-Water",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
  {
    id: "5",
    articleNumber: "55",
    image:
      "https://beautyofjoseon.com/cdn/shop/files/1_de2af4bd-f530-45da-88bd-8710eb65e937.png?v=1705211261&width=3000",
    title: "Cleansing Oil",
    slug: "Cleansing-Oil",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
  {
    id: "6",
    articleNumber: "66",
    image:
      "https://beautyofjoseon.com/cdn/shop/files/1-NEW_1.png?v=1736151688&width=1080",
      title: "Dynasty Cream",
      slug: "Dynasty-Cream",
    description: "Lorem lorem hejehejehejehehjeje",
    price: 24,
  },
];
