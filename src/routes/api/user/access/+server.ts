import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
  const hasAceess = {hasAccess: false};
  return new Response(String(JSON.stringify(hasAceess)));
}