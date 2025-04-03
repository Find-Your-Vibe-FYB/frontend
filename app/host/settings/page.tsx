"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  CreditCard,
  Download,
  Globe,
  Key,
  Loader2,
  Lock,
  LogOut,
  Moon,
  Save,
  Settings,
  Shield,
  Sun,
  Trash2,
  User,
} from "lucide-react"
import { HostHeader } from "@/components/host-header"

export default function HostSettings() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")
  const [isSaving, setIsSaving] = useState(false)

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    email: "alex@example.com",
    language: "english",
    timezone: "america_los_angeles",
    theme: "light",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    participantJoins: true,
    matchingResults: true,
    marketingEmails: false,
  })

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showSocialLinks: true,
    allowDataCollection: true,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
  })

  // Password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleAccountChange = (key: string, value: string) => {
    setAccountSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleNotificationToggle = (key: string) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSecurityToggle = (key: string) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const saveSettings = async () => {
    setIsSaving(true)

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success notification would go here
    } catch (error) {
      console.error("Failed to save settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const changePassword = async () => {
    setIsSaving(true)

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // Success notification would go here
    } catch (error) {
      console.error("Failed to change password:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const deleteAccount = async () => {
    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Failed to delete account:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <HostHeader />

      <main className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push("/host/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold font-outfit">Settings</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <Card className="md:col-span-1 border-2 border-pale-purple/30">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <Button
                    variant={activeTab === "account" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "account" ? "bg-pale-purple text-primary-foreground" : ""}`}
                    onClick={() => setActiveTab("account")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Button>

                  <Button
                    variant={activeTab === "notifications" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "notifications" ? "bg-pale-purple text-primary-foreground" : ""}`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>

                  <Button
                    variant={activeTab === "privacy" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "privacy" ? "bg-pale-purple text-primary-foreground" : ""}`}
                    onClick={() => setActiveTab("privacy")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy
                  </Button>

                  <Button
                    variant={activeTab === "security" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "security" ? "bg-pale-purple text-primary-foreground" : ""}`}
                    onClick={() => setActiveTab("security")}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Security
                  </Button>

                  <Button
                    variant={activeTab === "billing" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "billing" ? "bg-pale-purple text-primary-foreground" : ""}`}
                    onClick={() => setActiveTab("billing")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </Button>

                  <Separator className="my-4" />

                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => router.push("/")}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Account Settings */}
              {activeTab === "account" && (
                <Card className="border-2 border-pale-purple/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>Manage your account preferences and settings</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        value={accountSettings.email}
                        onChange={(e) => handleAccountChange("email", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={accountSettings.language}
                        onValueChange={(value) => handleAccountChange("language", value)}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={accountSettings.timezone}
                        onValueChange={(value) => handleAccountChange("timezone", value)}
                      >
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america_los_angeles">Pacific Time (US & Canada)</SelectItem>
                          <SelectItem value="america_denver">Mountain Time (US & Canada)</SelectItem>
                          <SelectItem value="america_chicago">Central Time (US & Canada)</SelectItem>
                          <SelectItem value="america_new_york">Eastern Time (US & Canada)</SelectItem>
                          <SelectItem value="europe_london">London</SelectItem>
                          <SelectItem value="europe_paris">Paris</SelectItem>
                          <SelectItem value="asia_tokyo">Tokyo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant={accountSettings.theme === "light" ? "default" : "outline"}
                          className={`flex-1 gap-2 ${accountSettings.theme === "light" ? "bg-pale-purple text-primary-foreground" : ""}`}
                          onClick={() => handleAccountChange("theme", "light")}
                        >
                          <Sun className="h-4 w-4" />
                          Light
                        </Button>

                        <Button
                          variant={accountSettings.theme === "dark" ? "default" : "outline"}
                          className={`flex-1 gap-2 ${accountSettings.theme === "dark" ? "bg-pale-purple text-primary-foreground" : ""}`}
                          onClick={() => handleAccountChange("theme", "dark")}
                        >
                          <Moon className="h-4 w-4" />
                          Dark
                        </Button>

                        <Button
                          variant={accountSettings.theme === "system" ? "default" : "outline"}
                          className={`flex-1 gap-2 ${accountSettings.theme === "system" ? "bg-pale-purple text-primary-foreground" : ""}`}
                          onClick={() => handleAccountChange("theme", "system")}
                        >
                          <Settings className="h-4 w-4" />
                          System
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={saveSettings} disabled={isSaving} className="gap-2">
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <Card className="border-2 border-pale-purple/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>Control how and when you receive notifications</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailNotifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="pushNotifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                        </div>
                        <Switch
                          id="pushNotifications"
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={() => handleNotificationToggle("pushNotifications")}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="eventReminders">Event Reminders</Label>
                          <p className="text-sm text-muted-foreground">Receive reminders about upcoming events</p>
                        </div>
                        <Switch
                          id="eventReminders"
                          checked={notificationSettings.eventReminders}
                          onCheckedChange={() => handleNotificationToggle("eventReminders")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="participantJoins">Participant Joins</Label>
                          <p className="text-sm text-muted-foreground">Get notified when someone joins your event</p>
                        </div>
                        <Switch
                          id="participantJoins"
                          checked={notificationSettings.participantJoins}
                          onCheckedChange={() => handleNotificationToggle("participantJoins")}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="matchingResults">Matching Results</Label>
                          <p className="text-sm text-muted-foreground">Get notified when matching is complete</p>
                        </div>
                        <Switch
                          id="matchingResults"
                          checked={notificationSettings.matchingResults}
                          onCheckedChange={() => handleNotificationToggle("matchingResults")}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketingEmails">Marketing Emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about new features and promotions
                          </p>
                        </div>
                        <Switch
                          id="marketingEmails"
                          checked={notificationSettings.marketingEmails}
                          onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={saveSettings} disabled={isSaving} className="gap-2">
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <Card className="border-2 border-pale-purple/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>Control your privacy and data settings</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="profileVisibility">Profile Visibility</Label>
                        <Select
                          value={privacySettings.profileVisibility}
                          onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                        >
                          <SelectTrigger id="profileVisibility">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public - Anyone can view</SelectItem>
                            <SelectItem value="participants">
                              Participants Only - Only event participants can view
                            </SelectItem>
                            <SelectItem value="private">Private - Only you can view</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="showSocialLinks">Show Social Media Links</Label>
                          <p className="text-sm text-muted-foreground">
                            Display your social media links on your profile
                          </p>
                        </div>
                        <Switch
                          id="showSocialLinks"
                          checked={privacySettings.showSocialLinks}
                          onCheckedChange={(checked) => handlePrivacyChange("showSocialLinks", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="allowDataCollection">Data Collection</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow us to collect anonymous usage data to improve our service
                          </p>
                        </div>
                        <Switch
                          id="allowDataCollection"
                          checked={privacySettings.allowDataCollection}
                          onCheckedChange={(checked) => handlePrivacyChange("allowDataCollection", checked)}
                        />
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-start gap-3">
                          <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium">Data Privacy</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              We take your privacy seriously. Your data is never sold to third parties and is only used
                              to provide and improve our services.
                            </p>
                            <Button variant="link" className="p-0 h-auto text-sm mt-2">
                              View Privacy Policy
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-start gap-3">
                          <Download className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium">Download Your Data</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              You can request a copy of all the data we have about you.
                            </p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Request Data Export
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={saveSettings} disabled={isSaving} className="gap-2">
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <Card className="border-2 border-pale-purple/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Security Settings
                      </CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch
                            id="twoFactorAuth"
                            checked={securitySettings.twoFactorAuth}
                            onCheckedChange={() => handleSecurityToggle("twoFactorAuth")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="loginNotifications">Login Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Get notified when someone logs into your account
                            </p>
                          </div>
                          <Switch
                            id="loginNotifications"
                            checked={securitySettings.loginNotifications}
                            onCheckedChange={() => handleSecurityToggle("loginNotifications")}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={saveSettings} disabled={isSaving} className="gap-2">
                          {isSaving ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-pale-purple/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Key className="h-5 w-5" />
                        Change Password
                      </CardTitle>
                      <CardDescription>Update your account password</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={changePassword}
                          disabled={
                            isSaving ||
                            !passwordData.currentPassword ||
                            !passwordData.newPassword ||
                            !passwordData.confirmPassword ||
                            passwordData.newPassword !== passwordData.confirmPassword
                          }
                          className="gap-2"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            <>
                              <Key className="h-4 w-4" />
                              Update Password
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-destructive/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-5 w-5" />
                        Danger Zone
                      </CardTitle>
                      <CardDescription>Irreversible account actions</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="p-4 border border-dashed border-destructive/50 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="font-medium text-destructive">Delete Account</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              This will permanently delete your account and all associated data. This action cannot be
                              undone.
                            </p>
                          </div>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                Delete Account
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your account and remove all
                                  of your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={deleteAccount}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Account
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Billing Settings */}
              {activeTab === "billing" && (
                <Card className="border-2 border-pale-purple/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Billing & Subscription
                    </CardTitle>
                    <CardDescription>Manage your subscription and payment methods</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="p-4 bg-mimi-pink/10 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-medium">Premium Plan</h4>
                          <p className="text-sm text-muted-foreground mt-1">$19.99/month • Renews on May 15, 2025</p>
                        </div>

                        <Button variant="outline" size="sm">
                          Manage Subscription
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Payment Methods</h3>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-[#1434CB] rounded flex items-center justify-center text-white text-xs font-bold">
                              VISA
                            </div>
                            <div>
                              <div className="font-medium">Visa ending in 4242</div>
                              <div className="text-xs text-muted-foreground">Expires 12/2025</div>
                            </div>
                          </div>

                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="mt-2">
                        Add Payment Method
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Billing History</h3>

                      <div className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-3 gap-4 p-3 bg-muted text-sm font-medium">
                          <div>Date</div>
                          <div>Amount</div>
                          <div className="text-right">Receipt</div>
                        </div>

                        <div className="divide-y">
                          <div className="grid grid-cols-3 gap-4 p-3 text-sm">
                            <div>Apr 15, 2025</div>
                            <div>$19.99</div>
                            <div className="text-right">
                              <Button variant="link" size="sm" className="h-auto p-0">
                                Download
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 p-3 text-sm">
                            <div>Mar 15, 2025</div>
                            <div>$19.99</div>
                            <div className="text-right">
                              <Button variant="link" size="sm" className="h-auto p-0">
                                Download
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 p-3 text-sm">
                            <div>Feb 15, 2025</div>
                            <div>$19.99</div>
                            <div className="text-right">
                              <Button variant="link" size="sm" className="h-auto p-0">
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

