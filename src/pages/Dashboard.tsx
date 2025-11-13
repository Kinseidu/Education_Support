import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Eye, EyeOff, Plus, QrCode as QrCodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavBar from "@/components/ui/nav-bar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { mockUser, mockTransactions, Transaction } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  const getTransactionIcon = (transaction: Transaction) => {
    return transaction.type === "sent" ? (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
        <ArrowUpRight className="h-6 w-6 text-accent" />
      </div>
    ) : (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
        <ArrowDownLeft className="h-6 w-6 text-success" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary px-6 pt-12 pb-32 text-white">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm opacity-90">Welcome back</p>
              <h1 className="text-2xl font-bold">{mockUser.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-white [&_button]:text-white [&_button:hover]:bg-white/20">
                <ThemeToggle />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => navigate("/profile")}
              >
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                  {mockUser.name.charAt(0)}
                </div>
              </Button>
            </div>
          </div>

          {/* Balance Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm opacity-90">Total Balance</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-4xl font-bold mb-6">
              {showBalance ? formatAmount(mockUser.balance) : "••••••"}
            </p>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-white text-primary hover:bg-white/90 font-semibold"
                onClick={() => navigate("/scan")}
              >
                <QrCodeIcon className="mr-2 h-5 w-5" />
                Scan QR
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => navigate("/scan?mode=show")}
              >
                <Plus className="mr-2 h-5 w-5" />
                My QR
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="max-w-lg mx-auto px-6 -mt-20">
        <Card className="shadow-strong">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {mockTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-4">
                  {getTransactionIcon(transaction)}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">
                      {transaction.type === "sent"
                        ? transaction.recipient
                        : transaction.sender}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.description || formatDate(transaction.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        transaction.type === "sent" ? "text-accent" : "text-success"
                      }`}
                    >
                      {transaction.type === "sent" ? "-" : "+"}
                      {formatAmount(transaction.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={() => navigate("/history")}
            >
              View All Transactions
            </Button>
          </div>
        </Card>
      </div>

      <NavBar />
    </div>
  );
};

export default Dashboard;
