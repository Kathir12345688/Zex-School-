import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const AdminLayout = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handler = () => setSidebarOpen(false)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div className="admin-layout">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-layout__content">
        <Navbar title={title} onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <main className="admin-main">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
