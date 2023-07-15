import {makeAutoObservable} from "mobx"
import { CardItems } from "../types/CardType"
import { Product } from './../../../back-end/src/model/prodModel';

export class CardStore {

    searchCards: CardItems[] = []
    filteredCards: Product[] = []
    constructor() {
        makeAutoObservable(this)
    }

    setSearchCards = (searchCards: CardItems[]) => {
        this.searchCards = searchCards
    }

    setFilteredCards = (filteredCards: Product[]) => {
        this.filteredCards = filteredCards
    }
}