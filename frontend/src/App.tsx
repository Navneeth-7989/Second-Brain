
import { Button } from "./components/Button"
import { Card } from "./components/Card"

import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"
function App() {


  return (
    <>

      <Button startIcon={<PlusIcon />} variant="primary" text={"Add content"} />
      <Button startIcon={<ShareIcon />} variant="secondary" text={"Share Brain"} />
      <div className="flex gap-4">
        <Card type="twitter" link="https://x.com/khushiirl/status/2033851811602530743" title="First tweet" />
        <Card type="youtube" link="https://www.youtube.com/watch?v=EkZlFPhMB4E" title="First video" />
      </div>
    </>
  )
}

export default App
