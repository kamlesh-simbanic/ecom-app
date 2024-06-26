"use server";

import { auth } from "@/app/_helpers/server";
import { Product } from "@/app/assets/products";
import dynamic from "next/dynamic";
import { Col, Row } from "react-bootstrap";

const ProductCard = dynamic(
  () => import("@/app/_components/products/productCard")
);

const ProductList = async ({ products }: { products: Product[] }) => {
  const isAuthenticated = auth.isAuthenticated();

  return (
    <Row>
      {products.length > 0 ? (
        products.map((product: Product) => (
          <Col md={6} lg={4} xl={3} sm={12} className="p-2 " key={product.id}>
            <ProductCard
              key={product.id}
              product={product}
              isAuthenticated={isAuthenticated}
            />
          </Col>
        ))
      ) : (
        <Col className="p-1">
          <h2 className="text-danger">No Products</h2>
        </Col>
      )}
    </Row>
  );
};

export default ProductList;
