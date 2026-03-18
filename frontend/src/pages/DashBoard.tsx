
import { useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModel"

import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { SideBar } from "../components/Sidebar"
 export function Dashboard() {

  const [modalOpen, setModelOpen] = useState(false);
  return (

    <>
    <SideBar/>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal open={modalOpen} onClose={() => {
          setModelOpen(false);
        }} />
        <div className="flex justify-end gap-4">
          <Button onClick={() => {
            setModelOpen(true);
          }} startIcon={<PlusIcon />} variant="primary" text={"Add content"} />
          <Button startIcon={<ShareIcon />} variant="secondary" text={"Share Brain"} />
        </div>
        <div className="flex gap-4">
          <Card type="twitter" link="https://x.com/khushiirl/status/2033851811602530743" title="First tweet" />
          <Card type="youtube" link="https://www.youtube.com/watch?v=EkZlFPhMB4E" title="First video" />
        </div>
      </div>
    </>
  )
}

export default Dashboard
