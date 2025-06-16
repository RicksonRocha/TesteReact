"use client";

import React from "react";
import { ProductsView } from "./products.view";
import { ProductsModel } from "./products.model";

export default function Products() {
  const props = ProductsModel();

  return <ProductsView {...props} />;
}
