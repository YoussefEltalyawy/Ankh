"use client";
import { signOut } from "next-auth/react";
import { SessionUser } from "../types";
import { LogOut, Mail, UserIcon } from "lucide-react";

function ProfileSection({ user }: { user: SessionUser }) {
  return (
    <div className="space-y-4">
      <p className="text-white/30 text-xs">
        Account data from your sign-in provider
      </p>

      <div className="space-y-2">
        <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <UserIcon className="w-3.5 h-3.5 text-white/40" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-white/30 font-medium mb-0.5">Name</p>
              <p className="text-sm font-medium text-white truncate">
                {user?.name || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <Mail className="w-3.5 h-3.5 text-white/40" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-white/30 font-medium mb-0.5">Email</p>
              <p className="text-sm font-medium text-white truncate">
                {user?.email || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => signOut()}
        className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white/60 hover:text-white font-manrope text-sm font-medium p-2.5 rounded-xl transition-all duration-200 mt-4"
      >
        <LogOut className="w-3.5 h-3.5" />
        Sign Out
      </button>
    </div>
  );
}

export default ProfileSection;
