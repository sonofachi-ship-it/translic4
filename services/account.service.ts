import { Account, Transaction, Vault } from "@/types";
import { AuthService } from "./auth.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export class AccountService {
  static async getAccounts(): Promise<Account[]> {
    const token = AuthService.getToken();
    if (!token) return [];

    try {
      const response = await fetch(`${API_URL}/accounts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.accounts)) {
        return data.accounts.map((acc: any) => ({
          ...acc,
          id: String(acc.id),
          balance: parseFloat(acc.balance),
        }));
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
      return [];
    }
  }

  static async getTransactions(): Promise<Transaction[]> {
    return [];
  }

  static async getVaults(): Promise<Vault[]> {
    return [];
  }
}
