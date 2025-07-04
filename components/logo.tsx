import Link from "next/link";
import { Rocket } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <Rocket className="w-6 h-6" />
      <span className="font-bold text-lg">LaunchForge</span>
    </Link>
  );
}
