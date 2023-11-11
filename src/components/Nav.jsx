import { RiHome3Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Nav = ({ signOut, isAuth, inChat }) => {
  return (
    <div className="w-full text-black flex flex-row items-center justify-between">
      <div className="flex flex-row items-center m-4 ">
        <Link to="/">
          <RiHome3Line size={25} className="cursor-pointer" />
        </Link>
        <p className="text-2xl font-semibold mx-2">
          Reconnect <span className="">.</span>
        </p>
      </div>
      <div>
        {inChat && (
          <Link to="/chatroom">
            <button className="bg-transparent hover:bg-slate-900 text-slate-900 font-semibold hover:text-white py-2 px-6 border border-slate-900 hover:border-transparent rounded mr-6">
              Back
            </button>
          </Link>
        )}
        {isAuth && (
          <button
            onClick={signOut}
            className="bg-transparent hover:bg-slate-900 text-slate-900 font-semibold hover:text-white py-2 px-6 border border-slate-900 hover:border-transparent rounded mr-6"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
