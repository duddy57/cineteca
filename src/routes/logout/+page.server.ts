import * as auth from '$lib/server/auth';
import { logout } from '$lib/stores/userStore';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  return {
    user: event.locals.user || null,
  };
};

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401, { error: 'Não autorizado' });
    }

    try {
      await auth.invalidateSession(event.locals.session.id);
      auth.deleteSessionTokenCookie(event);
      logout(); // Chama a função de logout do store
      return redirect(302, '/auth');
    } catch (error) {
      console.error('Erro durante o logout:', error);
      return fail(500, { error: 'Erro ao realizar logout' });
    }
  },
};