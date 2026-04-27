import "server-only"

import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const COOKIE_NAME = "fmart_admin_session"
const SESSION_VALUE = "admin"

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "fmart-local-session-secret"
}

export function getAdminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD
  if (process.env.NODE_ENV !== "production") return "fmart-admin"
  return null
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex")
}

function createSessionValue() {
  return `${SESSION_VALUE}.${sign(SESSION_VALUE)}`
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const raw = cookieStore.get(COOKIE_NAME)?.value
  if (!raw) return false

  const [value, signature] = raw.split(".")
  if (value !== SESSION_VALUE || !signature) return false

  const expected = sign(value)
  const left = Buffer.from(signature)
  const right = Buffer.from(expected)

  return left.length === right.length && timingSafeEqual(left, right)
}

export async function createAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, createSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
