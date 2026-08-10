import { Card } from "@/types";
import { AuthService } from "./auth.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export class CardsService {
  static async getCards(): Promise<Card[]> {
    const token = AuthService.getToken();
    if (!token) return [];

    try {
      const response = await fetch(`${API_URL}/cards`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return [];
      const data = await response.json();
      if (data.success && Array.isArray(data.cards)) {
        return data.cards.map((c: any) => ({
          ...c,
          id: String(c.id),
          spendingLimit: parseFloat(c.spending_limit),
          spent: parseFloat(c.spent),
          cardColor: c.card_color,
        }));
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      return [];
    }
  }

  static async updateCard(cardId: string, params: { status?: 'active' | 'frozen'; spending_limit?: number }): Promise<boolean> {
    const token = AuthService.getToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/cards/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) return false;
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Failed to update card:", error);
      return false;
    }
  }

  static async freezeCard(cardId: string, isFrozen: boolean): Promise<boolean> {
    return this.updateCard(cardId, { status: isFrozen ? 'frozen' : 'active' });
  }

  static async issueCard(cardData: { name: string; type: string; spending_limit: number; card_color: string }): Promise<Card | null> {
    const token = AuthService.getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) return null;
      const data = await response.json();
      if (data.success && data.card) {
        const c = data.card;
        return {
          ...c,
          id: String(c.id),
          spendingLimit: parseFloat(c.spending_limit),
          spent: parseFloat(c.spent),
          cardColor: c.card_color,
        };
      }
      return null;
    } catch (error) {
      console.error("Failed to issue card:", error);
      return null;
    }
  }
}
