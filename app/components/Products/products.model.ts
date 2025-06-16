"use client";

import React, { useEffect, useState } from "react";
import { FormData, Product } from "./products.types";
import { schema } from "./products.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";

export const ProductsModel = () => {
  const [localSearch, setLocalSearch] = useState("");
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { search: "" },
  });

  const { watch, setValue } = methods;

  const search = watch("search");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then((res) => res.json()),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("search", e.target.value);
    if (e.target.value === "") {
      setLocalSearch("");
    }
  };

  const onSubmit = (data: FormData) => {
    setLocalSearch(data.search ?? "");
  };

  const filteredProducts = products?.filter((product) => {
    const term = localSearch.toLowerCase();
    return (
      !term ||
      product.name.toLowerCase().includes(term) ||
      product.model.toLowerCase().includes(term) ||
      product.cars.some((car) => car.toLowerCase().includes(term))
    );
  });

  useEffect(() => {
    setLocalSearch(search ?? "");
  }, [search]);

  return {
    search,
    onSubmit,
    isLoading,
    filteredProducts,
    methods,
    handleSearch,
  };
};
