import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast({
      description: `Theme changed to ${newTheme} mode`,
      duration: 1500,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 hover:bg-pareto-pink/20"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-white/80 hover:text-pareto-pink transition-colors" />
      ) : (
        <Moon className="h-4 w-4 text-black/80 hover:text-pareto-pink transition-colors" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
