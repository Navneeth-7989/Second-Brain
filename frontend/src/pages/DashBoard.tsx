
import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModel"

import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { SideBar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"

 export function Dashboard() {

  const [modalOpen, setModelOpen] = useState(false);
  const {contents, refresh} = useContent();

  useEffect(()=>{
    refresh();
  },[modalOpen])
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
        <div className="flex gap-4 flex-wrap">
          {contents.map(({type, link, title}) => <Card
        type={type}
        link={link}
        title={title}
      />)}
        </div>
      </div>
    </>
  )
}

export default Dashboard
