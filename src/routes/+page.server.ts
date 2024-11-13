import * as auth from '$lib/server/auth';
import { userStore } from '$lib/stores/userStore';
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  return {
    user: event.locals.user || null,
  };

}

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await auth.invalidateSession(event.locals.session.id);
    auth.deleteSessionTokenCookie(event);

    return redirect(302, '/auth');
  }
};
