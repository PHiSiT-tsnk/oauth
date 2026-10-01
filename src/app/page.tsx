import Link from "next/link";
import { auth } from "@/auth";
import { getProducts } from "@/lib/products";
import { AuthButtons } from "@/components/auth-buttons";

export default async function HomePage() {
  const session = await auth();
  const products = getProducts();
  const isLoggedIn = Boolean(session?.user);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>สินค้า</h1>
        <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
      </header>

      <div style={{ display: "grid", gap: "1rem" }}>
        {products.map((product) => (
          <article
            key={product.id}
            data-testid="product"
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>
              <strong>{product.price.toLocaleString("th-TH")} บาท</strong>
            </p>
            {isLoggedIn && (
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                <Link href={`/products/${product.id}/edit`}>แก้ไข</Link>
                <Link href={`/products/${product.id}/delete`}>ลบ</Link>
              </div>
            )}
          </article>
        ))}
        {products.length === 0 && <p>ไม่มีสินค้า</p>}
      </div>
    </main>
  );
}