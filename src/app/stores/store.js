import QuestionStore from './QuestionStore';
import { useContext, createContext } from 'react';

export const store = {
    questionStore: new QuestionStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}