export interface Product {
    id: string;
    title: string;
    price: number;
    permalink: string;
    thumbnail: string;
  }
  
  export interface MercadoLibreResponse {
    results: Product[];
    paging: {
      total: number;
      offset: number;
      limit: number;
      primary_results: number;
    };
  }
  