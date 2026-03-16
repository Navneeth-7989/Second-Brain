
import { Button } from "./components/Button"

import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"
function App() {
 

  return (
    <>
    
      <Button startIcon={<PlusIcon/>} variant="primary" text={"Add content"}/>
      <Button startIcon={<ShareIcon/>} variant="secondary" text={"Share Brain"}/>
      
    </>
  )
}

export default App
