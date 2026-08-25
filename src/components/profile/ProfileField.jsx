import React from "react";

const ProfileField = ({
  label,
  name,
  value,
  type = "text",
  isEditing,
  onChange,
  icon: Icon,
  options,
}) => {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
        {Icon && <Icon size={14} />} {label}
      </label>
      {isEditing ? (
        options ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
          />
        )
      ) : (
        <p className="text-white text-sm font-medium capitalize">
          {type === "password" ? "••••••••" : value || "-"}
        </p>
      )}
    </div>
  );
};

export default ProfileField;
