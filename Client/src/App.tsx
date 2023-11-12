/* eslint-disable @typescript-eslint/object-curly-spacing */
import {Layout} from 'antd'
import 'antd/dist/reset.css'
import {useState} from 'react'
import AppContent from './layout/AppContent'
import AppHeader from './layout/AppHeader'
// import AppSider from './layout/AppSider'
import AppFooter from './layout/AppFooter'

// authentication
// import {createContext} from 'react'

// export const UserContext = createContext()

const App = (): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  return (
    <Layout style={{minHeight: '100vh'}}>
      {/* <AppSider isCollapsed={isCollapsed} /> */}
      <Layout>
        <AppHeader
          onCollapsed={() => {
            setIsCollapsed(!isCollapsed)
          }}
        />
        <AppContent />
        <AppFooter />
      </Layout>
    </Layout>
  )
}

export default App
