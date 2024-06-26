import { getProduct } from "../actions";
import Content from "@/app/_components/products/Details";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import StackRow from "@/app/_components/stack-row";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) {
    throw new Error(`Product Not Found with ${params.id}`);
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.name,
    openGraph: {
      images: previousImages,
    },
  };
}

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await getProduct(id);

  return (
    <>
      <Content product={product} readOnly={true} />
      <StackRow>
        <Link
          href={`/app/products/${params.id}/edit`}
          className=" btn btn-info"
        >
          Edit
        </Link>
      </StackRow>
    </>
  );
}
