import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Product";
export const useGetProdQuery = () => 
    useQuery({
        queryKey: ['products'],
        queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
    })

    export const useGetProdDetailSlugQuery = (slug: string) => 
        useQuery({
            queryKey: ['products', slug],
            queryFn: async () => 
                (await apiClient.get<Product>(`api/products/${slug}`)).data,
        })
    
