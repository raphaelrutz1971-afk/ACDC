import { cacheLife } from "next/cache";

/** Year for the copyright line; cached and refreshed daily so it rolls over on its own. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
