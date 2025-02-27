
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";

interface Application {
  id: number;
  name: string;
  email: string;
  school: string;
  major?: string;
  submissionDate: string;
  status: string;
}

interface ApplicationsTableProps {
  applications: Application[];
  formatDate: (dateString: string) => string;
  handleCheckApplication: (application: Application) => void;
  updateApplicationStatus: (id: number, newStatus: string) => void;
}

const ApplicationsTable = ({
  applications,
  formatDate,
  handleCheckApplication,
  updateApplicationStatus,
}: ApplicationsTableProps) => {
  return (
    <div className="rounded-md border border-zinc-700 overflow-hidden">
      <Table>
        <TableHeader className="bg-zinc-900">
          <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
            <TableHead className="text-gray-300">ID</TableHead>
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">School</TableHead>
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <TableRow key={app.id} className="border-zinc-700 hover:bg-zinc-800/50">
                <TableCell className="font-medium text-gray-300">#{app.id}</TableCell>
                <TableCell className="text-white">{app.name}</TableCell>
                <TableCell className="text-gray-300">{app.email}</TableCell>
                <TableCell className="text-gray-300">{app.school}</TableCell>
                <TableCell className="text-gray-300">{formatDate(app.submissionDate)}</TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
                <TableCell>
                  <ActionButtons 
                    applicationId={app.id} 
                    status={app.status}
                    onCheck={() => handleCheckApplication(app)}
                    onUpdateStatus={updateApplicationStatus}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-400">
                {applications.length === 0 
                  ? "No applications have been submitted yet." 
                  : "No applications found matching your filters."
                }
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationsTable;
