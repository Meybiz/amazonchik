import {makeAutoObservable} from "mobx"
import { CardItems } from "../types/CardType"
<<<<<<< HEAD:src/mobx-store/card-store.tsx
import { Product } from './../../../back-end/src/model/prodModel';

export class CardStore {

    searchCards: CardItems[] = []
    filteredCards: Product[] = []
=======

class CardStore {

    searchCards: CardItems[] = []
>>>>>>> 09553905dbf76c56aac6924253135ecde3c8111a:front-end/src/mobx-store/card-store.tsx
    constructor() {
        makeAutoObservable(this)
    }

    setSearchCards = (searchCards: CardItems[]) => {
        this.searchCards = searchCards
    }
<<<<<<< HEAD:src/mobx-store/card-store.tsx

    setFilteredCards = (filteredCards: Product[]) => {
        this.filteredCards = filteredCards
    }
}
=======
}

export default CardStore
>>>>>>> 09553905dbf76c56aac6924253135ecde3c8111a:front-end/src/mobx-store/card-store.tsx
