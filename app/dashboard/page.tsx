import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // If no user or auth error, redirect to sign-in
    if (authError || !user) {
      return redirect("/sign-in");
    }

    // Pass user data to client component
    return <DashboardClient user={user} />;
  } catch (error) {
    // If there's a Supabase connection error, show a demo version
    console.warn("Supabase connection error, showing demo dashboard:", error);
    return <DashboardClient user={null} isDemo={true} />;
  }
}
