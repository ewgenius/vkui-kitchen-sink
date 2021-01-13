import { VKBridge } from '@vkontakte/vk-bridge';
import { canUseDOM } from '@vkontakte/vkjs/lib/dom';

const isDev =
  process.env.NODE_ENV === 'development' ||
  !canUseDOM ||
  window.location.pathname.endsWith('/app-preview');

const bridge: VKBridge = require('@vkontakte/vk-bridge').default;

export const setStorageValue = (key: string, value: string) => {
  return isDev
    ? new Promise<{ result: true }>((resolve) => {
        localStorage.setItem(key, value);
        resolve({ result: true });
      })
    : bridge.send('VKWebAppStorageSet', {
        key,
        value,
      });
};

export const getStorageValue = (key: string) => {
  return isDev
    ? new Promise<string>((resolve) => {
        resolve(localStorage.getItem(key));
      })
    : bridge.send('VKWebAppStorageGet', { keys: [key] }).then(({ keys }) => {
        return keys && keys[0] && keys[0].value;
      });
};

export default bridge;
