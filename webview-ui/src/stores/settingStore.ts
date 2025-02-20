import { create } from "zustand";
import { SettingState } from "../types/settingStoreTypes";

const useSettingStore = create<SettingState>((set) => ({
  language: "English",
  setLanguage: (newLanguage) =>
    set(() => {
      return {
        language: newLanguage,
      };
    }),
}));

export default useSettingStore;
