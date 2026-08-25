const InputWithIcon = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
}) => {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          required={required}
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
