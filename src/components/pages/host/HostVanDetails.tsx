import { CSSProperties, useEffect, useState } from "react"
import { useParams, Link, Outlet } from "react-router-dom"
import { StyleTypes, VanTypes } from "../../types/types"
import { NavLink } from "react-router-dom"

export default function HostVanDetail() {
    const { id } = useParams()
    const [currentVan, setCurrentVan] = useState<VanTypes | null>(null)

    const activeStyles: StyleTypes = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const navLinkStyle = ({ isActive }: StyleTypes): CSSProperties | undefined => {
        return isActive ? activeStyles : undefined;
    };

    type ContextType = { currentVan: VanTypes | null };

    useEffect(() => {
        fetch(`/api/host/vans/${id}`)
            .then(res => res.json())
            .then(data => setCurrentVan(data.vans))
    }, [])

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
