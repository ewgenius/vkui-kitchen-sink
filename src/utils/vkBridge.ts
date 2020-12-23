import { VKBridge } from "@vkontakte/vk-bridge";

const isDev =
  process.env.NODE_ENV === "development" ||
  window.location.pathname.endsWith("/app-preview");

const bridge: VKBridge = isDev
  ? require("@vkontakte/vk-bridge-mock").default
  : require("@vkontakte/vk-bridge").default;

window["bridge"] = bridge;

export const setStorageValue = (key: string, value: string) => {
  return isDev
    ? new Promise<{ result: true }>((resolve) => {
        localStorage.setItem(key, value);
        resolve({ result: true });
      })
    : bridge.send("VKWebAppStorageSet", {
        key,
        value,
      });
};

export const getStorageValue = (key: string) => {
  return isDev
    ? new Promise<string>((resolve) => {
        resolve(localStorage.getItem(key));
      })
    : bridge.send("VKWebAppStorageGet", { keys: [key] }).then(({ keys }) => {
        return keys && keys[0] && keys[0].value;
      });
};

export default bridge;
