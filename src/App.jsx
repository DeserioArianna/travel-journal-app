import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Post from './Post'
import Posts from './Posts'

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/posts/:id' element={<Post />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
