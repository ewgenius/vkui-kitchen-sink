import { Scheme } from '@vkontakte/vkui';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface KitchenSinkContextInterface {
  scheme: Scheme;
  setScheme: Dispatch<SetStateAction<Scheme>>;
}

export const KitchenSinkContext = createContext<KitchenSinkContextInterface>({
  scheme: Scheme.BRIGHT_LIGHT,
  setScheme: null,
});
