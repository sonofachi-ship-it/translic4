import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import AnalyticsTab from "@/components/dashboard/analytics/AnalyticsTab";
import { mockCurrentUser, mockNotifications, mockCategoryBudgets } from "@/constants/mockData";

export default function AnalyticsPage() {
  return (
    <DashboardLayout user={mockCurrentUser} notifications={mockNotifications}>
      <AnalyticsTab categories={mockCategoryBudgets} />
    </DashboardLayout>
  );
}
