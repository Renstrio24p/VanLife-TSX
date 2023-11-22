import { CSSProperties } from "react"
import { Link, Outlet, useLoaderData, NavLink} from "react-router-dom"
import { ContextType, ParamTypes, StyleTypes, VanTypes } from "../../../types/types"
import { getVan } from "../../api"
import { requireAuth } from "../../../../auth/Utils"

export async function loader({ params,request }: ParamTypes){
    await requireAuth({request})
    return getVan(params.id!)
}

export default function HostVanDetail() {
    const currentVan = useLoaderData() as VanTypes

    const activeStyles: StyleTypes = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const navLinkStyle = ({ isActive }: StyleTypes): CSSProperties | undefined => {
        return isActive ? activeStyles : undefined;
    };


    if (!currentVan) {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${currentVan.type}`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>

                <nav className="host-van-detail-nav">
                    <NavLink 
                        to={'.'}
                        end
                        style={navLinkStyle}>Details</NavLink>
                    <NavLink 
                        to={'pricing'}
                        style={navLinkStyle}>Pricing</NavLink>
                    <NavLink 
                        to={'photos'}
                        style={navLinkStyle}>Photo</NavLink>
                </nav>

                <Outlet context={{currentVan} satisfies ContextType} />
            </div>
        </section>
    )
}
