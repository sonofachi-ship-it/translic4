import {
  Transaction,
  QuickContact,
  Card,
  User,
  BillingInvoice,
  Session,
  SystemStatus,
  CategoryBudget,
  Vault,
  Notification
} from "@/types";

export const mockTransactions: Transaction[] = [
  {
    id: "tx-101",
    name: "Apple Store Fifth Ave",
    category: "Shopping",
    date: "Today, 2:45 PM",
    amount: -1299.0,
    icon: "laptop_mac",
    color: "bg-[#131b2e] text-white",
    status: "Completed",
    account: "Apex Visa Signature",
  },
  {
    id: "tx-102",
    name: "TechCorp Direct Deposit",
    category: "Income",
    date: "Today, 9:00 AM",
    amount: 8500.0,
    icon: "arrow_downward",
    color: "bg-[#10b981]/20 text-[#10b981]",
    status: "Completed",
    account: "Apex Checking",
  },
  {
    id: "tx-103",
    name: "Amazon Web Services",
    category: "Tech",
    date: "Yesterday, 11:15 AM",
    amount: -240.5,
    icon: "cloud",
    color: "bg-[#0052ff]/15 text-[#0052ff]",
    status: "Completed",
    account: "Apex Checking",
  },
  {
    id: "tx-104",
    name: "Whole Foods Market",
    category: "Groceries",
    date: "Aug 03, 2026",
    amount: -142.8,
    icon: "shopping_cart",
    color: "bg-[#f59e0b]/20 text-[#d97706]",
    status: "Completed",
    account: "Apex Digital Card",
  },
  {
    id: "tx-105",
    name: "Sarah Miller (P2P Transfer)",
    category: "Transfer",
    date: "Aug 02, 2026",
    amount: -500.0,
    icon: "send",
    color: "bg-[#3737c5]/15 text-[#3737c5]",
    status: "Completed",
    account: "Apex Checking",
  },
];

export const mockQuickContacts: QuickContact[] = [
  { name: "Sarah M.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
  { name: "David K.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
  { name: "Elena R.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" },
  { name: "Marcus B.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
];

export const mockCards: Card[] = [
  {
    id: "card1",
    name: "Apex Metal Signature",
    type: "Primary Debit • Physical",
    status: "ACTIVE",
    number: "4242 •••• •••• 4242",
    holder: "ALEX MORGAN",
    expiry: "08/29",
    cvv: "882",
    spendingLimit: 15000,
    spent: 1540,
    cardColor: "from-[#131b2e] via-[#283044] to-[#0052ff]"
  },
  {
    id: "card2",
    name: "Digital Online Shield",
    type: "Virtual • Online Subscriptions",
    status: "ACTIVE",
    number: "5591 •••• •••• 8819",
    holder: "ONLINE PURCHASES",
    expiry: "12/28",
    cvv: "301",
    spendingLimit: 5000,
    spent: 240,
    cardColor: "from-[#3737c5] via-[#5153de] to-[#00ccf9]"
  }
];

export const mockCurrentUser: User = {
  id: "user-1",
  firstName: "Eleanor",
  lastName: "Vance",
  email: "eleanor.vance@example.com",
  phone: "+1 (555) 019-2834",
  address: "1000 Fintech Way, Suite 400, San Francisco, CA 94105, USA",
  kycStatus: "VERIFIED",
  kycLevel: "Level 3: Full Access",
  tier: "PREMIUM TIER",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
};

export const mockBillingHistory: BillingInvoice[] = [
  { date: "Oct 12, 2023", amount: 19.99, plan: "Premium Plan" },
  { date: "Sep 12, 2023", amount: 19.99, plan: "Premium Plan" },
];

export const mockSessions: Session[] = [
  {
    id: 1,
    name: "auth_token",
    created_at: new Date().toISOString(),
    last_used_at: new Date().toISOString(),
    is_current: true,
  },
  {
    id: 2,
    name: "auth_token",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    last_used_at: new Date(Date.now() - 3600000).toISOString(),
    is_current: false,
  },
];

export const mockSystemStatus: SystemStatus[] = [
  { name: "Mobile App Core", status: "Operational", color: "bg-[#10b981] text-[#059669] bg-[#10b981]/15" },
  { name: "International Transfers", status: "Operational", color: "bg-[#10b981] text-[#059669] bg-[#10b981]/15" },
  { name: "Card Processing Rails", status: "Degraded", color: "bg-[#ba1a1a] text-[#93000a] bg-[#ffdad6]" },
];

export const mockCategoryBudgets: CategoryBudget[] = [
  { name: "Housing & Living", spent: 1850, budget: 2000, color: "bg-[#0052ff]" },
  { name: "Tech & Electronics", spent: 1299, budget: 1500, color: "bg-[#3737c5]" },
  { name: "Dining & Groceries", spent: 450, budget: 600, color: "bg-[#10b981]" },
  { name: "Travel & Rideshare", spent: 240, budget: 400, color: "bg-[#f59e0b]" },
];

export const mockVaults: Vault[] = [
  {
    name: "Emergency Wealth Vault",
    current: 42000,
    target: 50000,
    apy: "5.2% APY",
    icon: "shield_locked",
    color: "bg-[#0052ff]",
  },
  {
    name: "Electric Vehicle Fund",
    current: 28200,
    target: 40000,
    apy: "5.2% APY",
    icon: "directions_car",
    color: "bg-[#3737c5]",
  },
  {
    name: "Tokyo & Kyoto Travel Vault",
    current: 14000,
    target: 15000,
    apy: "5.2% APY",
    icon: "flight_takeoff",
    color: "bg-[#10b981]",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Salary Direct Deposit Received",
    desc: "+$8,500.00 from TechCorp Inc.",
    time: "10 mins ago",
    icon: "arrow_downward",
    color: "bg-[#10b981]/20 text-[#10b981]",
  },
  {
    id: 2,
    title: "Auto-Vault Savings Sweep",
    desc: "$340.00 moved to Emergency Vault",
    time: "2 hours ago",
    icon: "savings",
    color: "bg-[#0052ff]/20 text-[#0052ff]",
  },
  {
    id: 3,
    title: "Security Login Alert",
    desc: "New login from MacOS in New York, USA",
    time: "Yesterday",
    icon: "security",
    color: "bg-[#f59e0b]/20 text-[#d97706]",
  },
];

export const mockSourceAccounts = [
  "Apex Checking ($40,300.00)",
  "Apex High-Yield Vault ($84,200.00)"
];

export const mockQuickRecipients = [
  "Sarah Miller",
  "David Kim",
  "Elena Rostova",
  "Marcus Vance"
];
