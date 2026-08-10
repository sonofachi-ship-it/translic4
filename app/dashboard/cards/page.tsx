import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import CardsTab from "@/components/dashboard/cards/CardsTab";
import { mockCurrentUser, mockNotifications, mockCards } from "@/constants/mockData";

export default function CardsPage() {
  return (
    <DashboardLayout user={mockCurrentUser} notifications={mockNotifications}>
      <CardsTab cards={mockCards} />
    </DashboardLayout>
  );
}
