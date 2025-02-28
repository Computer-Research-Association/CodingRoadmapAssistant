import { create } from "zustand";
import { SettingState } from "../types/settingStoreTypes";

const useSettingStore = create<SettingState>((set) => ({
  promptLanguage: "en",
  apiKey: "",
  gptModel: "gpt-4o-mini",

  setLanguage: (newLanguage) =>
    set(() => {
      return {
        promptLanguage: newLanguage,
      };
    }),
  setGptModel: (newModel) =>
    set(() => {
      return {
        gptModel: newModel,
      };
    }),
  setApiKey: (newApiKey) =>
    set(() => {
      return {
        apiKey: newApiKey,
      };
    }),
  resetSettings: () =>
    set(() => {
      return {
        promptLanguage: "en",
        apiKey: "",
        gptModel: "gpt-4o-mini",
      };
    }),
  initializeSettings: (language, apiKey, gptModel) =>
    set(() => {
      return {
        promptLanguage: language,
        apiKey: apiKey,
        gptModel: gptModel,
      };
    }),
}));

export default useSettingStore;
