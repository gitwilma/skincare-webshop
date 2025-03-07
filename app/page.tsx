import { products } from "@/data";

export default function Home() {
  return (
    <main>
      <h1>Produkter</h1>
      {products.map((product) => (
        <article key={product.id}>
          <h3>{product.title}</h3>
          <p>Artikelnr: {product.articleNumber}</p>
          <p>{product.description}</p>
          <p>Pris: {product.price} kr</p>
        </article>
      ))}
    </main>
  );
}
