import { Beneficiary, Transfer } from "@/types";
import { AuthService } from "./auth.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export class TransferService {
  static async getBeneficiaries(): Promise<Beneficiary[]> {
    const token = AuthService.getToken();
    if (!token) return [];

    try {
      const response = await fetch(`${API_URL}/beneficiaries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return [];
      const data = await response.json();
      if (data.success && Array.isArray(data.beneficiaries)) {
        return data.beneficiaries;
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch beneficiaries:", error);
      return [];
    }
  }

  static async createBeneficiary(beneficiaryData: {
    name: string;
    email?: string;
    account_identifier: string;
  }): Promise<Beneficiary | null> {
    const token = AuthService.getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/beneficiaries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(beneficiaryData),
      });

      if (!response.ok) return null;
      const data = await response.json();
      if (data.success && data.beneficiary) {
        return data.beneficiary;
      }
      return null;
    } catch (error) {
      console.error("Failed to create beneficiary:", error);
      return null;
    }
  }

  static async createTransfer(transferData: {
    account_id: number;
    beneficiary_id: number;
    amount: number;
    note?: string;
  }): Promise<{ success: boolean; message: string; reference?: string }> {
    const token = AuthService.getToken();
    if (!token) {
      return { success: false, message: "Authentication token missing." };
    }

    try {
      const response = await fetch(`${API_URL}/transfers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transferData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        return {
          success: true,
          message: data.message,
          reference: data.transfer?.reference,
        };
      }
      return {
        success: false,
        message: data.message || "Failed to complete transfer.",
      };
    } catch (error) {
      console.error("Failed to execute transfer:", error);
      return {
        success: false,
        message: "Network or server connection error.",
      };
    }
  }

  // Backwards compatibility stub for other imports if any (though types will compile)
  static async sendTransfer(transfer: Omit<Transfer, "id" | "date">): Promise<boolean> {
    return true;
  }
}
