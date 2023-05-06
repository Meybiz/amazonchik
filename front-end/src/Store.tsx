import React from 'react';
import { CardItems, Cart } from './types/CardType';

type AppState = {
    mode: string
    cart: Cart

}

const initialState: AppState = {
    mode: localStorage.getItem('mode') ? localStorage.getItem('mode')! : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    cart: {
            cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : [],
        shipAddress: localStorage.getItem('shipAddress') ? JSON.parse(localStorage.getItem('shipAddress')!) : [],
        payMethod: localStorage.getItem('payMethod') ? localStorage.getItem('payMethod')! : 'PayPal',
        itemPrice: 0,
        shipPrice: 0,
        taxprice: 0,
        totalPrice: 0
    }
}

type Action = | {
    type: 'SWITCH_MODE'
} | {
    type: 'ADD_TO_CART',
    payload: CardItems
} |
{
    type: 'REMOVE_FROM_CART',
    payload: CardItems
}

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SWITCH_MODE':
            return {
                ...state,
                mode: state.mode === 'dark' ? 'light' : 'dark',
            }
            case 'ADD_TO_CART':
                const newItem = action.payload
                const existItem = state.cart.cartItems.find((item: CardItems) => item._id === newItem._id)
                const cardItems = existItem ? state.cart.cartItems.map((item: CardItems) => item._id === newItem._id ? newItem : item) : [...state.cart.cartItems, newItem]
        localStorage.setItem('cartItems', JSON.stringify(cardItems))
        return {...state, cart: {...state.cart, cartItems: cardItems}}
        case 'REMOVE_FROM_CART':
            {
                const cartItems = state.cart.cartItems.filter((item: CardItems) => item._id !== action.payload._id)
                localStorage.setItem('cartItems', JSON.stringify(cartItems))
                return {...state, cart: {...state.cart, cartItems}}
            }
                default:
            return state
    }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
    state: initialState,
    dispatch: defaultDispatch,
})

function StoreProv (props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
        reducer,
        initialState
    )
    return <Store.Provider value={{state, dispatch}} {...props} />
}

export {StoreProv, Store}