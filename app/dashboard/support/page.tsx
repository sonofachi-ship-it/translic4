import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import SupportTab from "@/components/dashboard/support/SupportTab";
import { mockCurrentUser, mockNotifications, mockSystemStatus } from "@/constants/mockData";

export default function SupportPage() {
  return (
    <DashboardLayout user={mockCurrentUser} notifications={mockNotifications}>
      <SupportTab systemStatus={mockSystemStatus} />
    </DashboardLayout>
  );
}
