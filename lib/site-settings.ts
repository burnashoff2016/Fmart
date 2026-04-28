import "server-only"

import { promises as fs } from "node:fs"
import path from "node:path"

const DATA_DIR = path.join(process.cwd(), "data")
const SETTINGS_FILE = path.join(DATA_DIR, "site-settings.json")

export const SITE_BACKGROUND_MODES = ["auto", "soft-gray", "clean", "contrast"] as const

export type SiteBackgroundMode = (typeof SITE_BACKGROUND_MODES)[number]

export type SiteSettings = {
  backgroundMode: SiteBackgroundMode
}

const DEFAULT_SETTINGS: SiteSettings = {
  backgroundMode: "auto",
}

function normalizeSettings(value: Partial<SiteSettings> | null | undefined): SiteSettings {
  const backgroundMode = SITE_BACKGROUND_MODES.includes(value?.backgroundMode as SiteBackgroundMode)
    ? (value?.backgroundMode as SiteBackgroundMode)
    : DEFAULT_SETTINGS.backgroundMode

  return { backgroundMode }
}

async function ensureSettingsFile() {
  await fs.mkdir(DATA_DIR, { recursive: true })

  try {
    await fs.access(SETTINGS_FILE)
  } catch {
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf8")
  }
}

export async function getSiteSettings() {
  await ensureSettingsFile()

  try {
    const raw = await fs.readFile(SETTINGS_FILE, "utf8")
    return normalizeSettings(JSON.parse(raw) as Partial<SiteSettings>)
  } catch {
    return DEFAULT_SETTINGS
  }
}

export async function updateSiteSettings(settings: Partial<SiteSettings>) {
  const current = await getSiteSettings()
  const next = normalizeSettings({ ...current, ...settings })
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(next, null, 2), "utf8")
  return next
}
