import React, { useEffect } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

const Navbar1 = () => {
  const location = useLocation();

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const logoutUser = () => {
    try {
      signOut(auth)
        .then(() => {
          toast.success("User logged out");
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="flex items-center justify-between p-4 bg-[#000435]">
      <Link to="/">
        <div className="flex items-center space-x-2">
          <img src={assets.logo} className="w-10" />
          <div className="text-xl sm:text-3xl text-white">
            <h3>
              Expense<span className="font-semibold">Sync</span>
            </h3>
          </div>
        </div>
      </Link>
      <div>
        {location.pathname === "/" && (
          <Link to="/login">
            <button className="border px-1 py-2 sm:px-4 sm:py-2 rounded-full bg-white">
              GET STARTED
            </button>
          </Link>
        )}

        {location.pathname === "/dashboard" && (
          <button
            className="border px-1 py-2 sm:px-4 sm:py-2 rounded-full bg-white"
            onClick={logoutUser}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar1;
