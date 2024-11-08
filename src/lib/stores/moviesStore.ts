import type { Movie } from "$lib/utils/interfaces"
import { writable } from "svelte/store"



export const moviesStore = writable<{ movies: Movie[] }>({
  movies: [],
})