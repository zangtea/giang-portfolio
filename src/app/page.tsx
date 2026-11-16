import { redirect } from "next/navigation";

// Root page redirects to the default locale.
// The proxy (middleware) handles locale detection for most routes,
// but this ensures direct visits to "/" work correctly too.
export default function RootPage() {
  redirect("/vi");
}
