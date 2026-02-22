import { ProjectConfig } from "../types/index.js";

type PresetConfig = Omit<ProjectConfig, "name">;

const presets: Record<string, PresetConfig> = {
  api: {
    database: true,
    auth: true,
    validation: true,
    rateLimiting: true,
    errorHandling: true,
    docker: true,
    gitInit: true,
    license: "MIT",
  },
  minimal: {
    database: false,
    auth: false,
    validation: false,
    rateLimiting: false,
    errorHandling: true,
    docker: false,
    gitInit: true,
    license: "MIT",
  },
  "no-auth": {
    database: true,
    auth: false,
    validation: true,
    rateLimiting: true,
    errorHandling: true,
    docker: true,
    gitInit: true,
    license: "MIT",
  },
};

export const PRESET_NAMES = Object.keys(presets);

export function getPreset(name: string): PresetConfig | undefined {
  return presets[name];
}
