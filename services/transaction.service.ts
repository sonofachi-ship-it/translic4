import { Transaction } from "@/types";
import { AuthService } from "./auth.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export class TransactionService {
  static async getTransactions(): Promise<Transaction[]> {
    const token = AuthService.getToken();
    if (!token) return [];

    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return [];
      const data = await response.json();
      if (data.success && Array.isArray(data.transactions)) {
        return data.transactions;
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      return [];
    }
  }
}
