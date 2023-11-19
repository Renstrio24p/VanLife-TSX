import { Link, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import { VanTypes } from "../../types/types"
import { requireAuth } from "../../../../auth/Utils"

export async function loader() {
    await requireAuth()
    return getHostVans()
}

export default function HostVans() {
    const vans = useLoaderData() as VanTypes[]

    const hostVansEls = vans.map(van => (
        <Link
            to={`${van.id}`}
            key={`${van.id}`}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={`${van.id}`}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                <section>
                    {hostVansEls}
                </section>
            </div>
        </section>
    )
}