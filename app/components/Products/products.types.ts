import { ProductsModel } from "./products.model";

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

type ProductsViewProps = ReturnType<typeof ProductsModel>;

export type { Product, ProductsViewProps };
