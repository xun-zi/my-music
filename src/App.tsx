import { useRoutes } from "react-router-dom"
import routes from "@/router"
import Player from "./components/Player"
function App() {
  
  return (
    <div className="App">
      {useRoutes(routes)}
      <Player/>
    </div>
  )
}

export default App
