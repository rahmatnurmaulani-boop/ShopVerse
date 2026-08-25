import { ShoppingCart } from "lucide-react";

const Toast = ({ message }) => {
  return (
    <div className="toast toast-end z-50">
      <div className="alert bg-blue-600 text-white shadow-lg border-none flex items-center gap-2">
        <ShoppingCart size={18} />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
