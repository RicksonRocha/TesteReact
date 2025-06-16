"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { ProductsViewProps } from "./products.types";

export const ProductsView = (props: ProductsViewProps) => {
  const { methods, onSubmit, isLoading, filteredProducts, handleSearch } =
    props;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  return (
    <div className="w-full flex justify-center flex-col h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 mx-auto mb-6"
      >
        <div className="border-gray-500 w-1/2 mx-auto mb-4">
          <label
            htmlFor="search"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Pesquisa
          </label>
          <div className="mt-2 grid grid-cols-1 relative">
            <input
              id="search"
              type="search"
              placeholder="Pesquisar produtos"
              className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-10 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
              {...register("search")}
              onChange={handleSearch}
            />
            {errors.search && (
              <p className="mt-1 text-sm text-red-600">
                {errors.search.message}
              </p>
            )}
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
            />
          </div>
        </div>
      </form>

      <div className="mb-4 border-b border-1"></div>

      <div className="flex flex-col gap-6" data-testid="products">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 border rounded-md p-4 animate-pulse"
            >
              <div className="w-[120px] h-[120px] bg-gray-200 rounded-md" />
              <div className="flex-1 space-y-3">
                <div className="w-3/4 h-4 bg-gray-200 rounded" />
                <div className="w-1/2 h-4 bg-gray-200 rounded" />
                <div className="w-full h-4 bg-gray-200 rounded" />
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-md rounded-md p-4 flex"
                  data-testid="product"
                >
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-40 h-auto object-contain mr-4"
                    />
                    <h3 className="font-bold text-md text-center">
                      {product.model}
                    </h3>
                  </div>
                  <div className="w-1 bg-black mx-4" />
                  <div className="flex flex-col justify-between">
                    <h2 className="font-bold text-lg mb-2">{product.name}</h2>

                    <div className="grid grid-cols-3 gap-x-6 text-sm text-black mb-2">
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
                    </div>

                    <div className="grid grid-cols-3 gap-x-6 text-sm text-black mb-2">
                      <div>
                        <span className="text-gray-500">
                          Índice de velocidade
                        </span>
                        <h5 className="font-bold">{product.speedRating}</h5>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          Capacidade de Carga
                        </span>
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
              <p className="text-center text-gray-600 col-span-full">
                Nenhum produto encontrado.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
