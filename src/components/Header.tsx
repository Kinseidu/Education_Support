import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { NavLink } from "@/components/NavLink";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-xl font-bold">AE</span>
          </div>
          <span className="hidden font-bold sm:inline-block">
            Adomako EduSupport
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/programs">Programs</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button asChild className="hidden md:inline-flex">
            <Link to="/contact">Donate Now</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t bg-background p-4">
          <div className="flex flex-col space-y-3">
            <NavLink to="/" end onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</NavLink>
            <NavLink to="/programs" onClick={() => setMobileMenuOpen(false)}>Programs</NavLink>
            <NavLink to="/news" onClick={() => setMobileMenuOpen(false)}>News</NavLink>
            <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
            <Button asChild className="w-full">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Donate Now</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
