export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  kycStatus: string;
  kycLevel: string;
  tier: string;
  avatarUrl: string;
}

export interface Account {
  id: string;
  user_id: number;
  name: string;
  account_number: string;
  account_type: string;
  balance: number;
  currency: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Card {
  id: string;
  name: string;
  type: string;
  status: string;
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
  spendingLimit: number;
  spent: number;
  cardColor: string;
}

export interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type?: "income" | "expense";
  icon: string;
  color: string;
  status: string;
  account: string;
}

export interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string;
  icon: string;
  color: string;
  user_id?: number;
  read_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Transfer {
  id: string;
  recipientName: string;
  amount: number;
  sourceAccount: string;
  date: string;
  note?: string;
}

export interface Vault {
  name: string;
  current: number;
  target: number;
  apy: string;
  icon: string;
  color: string;
}

export interface BillingInvoice {
  date: string;
  amount: number;
  plan: string;
}

export interface Session {
  id: number;
  name: string;
  created_at: string;
  last_used_at: string | null;
  is_current: boolean;
}

export interface SystemStatus {
  name: string;
  status: string;
  color: string;
}

export interface CategoryBudget {
  name: string;
  spent: number;
  budget: number;
  color: string;
}

export interface QuickContact {
  name: string;
  img: string;
}

export interface Beneficiary {
  id: number;
  user_id: number;
  name: string;
  email?: string;
  account_identifier: string;
  created_at?: string;
  updated_at?: string;
}
