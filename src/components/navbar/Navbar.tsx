import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Search from "../filters/Search";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useGetAllCartItemQuery } from "../../api/cartApi";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../api/store/authSlice";
import { clearStoredState } from "../../api/store/store";
import { notify } from "../../utils/utils";

const Navbar = () => {
  const [colorChange, setColorChange] = useState(false);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = useSelector((state: any) => state.auth.userData?.token);
  const { data, isLoading } = useGetAllCartItemQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50
      setColorChange(show)
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll)
    };
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    // localStorage.removeItem('token');
    dispatch(logout())
    clearStoredState();
    navigate('/login');
    notify('success', "Logout Successfully", 0)
  };



  return (
    <nav
      className={`flex flex-col sm:flex-row py-3 max-w-screen mb-3 fixed left-0 right-0 px-[4%] md:px-[10%] ${colorChange ? "bg-blue-500 shadow-sm drop-shadow-sm" : "bg-white"} z-10 transition delay-75 ease-in-out`}
    >
      <div className="flex justify-between w-full items-center">
        <section className="relative flex items-center">

          <img
            className="rounded-full border-2  bg-yellow-300 me-3 hover:bg-yellow-500 cursor-pointer"
            src={logo}
            alt="userProfileImage"
            width={40}
          />


          <Logo />
        </section>

        <div className="hidden  sm:block sm:w-1/3 relative">
          <Search />
        </div>

        <section className="flex justify-center items-center">
          <Link
            to="/products"
            className="mx-2 px-4 py-2 shadow-sm rounded-md text-white bg-gray-700 text-sm hover:bg-yellow-800 transition"
          >

            <span className=" xs:block">Explore</span>
          </Link>
          <ul className=" hidden md:flex justify-between text-2xl ps-1">

            <li
              className="relative bg-blue-500 text-white p-2 rounded-full hover:bg-yellow-800 cursor-pointer mx-2 transition shadow-sm"
              onClick={() => {
                if (!token) {
                  navigate("/login")
                }
                else {
                  navigate("/cart")
                }
              }}
            >
              <HiOutlineShoppingBag />
              {token && data?.length > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-rose-600 border-2 border-[--theme-color] rounded-full -top-2 -right-2 ">
                  {data.length}
                </div>
              )}
            </li>
          </ul>
          <section className="md:hidden cursor-pointer relative">
            <RxHamburgerMenu
              className="text-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </section>

          {token ? (
            <button
              onClick={handleLogout}
              className="relative bg-blue-500 text-white p-3 rounded-full hover:bg-yellow-800 cursor-pointer mx-2 transition shadow-sm"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="relative bg-blue-500 text-white p-3 rounded-full hover:bg-yellow-800 cursor-pointer mx-2 transition shadow-sm"
            >
              Login
            </Link>
          )}

        </section>
      </div>
      <section className="mt-4 sm:hidden relative">
        <Search />
      </section>
    </nav>
  );
};

export default Navbar;
