"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import TransfersTab from "@/components/dashboard/transfers/TransfersTab";
import { AccountService } from "@/services/account.service";
import { TransferService } from "@/services/transfer.service";
import { Account, Beneficiary } from "@/types";
import { mockCurrentUser, mockNotifications } from "@/constants/mockData";

export default function TransfersPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [fetchedAccounts, fetchedBeneficiaries] = await Promise.all([
        AccountService.getAccounts(),
        TransferService.getBeneficiaries(),
      ]);
      setAccounts(fetchedAccounts);
      setBeneficiaries(fetchedBeneficiaries);
    } catch (error) {
      console.error("Failed to load transfers page data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DashboardLayout user={mockCurrentUser} notifications={mockNotifications}>
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-[#c3c5d9]/40 shadow-sm gap-3 min-h-[400px] max-w-3xl mx-auto">
          <div className="w-8 h-8 rounded-full border-2 border-[#0052ff]/10 border-t-[#0052ff] animate-spin" />
          <span className="text-xs font-semibold text-[#737688]">Loading transfers hub...</span>
        </div>
      ) : (
        <TransfersTab
          sourceAccounts={accounts}
          quickRecipients={beneficiaries}
          onRefresh={loadData}
        />
      )}
    </DashboardLayout>
  );
}
