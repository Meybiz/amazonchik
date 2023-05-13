
import { useMutation } from '@tanstack/react-query';
import { CardItems, ShipAddress } from '../types/CardType';
import apiClient from './../apiClient';
import { Order } from '../types/order';

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