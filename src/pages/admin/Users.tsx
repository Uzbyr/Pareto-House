import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash, UserCog } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock admin users data
const mockUsers = [
  { id: 1, name: "John Admin", email: "john@pareto20.com", role: "admin" },
  {
    id: 2,
    name: "Sarah Super",
    email: "sarah@pareto20.com",
    role: "super_admin",
  },
  { id: 3, name: "Mike Analyst", email: "mike@pareto20.com", role: "analyst" },
  { id: 4, name: "Linda Admin", email: "linda@pareto20.com", role: "admin" },
];

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const { user: currentUser } = useAuth();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin" as "admin" | "analyst" | "super_admin",
  });

  const addUser = () => {
    // Validate email domain
    if (!newUser.email.endsWith("@pareto20.com")) {
      toast.error("Email must be a @pareto20.com address");
      return;
    }

    // In a real app, this would send data to a server
    const newUserId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    setUsers([
      ...users,
      {
        id: newUserId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    ]);

    // Reset form
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "admin",
    });

    toast.success("User added successfully");
  };

  const deleteUser = (id: number) => {
    // Prevent deleting yourself
    const userToDelete = users.find((u) => u.id === id);
    if (userToDelete?.email === currentUser?.email) {
      toast.error("You cannot delete your own account");
      return;
    }

    setUsers(users.filter((user) => user.id !== id));
    toast.success("User deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Users</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="pink" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-800 border border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle>Add New Admin User</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new administrator with a @pareto20.com email address.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-zinc-900 border-zinc-700 text-white"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@pareto20.com"
                  className="bg-zinc-900 border-zinc-700 text-white"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                <p className="text-xs text-gray-400">
                  Must be a @pareto20.com address
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-zinc-900 border-zinc-700 text-white"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-300">
                  Role
                </Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: "admin" | "analyst" | "super_admin") =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger
                    id="role"
                    className="bg-zinc-900 border-zinc-700 text-white"
                  >
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400">
                  Super Admins have access to all features including user
                  management.
                </p>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="border-zinc-700 text-gray-300 hover:bg-zinc-700"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="pink" onClick={addUser}>
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <div className="rounded-md border border-zinc-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Role</TableHead>
                <TableHead className="text-gray-300 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-zinc-700 hover:bg-zinc-800/50"
                >
                  <TableCell className="font-medium text-white">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-gray-300">{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "super_admin"
                          ? "bg-purple-400/10 text-purple-400"
                          : user.role === "admin"
                            ? "bg-blue-400/10 text-blue-400"
                            : "bg-green-400/10 text-green-400"
                      }`}
                    >
                      <UserCog className="h-3 w-3 mr-1" />
                      {user.role === "super_admin"
                        ? "Super Admin"
                        : user.role === "admin"
                          ? "Admin"
                          : "Analyst"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      onClick={() => deleteUser(user.id)}
                      disabled={user.email === currentUser?.email}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Users;
