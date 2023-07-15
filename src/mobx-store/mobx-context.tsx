import { createContext } from 'react';
import { CardStore } from './card-store';


export const MobXContext = createContext<CardStore>(new CardStore());