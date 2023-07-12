import {makeAutoObservable} from "mobx"
import { CardItems } from "../types/CardType"

class CardStore {

    searchCards: CardItems[] = []
    constructor() {
        makeAutoObservable(this)
    }

    setSearchCards = (searchCards: CardItems[]) => {
        this.searchCards = searchCards
    }
}

export default CardStore