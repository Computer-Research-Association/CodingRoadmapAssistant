const promptLanguage = {
  en,
  ko,
  jp,
  es,
  cn,
};
export interface SettingState {
  promptLanguage: string;
  apiKey: string;
  gptModel: string;

  setLanguage: (language: string) => void;
  setApiKey: (apiKey: string) => void;
  setGptModel: (model: string) => void;
  resetSettings: () => void;
  initializeSettings: (language: string, apiKey: string, gptModel: string) => void;
}
