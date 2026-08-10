import { Session } from "@/types";
import { AuthService } from "./auth.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export class SecurityService {
  static async changePassword(data: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }): Promise<{ success: boolean; message: string }> {
    const token = AuthService.getToken();
    if (!token) throw new Error("Unauthenticated.");

    const response = await fetch(`${API_URL}/security/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.errors) {
        const errorMessages = Object.values(result.errors).flat().join(" ");
        throw new Error(errorMessages || result.message || "Validation failed.");
      }
      throw new Error(result.message || "Failed to update password.");
    }

    return {
      success: result.success,
      message: result.message || "Password updated successfully.",
    };
  }

  static async getSessions(): Promise<Session[]> {
    const token = AuthService.getToken();
    if (!token) return [];

    try {
      const response = await fetch(`${API_URL}/security/sessions`, {
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
      if (data.success && Array.isArray(data.sessions)) {
        return data.sessions;
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      return [];
    }
  }

  static async revokeSession(id: number): Promise<boolean> {
    const token = AuthService.getToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/security/sessions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return response.ok && data.success;
    } catch (error) {
      console.error(`Failed to revoke session ${id}:`, error);
      return false;
    }
  }

  static async revokeOtherSessions(): Promise<boolean> {
    const token = AuthService.getToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/security/sessions/others`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return response.ok && data.success;
    } catch (error) {
      console.error("Failed to revoke other sessions:", error);
      return false;
    }
  }
}
