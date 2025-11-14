import { Home, QrCode, User, History } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const NavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          <NavLink
            to="/"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all"
            activeClassName="text-primary"
          >
            {({ isActive }) => (
              <>
                <Home className={cn("h-6 w-6", isActive && "fill-primary")} />
                <span className="text-xs font-medium">Home</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/scan"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all"
            activeClassName="text-primary"
          >
            {({ isActive }) => (
              <>
                <QrCode className={cn("h-6 w-6", isActive && "fill-primary")} />
                <span className="text-xs font-medium">Scan</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/history"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all"
            activeClassName="text-primary"
          >
            {({ isActive }) => (
              <>
                <History className={cn("h-6 w-6", isActive && "fill-primary")} />
                <span className="text-xs font-medium">History</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/profile"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all"
            activeClassName="text-primary"
          >
            {({ isActive }) => (
              <>
                <User className={cn("h-6 w-6", isActive && "fill-primary")} />
                <span className="text-xs font-medium">Profile</span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
