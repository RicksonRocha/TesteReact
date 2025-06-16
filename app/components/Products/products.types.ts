import { ProductsModel } from "./products.model";
import { schema } from "./products.schema";
import * as yup from "yup";

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

type FormData = yup.InferType<typeof schema>;

export type { Product, ProductsViewProps, FormData };
