"use client";
import { signOut } from "next-auth/react";
import { SessionUser } from "../types";

function ProfileSection({ user }: { user: SessionUser }) {
  return (
    <>
      <p className="text-white opacity-30 mb-3">
        The following data is from the account you signed in, thus can not be
        changed here
      </p>
      <div className="userInfoCont grid gap-2">
        <span>
          <label htmlFor="name">Name</label>
          <p className="text-h5 font-bold border px-3 py-1 rounded-lg max-w-[50%]">
            {user?.name || "Not provided"}
          </p>
        </span>
        <span>
          <label htmlFor="email">Email</label>
          <p className="text-h5 font-bold border px-3 py-1 rounded-lg w-fit">
            {user?.email || "Not provided"}
          </p>
        </span>
        <button
          onClick={() => signOut()}
          className="bg-white text-[#333] opacity-95 font-manrope text-h6 font-bold p-2 rounded-xl px-4 hover:opacity-80 transition-opacity"
        >
          Log Out
        </button>
      </div>
    </>
  );
}
export default ProfileSection;
