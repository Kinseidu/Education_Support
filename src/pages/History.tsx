import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/ui/nav-bar";
import { mockTransactions, Transaction } from "@/lib/mockData";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "sent" | "received">("all");

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesSearch =
      (txn.recipient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.sender?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.description?.toLowerCase().includes(searchQuery.toLowerCase())) ??
      true;

    const matchesFilter = filterType === "all" || txn.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  const getTotalByType = (type: "sent" | "received") => {
    return mockTransactions
      .filter((txn) => txn.type === type)
      .reduce((sum, txn) => sum + txn.amount, 0);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-6 pt-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
          <p className="text-muted-foreground">All your payment activity</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-gradient-success">
            <p className="text-sm text-success-foreground/80 mb-1">Total Received</p>
            <p className="text-2xl font-bold text-success-foreground">
              {formatAmount(getTotalByType("received"))}
            </p>
          </Card>
          <Card className="p-4 bg-accent/10">
            <p className="text-sm text-accent mb-1">Total Sent</p>
            <p className="text-2xl font-bold text-accent">
              {formatAmount(getTotalByType("sent"))}
            </p>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            All
          </Button>
          <Button
            variant={filterType === "received" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("received")}
          >
            Received
          </Button>
          <Button
            variant={filterType === "sent" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("sent")}
          >
            Sent
          </Button>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-4 hover:shadow-soft transition-all">
              <div className="flex items-center gap-4">
                {getTransactionIcon(transaction)}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {transaction.type === "sent" ? transaction.recipient : transaction.sender}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(transaction.date)}
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
                  <p className="text-xs text-muted-foreground mt-1 capitalize">
                    {transaction.status}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          {filteredTransactions.length === 0 && (
            <Card className="p-12 text-center">
              <Filter className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="font-semibold mb-1">No transactions found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </Card>
          )}
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default History;
