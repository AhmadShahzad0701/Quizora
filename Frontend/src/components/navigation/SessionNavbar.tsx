import { Bell, ChevronDown, Settings } from "lucide-react";
import Link from "next/link"; // Import Link from next/link
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation

interface NavbarProps {
  variant?: "session"; // Set default to session variant
}

const Navbar = ({}: NavbarProps) => {
  const pathname = usePathname(); // Get the current pathname

  // Define the session links only
  const sessionLinks = [
    { label: "Leaderboard", href: "/session/leaderboard" },
    { label: "Students", href: "/session/students" },
    { label: "Pending", href: "/session/pending" },
    { label: "Manage", href: "/session/manage" },
  ];

  // Always use sessionLinks, no need for a condition based on variant
  const links = sessionLinks;

  // Check if the current path is active for session routes
  const isActiveLink = (href: string) => {
    if (href === "/session/pending") {
      // Match /session/pending or /session/pending/:id
      return pathname.startsWith("/session/pending");
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#DDDDDD] bg-[#FFFFFF]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFFFFF]/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#1976D2]">Quizora</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-[#D1E2F8]/50 rounded-full p-1">
          {links.map((link) => {
            const isActive = isActiveLink(link.href);
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? "ghost" : "outline"} // Use "ghost" for active and "outline" for inactive
                  size="sm"
                >
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#F44336] text-[10px] font-medium text-[#FFFFFF] flex items-center justify-center">
              2
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 pl-2 pr-3">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-[#1976D2] text-[#FFFFFF] text-xs">
                    AS
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-[#222222]">Asad</span>
                <ChevronDown className="h-4 w-4 text-[#999999]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#F44336]">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
