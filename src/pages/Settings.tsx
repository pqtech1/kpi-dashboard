import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Mail, 
  Smartphone,
  Save,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    alerts: true,
    reports: false,
  });

  const [preferences, setPreferences] = useState({
    autoRefresh: true,
    compactView: false,
    animations: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSaveNotifications = () => {
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your display preferences have been saved.",
    });
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    if (passwords.new.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }
    setPasswords({ current: "", new: "", confirm: "" });
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
          Configuration
        </span>
        <h1 className="page-header text-3xl sm:text-4xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="max-w-xl text-sm sm:text-base text-muted-foreground">
          Customize your dashboard experience and manage your account
        </p>
        <div className="mt-2 h-1 w-16 rounded-full bg-primary/60" />
      </div>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label>Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive updates via email</p>
              </div>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label>Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Browser push notifications</p>
              </div>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label>Alert Notifications</Label>
                <p className="text-xs text-muted-foreground">Get notified about production alerts</p>
              </div>
            </div>
            <Switch
              checked={notifications.alerts}
              onCheckedChange={(checked) => setNotifications({ ...notifications, alerts: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label>Weekly Reports</Label>
                <p className="text-xs text-muted-foreground">Receive weekly summary reports</p>
              </div>
            </div>
            <Switch
              checked={notifications.reports}
              onCheckedChange={(checked) => setNotifications({ ...notifications, reports: checked })}
            />
          </div>
          <div className="pt-4">
            <Button onClick={handleSaveNotifications} className="gap-2">
              <Save className="w-4 h-4" />
              Save Notifications
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Display Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            <CardTitle>Display Preferences</CardTitle>
          </div>
          <CardDescription>Customize your dashboard appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label>Auto Refresh Data</Label>
                <p className="text-xs text-muted-foreground">Automatically refresh dashboard data</p>
              </div>
            </div>
            <Switch
              checked={preferences.autoRefresh}
              onCheckedChange={(checked) => setPreferences({ ...preferences, autoRefresh: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label>Compact View</Label>
                <p className="text-xs text-muted-foreground">Show more data in less space</p>
              </div>
            </div>
            <Switch
              checked={preferences.compactView}
              onCheckedChange={(checked) => setPreferences({ ...preferences, compactView: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <div>
                <Label>Animations</Label>
                <p className="text-xs text-muted-foreground">Enable smooth animations</p>
              </div>
            </div>
            <Switch
              checked={preferences.animations}
              onCheckedChange={(checked) => setPreferences({ ...preferences, animations: checked })}
            />
          </div>
          <div className="pt-4">
            <Button onClick={handleSavePreferences} className="gap-2">
              <Save className="w-4 h-4" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current" className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="current"
                  type={showPassword ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input
                id="new"
                type={showPassword ? "text" : "password"}
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input
                id="confirm"
                type={showPassword ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="gap-2"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPassword ? "Hide Passwords" : "Show Passwords"}
            </Button>
          </div>
          <div className="pt-2">
            <Button onClick={handleChangePassword} className="gap-2">
              <Lock className="w-4 h-4" />
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
