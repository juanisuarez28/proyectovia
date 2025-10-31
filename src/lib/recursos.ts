
import data from './recursos-data.json';

export type Recurso = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  url: string;
};

export const RecursosData: Recurso[] = data.recursos;
