import { useRoutes } from "react-router-dom"
import routes from "@/router"
import MiniPlayer from "./components/Player/MiniPlayer/MiniPlayer"
import NormalPlayer from "./components/Player/NormalPlayer/NormalPlayer"
import { useSelector } from "react-redux"
function App() {
  const {fullScreen} = useSelector(({player}:any) => {
      return {
        fullScreen:player.fullScreen
      }
  })
  return (
    <div className="App">
      {useRoutes(routes)}
      <div>
           <NormalPlayer /> 
           <MiniPlayer />
      </div>
    </div>
  )
}

export default App
