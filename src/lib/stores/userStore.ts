import { writable } from "svelte/store"

export const userStore = writable(null)

export function logout() {
  userStore.set(null);
}