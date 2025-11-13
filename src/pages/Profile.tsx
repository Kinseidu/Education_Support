import { Bell, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, QrCode, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/ui/nav-bar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { mockUser } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "next-themes";

const Profile = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // In real app, clear session/tokens here
  };

  const menuItems = [
    {
      icon: QrCode,
      label: "My QR Code",
      description: "Show your payment QR",
      action: () => navigate("/scan?mode=show"),
    },
    {
      icon: Palette,
      label: "Appearance",
      description: `Theme: ${theme === "dark" ? "Dark" : "Light"} mode`,
      component: <ThemeToggle />,
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage alerts and updates",
      action: () => toast.info("Notifications settings coming soon"),
    },
    {
      icon: Shield,
      label: "Security & Privacy",
      description: "PIN, biometrics, and data",
      action: () => toast.info("Security settings coming soon"),
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      description: "Manage cards and banks",
      action: () => toast.info("Payment methods coming soon"),
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "FAQs and contact us",
      action: () => toast.info("Support page coming soon"),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-6 pt-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        {/* Profile Card */}
        <Card className="p-6 mb-6 bg-gradient-card">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {mockUser.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{mockUser.name}</h2>
              <p className="text-muted-foreground">{mockUser.email}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Member Since</p>
              <p className="font-semibold">Jan 2024</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">User ID</p>
              <p className="font-semibold font-mono text-sm">{mockUser.id}</p>
            </div>
          </div>
        </Card>

        {/* Settings Menu */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="p-4 hover:shadow-soft transition-all cursor-pointer"
              onClick={item.action}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {item.component ? (
                  item.component
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <Card className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span className="font-semibold">Log Out</span>
          </Button>
        </Card>

        {/* Version Info */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          PayQR v1.0.0
        </p>
      </div>

      <NavBar />
    </div>
  );
};

export default Profile;
