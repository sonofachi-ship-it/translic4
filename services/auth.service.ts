import { User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

const mapLaravelUserToAppUser = (laravelUser: any): User => {
  const nameParts = laravelUser.name ? laravelUser.name.split(" ") : ["User"];
  const firstName = nameParts[0] || "User";
  const lastName = nameParts.slice(1).join(" ") || "";
  
  return {
    id: String(laravelUser.id),
    firstName: firstName,
    lastName: lastName,
    email: laravelUser.email,
    phone: laravelUser.phone || "+1 (555) 019-2834",
    address: laravelUser.address || "1000 Fintech Way, Suite 400, San Francisco, CA 94105, USA",
    kycStatus: laravelUser.kycStatus || "VERIFIED",
    kycLevel: laravelUser.kycLevel || "Level 3: Full Access",
    tier: laravelUser.tier || "PREMIUM TIER",
    avatarUrl: laravelUser.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
  };
};

export class AuthService {
  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  }

  static setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  static clearToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.clearToken();
        }
        return null;
      }

      const data = await response.json();
      if (data.success && data.user) {
        return mapLaravelUserToAppUser(data.user);
      }
      return null;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }

  static async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        this.setToken(data.token);
        return { success: true, message: data.message || "Login successful." };
      }

      return {
        success: false,
        message: data.message || "Invalid email or password.",
      };
    } catch (error) {
      console.error("Login request failed:", error);
      return {
        success: false,
        message: "Network error. Please make sure the backend server is running.",
      };
    }
  }

  static async logout(): Promise<void> {
    const token = this.getToken();
    this.clearToken();

    if (token) {
      try {
        await fetch(`${API_URL}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout request failed:", error);
      }
    }
  }
}
