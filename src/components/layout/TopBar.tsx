import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Settings,
  Bell,
  ChevronDown,
  FileDown,
  FileSpreadsheet,
  FileText,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

import { exportToPDF, exportToExcel } from "@/utils/exportUtils";

export function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isExporting, setIsExporting] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateExportProgress = (
    step: number,
    totalSteps: number,
    message: string
  ) => {
    setExportProgress(Math.round((step / totalSteps) * 100));
    setExportStatus(message);
  };

  const handleExport = async (type: "pdf" | "excel") => {
    setIsExporting(true);
    setExportProgress(0);

    try {
      if (type === "pdf") {
        updateExportProgress(1, 3, "Preparing data...");
        await new Promise((r) => setTimeout(r, 400));

        updateExportProgress(2, 3, "Generating PDF...");
        const success = await exportToPDF();

        if (!success) throw new Error("PDF export failed");

        updateExportProgress(3, 3, "Export complete!");
        toast({
          title: "Export Successful",
          description: "PDF report exported successfully.",
        });
      }

      if (type === "excel") {
        updateExportProgress(1, 2, "Generating Excel...");
        const success = exportToExcel();

        if (!success) throw new Error("Excel export failed");

        updateExportProgress(2, 2, "Export complete!");
        toast({
          title: "Export Successful",
          description: "Excel report exported successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        setExportStatus("");
      }, 1200);
    }
  };

  return (
    <>
      <header className="h-14 sm:h-16 bg-card border-b border-border flex items-center justify-between px-3 sm:px-4 lg:px-6 sticky top-0 z-40">
        {/* Left */}
        <div className="flex items-center gap-2 ml-12 lg:ml-0">
          <div className="hidden sm:block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <h1 className="text-sm sm:text-lg font-semibold truncate">
            Jewelery-Plant KPI Dashboard 
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 h-8 sm:h-9 px-3"
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Export</span>
                {!isExporting && (
                  <ChevronDown className="w-3 h-3 hidden sm:block" />
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => handleExport("pdf")}
                disabled={isExporting}
                className="gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Detailed PDF Report
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleExport("excel")}
                disabled={isExporting}
                className="gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Excel Data Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 h-9">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-white">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:block text-sm truncate max-w-[100px]">
                  {user?.name}
                </span>
                <ChevronDown className="w-4 h-4 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="gap-2"
              >
                <User className="w-4 h-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setShowLogoutDialog(true)}
                className="gap-2 text-destructive"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Export Progress */}
      <Dialog open={isExporting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exporting</DialogTitle>
            <DialogDescription>{exportStatus}</DialogDescription>
          </DialogHeader>
          <Progress value={exportProgress} className="h-2" />
        </DialogContent>
      </Dialog>

      {/* Logout Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
