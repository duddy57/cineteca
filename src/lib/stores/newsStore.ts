import type { News } from "$lib/utils/interfaces";
import { writable } from "svelte/store";

export const newsStore = writable<{ news: News[] }>({
  news: []
})