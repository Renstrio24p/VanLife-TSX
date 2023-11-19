import { Link , useLocation, useLoaderData} from "react-router-dom"
import { ParamTypes, VanTypes } from "../types/types"
import { getVans } from "../api"

export function loader({ params }: ParamTypes){
    return getVans(params.id)
}

export default function VanDetail() {
    const location = useLocation()
    // const [van, setVan] = useState<VanTypes | null>(null)
    const van = useLoaderData() as VanTypes | null

    // useEffect(() => {
    //     fetch(`/api/vans/${params.id}`)
    //         .then(res => res.json())
    //         .then(data => setVan(data.vans))
    // }, [params.id])

    const search = location.state?.search || ''
    const types = location.state?.type || 'all'

    return (
        <div className="van-detail-container">

            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {types} vans</span></Link>

      
                <div className="van-detail">
                    <img src={van?.imageUrl} />
                    <i className={`van-type ${van?.type} selected`}>
                        {van?.type}
                    </i>
                    <h2>{van?.name}</h2>
                    <p className="van-price"><span>${van?.price}</span>/day</p>
                    <p>{van?.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
        </div>
    )
}