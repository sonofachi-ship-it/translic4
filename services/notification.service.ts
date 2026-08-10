import { Notification } from "@/types";
import { AuthService } from "./auth.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

const mapLaravelNotification = (notif: any): Notification => {
  return {
    id: notif.id,
    title: notif.title,
    desc: notif.desc,
    time: formatTime(notif.created_at),
    icon: notif.icon || "notifications",
    color: notif.color || "bg-[#0052ff]/20 text-[#0052ff]",
    read_at: notif.read_at,
    user_id: notif.user_id,
    created_at: notif.created_at,
    updated_at: notif.updated_at,
  };
};

function formatTime(createdAtStr: string): string {
  if (!createdAtStr) return "Just now";
  const date = new Date(createdAtStr);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} mins ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
}

export class NotificationService {
  static async getNotifications(): Promise<Notification[]> {
    const token = AuthService.getToken();
    if (!token) return [];

    try {
      const response = await fetch(`${API_URL}/notifications`, {
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
      if (data.success && Array.isArray(data.notifications)) {
        return data.notifications.map(mapLaravelNotification);
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      return [];
    }
  }

  static async markAsRead(id: number): Promise<boolean> {
    const token = AuthService.getToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/notifications/${id}/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return response.ok && data.success;
    } catch (error) {
      console.error(`Failed to mark notification ${id} as read:`, error);
      return false;
    }
  }

  static async markAllAsRead(): Promise<boolean> {
    const token = AuthService.getToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/notifications/read-all`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return response.ok && data.success;
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      return false;
    }
  }
}
