"use client";

import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

interface Product {
  name: string;
  image: string;
  model: string;
  treadwear: number;
  traction: string;
  temperature: string;
  pattern: string;
  loadIndex: string;
  speedRating: string;
  noise: number;
  rollingResistance: string;
  wetGrip: string;
  cars: string[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");

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

  return (
    <div className="w-full flex justify-center items-center flex-col h-full px-4 py-6">
      <form
        className="w-full md:w-1/2 mx-auto mb-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-full mb-4">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-900"
          >
            Pesquisa
          </label>
          <div className="mt-2 relative">
            <input
              id="search"
              type="search"
              placeholder="Pesquisar produtos"
              className="block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="search-input"
            />
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400"
            />
          </div>
        </div>
      </form>

      <div className="mb-4 border-b border-gray-300 w-full max-w-3xl" />

      <div
        className="flex flex-col items-center gap-6 w-full max-w-3xl"
        data-testid="products"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => (
            <div
              key={idx}
              data-testid="product"
              className="bg-white shadow-md rounded-3xl px-4 py-4 w-full flex flex-col md:flex-row items-center md:items-stretch"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-auto object-contain mb-2"
                />
                <h3 className="font-bold text-sm">{product.model}</h3>
              </div>

              <div className="w-1 bg-black mx-4 self-stretch" />

              <div className="flex-1 mt-4 md:mt-0 w-full">
                <h2 className="text-xl font-bold text-center md:text-left mb-4">
                  {product.name}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm text-black">
                  <div>
                    <span className="text-gray-500">Durabilidade</span>
                    <h5 className="font-bold">{product.treadwear}</h5>
                  </div>
                  <div>
                    <span className="text-gray-500">Tração</span>
                    <h5 className="font-bold">{product.traction}</h5>
                  </div>
                  <div>
                    <span className="text-gray-500">Temperatura</span>
                    <h5 className="font-bold">{product.temperature}</h5>
                  </div>
                  <div>
                    <span className="text-gray-500">Velocidade</span>
                    <h5 className="font-bold">{product.speedRating}</h5>
                  </div>
                  <div>
                    <span className="text-gray-500">Carga</span>
                    <h5 className="font-bold">{product.loadIndex}</h5>
                  </div>
                  <div>
                    <span className="text-gray-500">Desenho</span>
                    <h5 className="font-bold">{product.pattern}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Nenhum produto encontrado</p>
        )}
      </div>
    </div>
  );
}
