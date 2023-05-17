
import { useMutation } from '@tanstack/react-query';
import { CardItems, ShipAddress } from '../types/CardType';
import apiClient from './../apiClient';
import { Order } from '../types/order';
import { useQuery } from '@tanstack/react-query';


export const useGetOrderDetQuery = (id: string) => 
useQuery({
    queryKey: ['orders', id],
    queryFn: async () => (await apiClient.get<Order>(`api/orders/${id}`)).data
})
export const useCreateOrderMutate = () => useMutation({
    mutationFn: async (order: {
        orderItems: CardItems[]
        shipAddress: ShipAddress
        payMethod: string
        itemsPrice: number
        shipPrice: number
        taxPrice: number
        totalPrice: number
    }) => 
    (
        await apiClient.post<{message: string; order: Order}>(
            'api/orders', order
        )
    ).data,
})

export const useGetHistory = () =>
useQuery({
    queryKey: ['order-story'],
    queryFn: async () => (await apiClient.get<Order[]>(`/api/orders/history`)).data
})