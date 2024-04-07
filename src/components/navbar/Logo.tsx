
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Logo = () => {
  return (
    <Link to="/">
      <div className="font-monoton text-3xl hover:text-red-800 cursor-pointer text-center transition">
        EyeGlamour
      </div>
    </Link>
  );
};

export default Logo;
