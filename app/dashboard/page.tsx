"use client";

import { useRouter } from "next/navigation";
import OverviewTab from "@/components/dashboard/overview/OverviewTab";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import {
  mockCurrentUser,
  mockNotifications,
  mockQuickContacts
} from "@/constants/mockData";

export default function DashboardPage() {
  const router = useRouter();

  const handleOpenTransferModal = () => {
    router.push("/dashboard/transfers");
  };

  return (
    <DashboardLayout user={mockCurrentUser} notifications={mockNotifications}>
      <OverviewTab
        onOpenTransfer={handleOpenTransferModal}
        quickContacts={mockQuickContacts}
      />
    </DashboardLayout>
  );
}
