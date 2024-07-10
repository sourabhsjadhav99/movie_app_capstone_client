import { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";
import { MdMovieCreation, MdBookmarkBorder } from "react-icons/md";
import { IoArrowBackSharp } from "react-icons/io5";
import { PiTelevisionFill } from "react-icons/pi";
import { GrAppsRounded } from "react-icons/gr";
import { TbMovie, TbUserHexagon } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../../store/authSlice";
import useClickOutside from "../../hooks/useClickOutside";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const userRef = useRef(null);
  // Handle click outside user menu to close it
  useClickOutside(userRef, () => setShowUser(false));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (query.length > 0) {
      if (event.key === "Enter") {
        setShowSearch(false);
      }
      navigate(`/search/${query}`);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  return (
    <header
      className={`p-2 header px-5 flex justify-center items-center fixed w-full h-[60px] z-10 ${show} `}
    >
      <ContentWrapper className="p-0">
        <div className="text-white flex justify-between items-center">
          <div className="text-4xl md:text-5xl text-[#fc4747]">
            <MdMovieCreation />
          </div>
          <div>
            <ul className=" flex text-2xl md:text-3xl text-[#5a698f] gap-2">
              <li>
                <NavLink to={"/"}>
                  <TbMovie />
                </NavLink>
              </li>
              <li className="menuItem">
                <NavLink to={"/explore/movie"}>
                  <GrAppsRounded />
                </NavLink>
              </li>
              <li className="menuItem">
                <NavLink to={"/explore/tv"}>
                  <PiTelevisionFill />
                </NavLink>
              </li>

              <li>
                <NavLink to={"/bookmark"}>
                  <MdBookmarkBorder />
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex text-2xl md:text-3xl text-[#5a698f] gap-2">
              <li className="menuItem cursor-pointer">
                <HiOutlineSearch onClick={openSearch} />
              </li>
              <li className="cursor-pointer">
                <TbUserHexagon onClick={() => setShowUser(!showUser)} />
              </li>
            </ul>
          </div>
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar flex justify-between items-center  w-full h-[60px] absolute top-[60px] bg-[#161d2f]">
          <ContentWrapper>
            <div className="searchInput flex justify-between items-center px-2 text-xl">
              <div className="w-1/6 text-[#5a698f] cursor-pointer">
                <IoArrowBackSharp onClick={() => navigate(-1)} />
              </div>
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                className="bg-[#161d2f] w-5/6 text-white h-[60px] md:h-[45px] outline-0 px-2 "
                onKeyUp={searchQueryHandler}
              />
              <div className="w-1/6 text-[#5a698f] cursor-pointer">
                <VscChromeClose onClick={() => setShowSearch(false)} />
              </div>
            </div>
          </ContentWrapper>
        </div>
      )}

      {showUser && (
        <div ref={userRef} className=" text-white p-2 flex flex-col gap-2 justify-start   items-center w-[300px] h-[130px] absolute top-[60px] right-[0] bg-[#161d2f] rounded-lg">
          <button onClick={() => setShowUser(false)} className="relative left-[100px] text-xl"><TiDelete/></button>
          <div className="text-3xl">
            <FaRegUserCircle />
          </div>
          <div className="">
            <div>{userData?<div>{userData.useremail}</div>:<Link to={"/signin"} className="underline">
              Click here to login
            </Link>}
            </div>
          </div>

          <button
            className={`${userData?.useremail?"flex gap-2 bg-[#fc4747] border border-0 p-1 font-bold rounded hover:bg-red-400":"hidden" }`}
            onClick={() => {
              dispatch(signOutSuccess());
              navigate("/signin");
            }}
          >
            <span className="">
              <IoMdLogOut />
            </span>
            <span>Logout</span>
          </button>
        </div>
      )}
      <style>
        {`
      .active{
        color:white
      }
    `}
      </style>
    </header>
  );
};

export default Header;
