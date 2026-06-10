"use client";

import { useState } from "react";
import { User, ApiResponse } from "@/types";
import { Button } from "@/components/ui/Button";
import { Loader2, CheckCircle2 } from "lucide-react";

interface SettingsTabProps {
  user: User;
}

export function SettingsTab({ user }: SettingsTabProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const result: ApiResponse<any> = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        throw new Error(result.error || 'Failed to update profile');
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="space-y-2 border-b pb-4">
        <h3 className="text-2xl font-black tracking-tight">Account Settings</h3>
        <p className="text-sm text-muted-foreground font-medium">Manage your account details and preferences</p>
      </div>

      <div className="max-w-2xl space-y-8">
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="space-y-4 p-6 border rounded-2xl bg-muted/30">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Personal Information</h4>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold px-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold px-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {message && (
              <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${
                message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-destructive/10 text-destructive border border-destructive/20'
              }`}>
                {message.type === 'success' && <CheckCircle2 className="h-4 w-4" />}
                {message.text}
              </div>
            )}
            <Button 
              type="submit" 
              disabled={isSaving}
              className="w-full md:w-auto h-12 px-8 rounded-xl font-black shadow-lg shadow-primary/20"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving Changes...
                </>
              ) : "Save Changes"}
            </Button>
          </div>
        </form>

        <div className="p-6 border border-destructive/20 rounded-2xl bg-destructive/5 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-destructive uppercase tracking-wider">Danger Zone</h4>
            <p className="text-xs text-muted-foreground font-medium">Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          <Button variant="destructive" className="font-bold rounded-xl">Delete Account</Button>
        </div>
      </div>
    </div>
  );
}
