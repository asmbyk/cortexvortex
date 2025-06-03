import { redirect } from "next/navigation"

export default function MiniAppPage() {
  // Redirect to main page with Mini App flag
  redirect("/?miniApp=true")
}
