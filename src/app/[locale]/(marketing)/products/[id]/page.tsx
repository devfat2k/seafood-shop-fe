type ProductDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage(props: ProductDetailProps) {
  const { id } = await props.params;

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Chi tiết sản phẩm #{id}</h1>
      <p className="mt-2 text-neutral-600">Màn hình: Chi tiết sản phẩm (nối BE ở Block 7 / G5)</p>
    </div>
  );
}
