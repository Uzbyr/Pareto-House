import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { useHotkeys } from "react-hotkeys-hook";
import ApplicationDetailsDialog from "@/components/ApplicationDetailsDialog";
import BatchComparisonDialog from "@/components/BatchComparisonDialog";
import KeyboardShortcutsHelp from "@/components/KeyboardShortcutsHelp";
import ApplicationFilters from "@/components/admin/ApplicationFilters";
import ApplicationsTable from "@/components/admin/ApplicationsTable";
import ApplicationActionButtons from "@/components/admin/ApplicationActionButtons";
import useApplicationManagement from "@/hooks/useApplicationManagement";

const Applications = () => {
  const {
    filteredApplications,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isRefreshing,
    refreshApplications,
    selectedApplication,
    isDetailsOpen,
    setIsDetailsOpen,
    isBatchOpen,
    setIsBatchOpen,
    selectedApplications,
    isHelpOpen,
    setIsHelpOpen,
    exportToCSV,
    updateApplicationStatus,
    toggleFlagApplication,
    handleCheckApplication,
    handleBatchComparison,
    navigateToApplication,
  } = useApplicationManagement();

  const tableRef = useRef<HTMLDivElement>(null);

  useHotkeys(
    "right",
    () => {
      if (isDetailsOpen) navigateToApplication("next");
    },
    [isDetailsOpen, navigateToApplication],
  );

  useHotkeys(
    "left",
    () => {
      if (isDetailsOpen) navigateToApplication("prev");
    },
    [isDetailsOpen, navigateToApplication],
  );

  useHotkeys(
    "a",
    () => {
      if (isDetailsOpen && selectedApplication) {
        updateApplicationStatus(selectedApplication.id, "approved");
      }
    },
    [isDetailsOpen, selectedApplication],
  );

  useHotkeys(
    "r",
    () => {
      if (isDetailsOpen && selectedApplication) {
        updateApplicationStatus(selectedApplication.id, "rejected");
      }
    },
    [isDetailsOpen, selectedApplication],
  );

  useHotkeys(
    "p",
    () => {
      if (isDetailsOpen && selectedApplication) {
        updateApplicationStatus(selectedApplication.id, "pending");
      }
    },
    [isDetailsOpen, selectedApplication],
  );

  useHotkeys(
    "f",
    () => {
      if (isDetailsOpen && selectedApplication) {
        toggleFlagApplication(selectedApplication.id);
      }
    },
    [isDetailsOpen, selectedApplication],
  );

  useHotkeys("c", () => {}, [isDetailsOpen, selectedApplication]);

  useHotkeys(
    "escape",
    () => {
      setIsDetailsOpen(false);
    },
    [],
  );

  useHotkeys(
    "?",
    () => {
      setIsHelpOpen((prev) => !prev);
    },
    [],
  );

  const updateFunctions = {
    updateApplicationStatus,
    toggleFlagApplication,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Applications</h1>
        <ApplicationActionButtons
          isRefreshing={isRefreshing}
          refreshApplications={refreshApplications}
          exportToCSV={exportToCSV}
          handleBatchComparison={handleBatchComparison}
          applicationCount={filteredApplications.length}
          showKeyboardShortcuts={() => setIsHelpOpen(true)}
        />
      </div>

      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <ApplicationFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <div
          ref={tableRef}
          className="rounded-md border border-zinc-700 overflow-hidden"
        >
          <ApplicationsTable
            applications={filteredApplications}
            handleCheckApplication={handleCheckApplication}
            updateFunctions={updateFunctions}
          />
        </div>
      </Card>

      <ApplicationDetailsDialog
        application={selectedApplication}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onNavigate={navigateToApplication}
        onStatusChange={updateApplicationStatus}
        onFlagToggle={toggleFlagApplication}
      />

      <BatchComparisonDialog
        applications={selectedApplications}
        open={isBatchOpen}
        onOpenChange={setIsBatchOpen}
      />

      <KeyboardShortcutsHelp open={isHelpOpen} onOpenChange={setIsHelpOpen} />
    </div>
  );
};

export default Applications;
