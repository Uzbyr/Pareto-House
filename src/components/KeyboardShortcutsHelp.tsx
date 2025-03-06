
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface KeyboardShortcutsHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KeyboardShortcutsHelp = ({ open, onOpenChange }: KeyboardShortcutsHelpProps) => {
  const shortcuts = [
    { key: "?", action: "Show/hide keyboard shortcuts" },
    { key: "←", action: "Previous application (when viewing details)" },
    { key: "→", action: "Next application (when viewing details)" },
    { key: "A", action: "Approve application (when viewing details)" },
    { key: "R", action: "Reject application (when viewing details)" },
    { key: "P", action: "Mark as pending (when viewing details)" },
    { key: "F", action: "Flag/unflag application (when viewing details)" },
    { key: "C", action: "Open communication dialog (when viewing details)" },
    { key: "Esc", action: "Close current dialog" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-800 border-zinc-700 text-white">
        <DialogHeader className="border-b border-zinc-700 pb-4">
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Keyboard Shortcuts</span>
            <DialogClose className="h-6 w-6 rounded-md border border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-700">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center">
                <kbd className="px-2 py-1 bg-zinc-700 rounded-md text-gray-300 min-w-16 text-center mr-4">
                  {shortcut.key}
                </kbd>
                <span className="text-gray-200">{shortcut.action}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Note: These keyboard shortcuts are designed to help you review applications more efficiently.
            They're especially useful when reviewing applications in sequence.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsHelp;
