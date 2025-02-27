
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    weeklyReports: true,
    applicationAlerts: true,
    maintenanceMode: false,
    apiKey: "pk_test_51JFj2jKGj2j9kG9j2j9kG9j2",
    reportEmail: "admin@pareto20.com",
  });

  const handleToggleChange = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings],
    });
    
    toast.success(`${setting} setting updated`);
  };

  const saveSettings = () => {
    // In a real app, this would save to a backend
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Notifications</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-notifications" className="text-white text-base">
                  Email Notifications
                </Label>
                <p className="text-sm text-gray-400">
                  Receive email notifications for new applications
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggleChange("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="weekly-reports" className="text-white text-base">
                  Weekly Reports
                </Label>
                <p className="text-sm text-gray-400">
                  Receive weekly summary reports of application statistics
                </p>
              </div>
              <Switch
                id="weekly-reports"
                checked={settings.weeklyReports}
                onCheckedChange={() => handleToggleChange("weeklyReports")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="application-alerts" className="text-white text-base">
                  Application Alerts
                </Label>
                <p className="text-sm text-gray-400">
                  Get notified when an application needs urgent attention
                </p>
              </div>
              <Switch
                id="application-alerts"
                checked={settings.applicationAlerts}
                onCheckedChange={() => handleToggleChange("applicationAlerts")}
              />
            </div>
          </div>
        </Card>

        {/* System Settings */}
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">System</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="maintenance-mode" className="text-white text-base">
                  Maintenance Mode
                </Label>
                <p className="text-sm text-gray-400">
                  When enabled, the application form will be temporarily unavailable
                </p>
              </div>
              <Switch
                id="maintenance-mode"
                checked={settings.maintenanceMode}
                onCheckedChange={() => handleToggleChange("maintenanceMode")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key" className="text-white text-base">
                API Key
              </Label>
              <div className="flex">
                <Input
                  id="api-key"
                  className="bg-zinc-900 border-zinc-700 text-white"
                  type="password"
                  value={settings.apiKey}
                  readOnly
                />
                <Button
                  variant="outline"
                  className="ml-2 border-zinc-700 text-gray-300 hover:bg-zinc-700"
                  onClick={() => {
                    navigator.clipboard.writeText(settings.apiKey);
                    toast.success("API key copied to clipboard");
                  }}
                >
                  Copy
                </Button>
              </div>
              <p className="text-sm text-gray-400">
                Used for external integrations. Keep this secure.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Email Settings */}
      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Report Delivery</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report-email" className="text-white text-base">
              Report Email Recipients
            </Label>
            <Input
              id="report-email"
              className="bg-zinc-900 border-zinc-700 text-white"
              placeholder="email@pareto20.com"
              value={settings.reportEmail}
              onChange={(e) => setSettings({ ...settings, reportEmail: e.target.value })}
            />
            <p className="text-sm text-gray-400">
              Separate multiple email addresses with commas
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          variant="pink"
          className="px-8"
          onClick={saveSettings}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
