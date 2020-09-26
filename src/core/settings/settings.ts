import { ExecutionSpeed } from "../../JavascriptVM/vm";

interface SimulatorSettings {
  showController: boolean;
  simulatorSpeed: ExecutionSpeed;
}

const SETTINGS_KEY = "simulator_settings";

export const getDefaultSettings = (): SimulatorSettings => {
  return {
    showController: false,
    simulatorSpeed: ExecutionSpeed.SLOW,
  };
};

export const persistSettings = (settings: Partial<SimulatorSettings>) => {
  const currentSettings = getDefaultSettings();
  const newSettings = {
    ...currentSettings,
    ...settings,
  };
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
};

export const loadSettings = (): SimulatorSettings => {
  try {
    const settings =
      JSON.parse(window.localStorage.getItem(SETTINGS_KEY) ?? "") ?? {};

    return {
      ...getDefaultSettings(),
      ...settings,
    };
  } catch (err) {
    return getDefaultSettings();
  }
};
