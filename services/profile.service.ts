import { User } from "@/types";
import { AuthService } from "./auth.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

const mapProfileToUser = (profileData: any): User => {
  return {
    id: String(profileData.user_id),
    firstName: profileData.first_name || "",
    lastName: profileData.last_name || "",
    email: profileData.user?.email || "",
    phone: profileData.phone || "",
    address: profileData.address || "",
    kycStatus: profileData.kyc_status || "PENDING",
    kycLevel: profileData.kyc_level || "Level 1",
    tier: profileData.tier || "STANDARD",
    avatarUrl: profileData.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  };
};

export class ProfileService {
  static async getProfile(): Promise<User | null> {
    const token = AuthService.getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      if (data.success && data.profile) {
        return mapProfileToUser(data.profile);
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      return null;
    }
  }

  static async updateProfile(data: {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    email: string;
  }): Promise<User | null> {
    const token = AuthService.getToken();
    if (!token) return null;

    const response = await fetch(`${API_URL}/profile`, {
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
      // If validation errors are present, throw an error with the detailed message
      if (result.errors) {
        const errorMessages = Object.values(result.errors).flat().join(" ");
        throw new Error(errorMessages || result.message || "Validation failed.");
      }
      throw new Error(result.message || "Failed to update profile.");
    }

    if (result.success && result.profile) {
      return mapProfileToUser(result.profile);
    }
    return null;
  }
}
