export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  avatar?: string;
}

export interface Transaction {
  id: string;
  type: "sent" | "received";
  amount: number;
  recipient?: string;
  sender?: string;
  date: Date;
  status: "completed" | "pending" | "failed";
  description?: string;
}

export const mockUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex@payqr.com",
  balance: 2547.83,
};

export const mockTransactions: Transaction[] = [
  {
    id: "txn-1",
    type: "received",
    amount: 125.50,
    sender: "Sarah Williams",
    date: new Date(2025, 10, 8, 14, 30),
    status: "completed",
    description: "Coffee & lunch",
  },
  {
    id: "txn-2",
    type: "sent",
    amount: 50.00,
    recipient: "Michael Chen",
    date: new Date(2025, 10, 7, 10, 15),
    status: "completed",
    description: "Movie tickets",
  },
  {
    id: "txn-3",
    type: "received",
    amount: 300.00,
    sender: "Jennifer Taylor",
    date: new Date(2025, 10, 5, 16, 45),
    status: "completed",
    description: "Rent split",
  },
  {
    id: "txn-4",
    type: "sent",
    amount: 15.75,
    recipient: "David Park",
    date: new Date(2025, 10, 4, 12, 20),
    status: "completed",
    description: "Grocery share",
  },
  {
    id: "txn-5",
    type: "received",
    amount: 200.00,
    sender: "Emma Davis",
    date: new Date(2025, 10, 2, 9, 0),
    status: "completed",
    description: "Birthday gift",
  },
];

export const mockContacts = [
  { id: "c-1", name: "Sarah Williams", email: "sarah@example.com" },
  { id: "c-2", name: "Michael Chen", email: "michael@example.com" },
  { id: "c-3", name: "Jennifer Taylor", email: "jennifer@example.com" },
  { id: "c-4", name: "David Park", email: "david@example.com" },
  { id: "c-5", name: "Emma Davis", email: "emma@example.com" },
];
