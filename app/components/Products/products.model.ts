"use client";

import React, { useEffect, useState } from "react";
import { Product } from "./products.types";

export const ProductsModel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (!search.trim()) return true;

    const terms = search.toLowerCase().split(/\s+/);

    return terms.every((term) => {
      const inName = product.name.toLowerCase().includes(term);
      const inModel = product.model.toLowerCase().includes(term);
      const inCars = product.cars.some((car) =>
        car.toLowerCase().includes(term)
      );
      return inName || inModel || inCars;
    });
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchProducts();
  }, []);

  return { search, handleSearch, filteredProducts };
};
