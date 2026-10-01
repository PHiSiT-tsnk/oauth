import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { updateProductAction } from "@/app/actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }

  const updateAction = updateProductAction.bind(null, product.id);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>แก้ไขสินค้า</h1>
      <form
        action={updateAction}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <div>
          <label htmlFor="name">ชื่อสินค้า: </label>
          <input
            id="name"
            name="name"
            defaultValue={product.name}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="price">ราคา: </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={product.price}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="description">รายละเอียด: </label>
          <textarea
            id="description"
            name="description"
            defaultValue={product.description}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit">บันทึก</button>
          <Link href="/">ยกเลิก</Link>
        </div>
      </form>
    </main>
  );
}