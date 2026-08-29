import { useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Trash2,
  Eye,
  EyeOff,
  Key,
} from "lucide-react";

const UserRow = ({ user, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  let name = user.username || "User";
  if (typeof user.name === "object" && user.name !== null) {
    name = `${user.name?.firstname || ""} ${user.name?.lastname || ""}`.trim();
  } else if (typeof user.name === "string") {
    name = user.name;
  }

  let address = "-";
  if (typeof user.address === "object" && user.address !== null) {
    address =
      `${user.address?.street || ""} ${user.address?.number || ""}, ${user.address?.city || ""}`.trim();
  } else if (user.street) {
    address = user.street;
  }

  return (
    <tr className="hover:bg-slate-800/30 transition-colors">
      <td className="py-4 px-4">
        <div className="font-semibold text-white capitalize">
          {name || "User"}
        </div>
        <div className="text-xs text-slate-500">
          @{user.username ? user.username.replace(/^@+/, "") : "user"}
        </div>
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/50 w-fit">
          <Key size={14} className="text-amber-400 shrink-0" />
          <span className="font-mono text-xs text-amber-200">
            {showPassword ? user.password || "••••••••" : "••••••••"}
          </span>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 hover:text-slate-200 ml-1 transition-colors"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </td>

      <td className="py-4 px-4 space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <Mail size={14} className="text-blue-400" /> {user.email || "-"}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Phone size={14} className="text-slate-500" /> {user.phone || "-"}
        </div>
      </td>

      <td className="py-4 px-4 space-y-1 text-xs">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-slate-500" />{" "}
          {user.birthDate || "-"}
        </div>
        <div className="text-slate-400 capitalize">{user.gender || "-"}</div>
      </td>

      <td className="py-4 px-4 text-xs max-w-xs truncate">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-slate-500 shrink-0" />
          <span className="capitalize">{address || "-"}</span>
        </div>
      </td>

      <td className="py-4 px-4 text-center">
        <button
          onClick={() => onDelete(user.email || user.username || user.id)}
          className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          title="Hapus User"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
