import { create } from "zustand";
import { SettingState } from "../types/settingStoreTypes";

const useSettingStore = create<SettingState>((set) => ({
  language: "English",
  apiKey: "",
  gptModel: "gpt-4o-mini",

  setLanguage: (newLanguage) =>
    set(() => {
      return {
        language: newLanguage,
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
        language: "English",
        apiKey: "",
        gptModel: "gpt-4o-mini",
      };
    }),
  initializeSettings: (language, apiKey, gptModel) =>
    set(() => {
      return {
        language: language,
        apiKey: apiKey,
        gptModel: gptModel,
      };
    }),
}));

export default useSettingStore;
