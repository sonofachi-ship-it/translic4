import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import AccountsTab from "@/components/dashboard/accounts/AccountsTab";
import { mockCurrentUser, mockNotifications } from "@/constants/mockData";

export default function AccountsPage() {
  return (
    <DashboardLayout user={mockCurrentUser} notifications={mockNotifications}>
      <AccountsTab />
    </DashboardLayout>
  );
}
