import { ShieldCheck } from "lucide-react";

const ProfileHeader = ({ fullName, email }) => {
  return (
    <div className="card bg-linear-to-r from-blue-600 to-sky-500 text-white shadow-md rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
      <div className="avatar placeholder">
        <div className="bg-white text-blue-600 rounded-full w-24 ring ring-white ring-offset-base-100 ring-offset-2 flex items-center justify-center font-extrabold text-3xl shadow-inner">
          <span>{fullName ? fullName.charAt(0).toUpperCase() : "U"}</span>
        </div>
      </div>

      <div className="text-center md:text-left flex-1">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <h1 className="text-2xl font-bold">{fullName}</h1>
          <span className="badge badge-warning gap-1 text-xs font-semibold py-2">
            <ShieldCheck size={14} /> Member Verified
          </span>
        </div>
        <p className="text-blue-100 text-sm mt-1">{email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
