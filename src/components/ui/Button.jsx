const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white border-none shadow-md shadow-blue-600/20",
    secondary: "bg-slate-800 hover:bg-slate-900 text-white border-none",
    outline:
      "bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-100",
    danger: "bg-red-600 hover:bg-red-700 text-white border-none",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 border-none",
  };

  const sizes = {
    sm: "btn-sm text-xs px-3",
    md: "btn-md text-sm px-4",
    lg: "btn-lg text-base px-6",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn rounded-xl font-semibold transition-all duration-200 active:scale-95 ${
        variants[variant] || variants.primary
      } ${sizes[size] || sizes.md} ${fullWidth ? "w-full" : ""} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
