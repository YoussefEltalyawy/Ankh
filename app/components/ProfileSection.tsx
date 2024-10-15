import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { UserExtra } from "../types";

function ProfileSection({user}: {user: UserExtra}) {
  return (
    <>
      <p className="text-white opacity-30 mb-3">
        The following data is from the account you signed in, thus can not be
        changed here
      </p>
      <div className="userInfoCont grid gap-2">
        <span >
          <label htmlFor="first-name">First Name</label>
          <p className="text-h5 font-bold border px-3 py-1 rounded-lg max-w-[50%]">
            {user?.given_name}
          </p>
        </span>
        <span>
        <label htmlFor="last-name">Last Name</label>
        <p className="text-h5 font-bold border px-3 py-1 rounded-lg max-w-[50%]">
          {user?.family_name}
        </p>
        </span>
        <span>
        <label htmlFor="email">Email</label>
        <p className="text-h5 font-bold border px-3 py-1 rounded-lg w-fit">
          {user?.email}
        </p>
        </span>
        <LogoutLink>
        <button className="bg-white text-[#333] opacity-95 font-manrope text-h6 font-bold p-2 rounded-xl px-4">
          Log Out
        </button>
      </LogoutLink>
      </div>
    </>
  );
}
export default ProfileSection;
