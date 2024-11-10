import { Outlet } from "react-router-dom"
import Header from "./components/Header"

function App() {
  return (
    <div className="bg-gray-100 min-h-screen min-w-screen space-y-4">
      <Header />
      <main className="flex flex-1 flex-col m-[20%]">
        <Outlet />
      </main>
    </div>
  )
}

export default App