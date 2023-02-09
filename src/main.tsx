import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from "@/store/index"
import { BrowserRouter } from 'react-router-dom'
import "normalize.css"
import "@/assets/svg/iconfont.css"
import { GlobalStyle } from './style'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle/>
      <App />
    </Provider>
  </BrowserRouter>
)
