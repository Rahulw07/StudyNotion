import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { resetCourseState } from "../../../slices/courseSlice";

export default function SidebarLink({ link, iconName, onClick}) {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      onClick={() => {
        dispatch(resetCourseState());
        if (onClick) onClick();  
      }}
      className={`px-8 py-2 text-sm font-medium ${
        matchRoute(link.path) ? "text-yellow-50" : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
      <div className="flex items-center gap-x-2">
        {/* Icon */}
        <Icon className="text-lg" />
        {<span>{link.name}</span>}
      </div>
    </NavLink>
  );
}
