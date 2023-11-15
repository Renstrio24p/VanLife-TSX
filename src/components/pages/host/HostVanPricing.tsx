import { useOutletContext } from "react-router-dom"
import { ContextType } from "../../types/types"

export default function HostVanPricing() {

  const { currentVan } = useOutletContext<ContextType>()

  return (
    <div>
        <h3 className="host-van-price">${currentVan?.price}<span>/day</span></h3>
    </div>
  )
}