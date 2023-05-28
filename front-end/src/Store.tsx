import React from 'react';
import { CardItems, Cart, ShipAddress } from './types/CardType';
import { UserInfo } from './types/UserInfo';

type AppState = {
    mode: string
    cart: Cart,
    userInfo?: UserInfo,
}

const initialState: AppState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
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
} |
{
    type: 'LOGIN',
    payload: UserInfo
} |
{
    type: 'SIGNOUT'
} | {
    type: 'SAVE_SHIP_ADDRESS',
    payload: ShipAddress
} |
{
    type: 'SAVE_PAY_METHOD',
    payload: string
} | {
    type: 'CLEAR_CART', 
} | {
    type: 'CHANGE_NAME',
    payload: string
} | {
    type: 'CHANGE_EMAIL',
    payload: string
}


function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SWITCH_MODE':
            localStorage.setItem('mode', state.mode === 'dark' ? 'light' : 'dark')
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
        case 'LOGIN':
            return {...state, userInfo: action.payload}
            case 'SIGNOUT':
                return { 
                    mode: 
                        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
                    cart: {
                        cartItems: [],
                        payMethod: 'PayPal',
                        shipAddress: {
                            fullName: '',
                            address: '',
                            postalCode: '',
                            city: '',
                            country: '',
                        },
                        itemPrice: 0,
                        shipPrice: 0,
                        taxprice: 0,
                        totalPrice: 0
                    },
                }
                case 'SAVE_SHIP_ADDRESS':
                    return {
                        ...state,
                        cart: {
                            ...state.cart,
                            shipAddress: action.payload
                        }
                    }
                    case 'SAVE_PAY_METHOD':
                        return {
                            ...state,
                            cart: {
                                ...state.cart, payMethod: action.payload
                            }
                        }
                        case 'CLEAR_CART':
                            return {
                                ...state, cart: {...state.cart, cartItems: []}
                            }
                        case 'CHANGE_NAME':
                            const labelName = action.payload
                            const update = {...state.userInfo, balance: state.userInfo!.balance, _id: state.userInfo!._id, name: labelName, email: state.userInfo!.email, token: state.userInfo!.token, isAdmin: state.userInfo!.isAdmin}
                            localStorage.setItem('userInfo', JSON.stringify(update))
                            return {...state, userInfo: update}
                        case 'CHANGE_EMAIL':
                            const labelEmail = action.payload
                            const updates = {...state.userInfo, balance: state.userInfo!.balance, _id: state.userInfo!._id, name: state.userInfo!.name, email: labelEmail, token: state.userInfo!.token, isAdmin: state.userInfo!.isAdmin}
                            localStorage.setItem('userInfo', JSON.stringify(updates))
                            return {...state, userInfo: updates}
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