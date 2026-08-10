import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import VaultsTab from "@/components/dashboard/vaults/VaultsTab";
import { mockCurrentUser, mockNotifications, mockVaults } from "@/constants/mockData";

export default function VaultsPage() {
  return (
    <DashboardLayout user={mockCurrentUser} notifications={mockNotifications}>
      <VaultsTab vaults={mockVaults} />
    </DashboardLayout>
  );
}
