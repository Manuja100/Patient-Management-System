/* eslint-disable @typescript-eslint/object-curly-spacing */
import App from '../../App'
// import Profile from '../Pages/Profile'
import {createBrowserRouter} from 'react-router-dom'
import ErrorPage from '../../Pages/UserManagementPages/ErrorPage'
// import ListTabs from '../Components/ListTabs'
import Admin from '../../Pages/UserManagementPages/adminDashboard'
import Login from '../../Pages/UserManagementPages/login'
import Consultant from '../../Pages/UserManagementPages/consultant-page'
import Doctor from '../../Pages/UserManagementPages/doctor-page'
import Nurse from '../../Pages/UserManagementPages/nurse-page'
import HeadNurse from '../../Pages/UserManagementPages/head-nurse-page'
import UnauthorizedPage from '../../Pages/UserManagementPages/Unauthorized'

import ListTabs from '../../Components/ListManagement/ListTabs'
import EqListTabs from '../../Components/EquipmentManagement/ListTabs'
import {PatientProfile} from '../../Pages/PatientManagement/PatientProfile'
import AddPatient from '../../Pages/PatientManagement/AddPatient'
import DeceasedList from '../../Pages/PatientManagement/DeceasedList'

import LoginTest from '../../Pages/UserManagementPages/loginTest'
// import EqListTabs from '../../Components/EquipmentManagement/EqListTabs'

// testing
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/loginTest',
        element: <LoginTest />
      }
    ]
  },
  {
    path: '/consultant-page',
    element: <Consultant />
  },
  {
    path: '/doctor-page',
    element: <Doctor />
  },
  {
    path: '/nurse-page',
    element: <Nurse />
  },
  {
    path: '/head-nurse-page',
    element: <HeadNurse />
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />
  },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/list',
        element: <ListTabs />
      },
      {
        path: '/eqlist',
        element: <EqListTabs />
      },
      {
        path: '/patient-profile/:id',
        element: <PatientProfile />
      },

      {
        path: '/edit-patient/:id',
        element: <AddPatient />
      },

      {
        path: '/deceased-list',
        element: <DeceasedList />
      },
      {
        path: '/add-patient',
        element: <AddPatient />
      }
    ]
  }
])

export default router
