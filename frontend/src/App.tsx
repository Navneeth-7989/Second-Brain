import { Button } from "./components/ui/Button"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"




function App() {


  return (
    <>
   <Button vairant="primary" endIcon={<ShareIcon size={"lg"}/>} startIcon={<PlusIcon size={"lg"}/>} size="sm" title="Share"/>
   <Button vairant="secondary" endIcon={<ShareIcon size={"lg"}/>} startIcon={<PlusIcon size={"lg"}/>} size="sm" title="Share"/>
   
    </>
  )
}

export default App
