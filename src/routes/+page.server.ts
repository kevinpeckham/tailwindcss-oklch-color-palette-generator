// types
import type { PageServerLoad } from "./$types";

// content
import { default as content } from "$data/content.json";

// load
export const load: PageServerLoad = async function ({ locals }) {

  return content;
};