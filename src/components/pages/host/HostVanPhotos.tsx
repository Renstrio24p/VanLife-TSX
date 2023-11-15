import { useOutletContext } from "react-router-dom"
import { ContextType } from "../../types/types"

export default function HostVanPhotos() {

  const { currentVan } = useOutletContext<ContextType>()

  return (
    <div>
      <img src={currentVan?.imageUrl} className="host-van-detail-image" />
    </div>
  )
}