import { useRef, useState, useEffect } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../Common/ConfirmationModal";
import SidebarLink from "./SidebarLink";
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarRightExpand } from "react-icons/tb";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 1024);  
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => {
    if (window.innerWidth >= 1024){
      setShowSidebar(true);
    }
  });

  const handleLinkClick = () => {
    if (window.innerWidth >= 1024){
      setShowSidebar(true);
    }
  };
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(true);  
      } else {
        setShowSidebar(false);  
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="absolute h-full">
      <div className="cursor-pointer p-2 fixed top-16 left-0 z-40" onClick={() => setShowSidebar(!showSidebar)}>
        {showSidebar ? (
          <div className="flex items-center gap-2">
            <TbLayoutSidebarRightExpand size={28} className="text-white" />
            <span className="text-white font-semibold">Menu</span>
          </div>
        ) : (
          <TbLayoutSidebarRightCollapse size={28} className="text-white" />
        )}
      </div>

      <div
       className={`fixed left-0 h-full bg-richblack-800 transition-all duration-500 ease-in-out ${
        showSidebar ? "translate-x-0 w-64" : "-translate-x-full w-0"
        } overflow-hidden lg:relative md:relative lg:w-40 md:w-40`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto p-4 py-12">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink
                  key={link.id}
                  link={link}
                  iconName={link.icon}
                  onClick={handleLinkClick}  
                />
              );
            })}
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
              onClick={handleLinkClick}
            />
            <div className="py-2">
              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out of your account.",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className="w-full py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700 rounded"
              >
                <div className="flex items-center gap-x-2">
                  <VscSignOut className="text-lg" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
