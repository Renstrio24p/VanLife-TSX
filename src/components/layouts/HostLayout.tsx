import { NavLink, Outlet } from "react-router-dom";
import { CSSProperties } from "react";
import { StyleTypes } from "../types/types";

export default function HostLayout() {
    const activeStyles: StyleTypes = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const navLinkStyle = ({ isActive }: StyleTypes): CSSProperties | undefined => {
        return isActive ? activeStyles : undefined;
    };

    return (
        <>
            <nav className="host-nav">
                <NavLink 
                    to={"."}
                    end
                    style={navLinkStyle}
                >
                    Dashboard
                </NavLink>
                <NavLink 
                    to={"income"}
                    style={navLinkStyle}
                >
                    Income
                </NavLink>
                <NavLink 
                    to={"vans"}
                    style={navLinkStyle}
                >
                    Vans
                </NavLink>
                <NavLink 
                    to={"reviews"}
                    style={navLinkStyle}
                >
                    Reviews
                </NavLink>
            </nav>
            <Outlet />
        </>
    );
}
