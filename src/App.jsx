import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './compoments/Login'
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'
import Dashboard from './compoments/Dashboard'
import Home from './compoments/Home'
import Employee from './compoments/Employee'
import Category from './compoments/Category'
import Profile from './compoments/Profile'
import AddCategory from './compoments/AddCategory'
import AddEmployee from './compoments/AddEmployee'
import EditEmployee from './compoments/EditEmployee'
import Reports from './compoments/Reports'
import AddReport from './compoments/AddReports'
import EditReport from './compoments/EditReports'
import Directory from './compoments/Directory'
import AddDirectory from './compoments/AddDirectory'
import EditDirectory from './compoments/EditDirectory'
import Ittaxslab from './compoments/Ittaxslab'
import AddIttaxslab from './compoments/AddIttaxslab'
import EditIttaxslab from './compoments/EditIttaxslab'
import Computation from './compoments/Computation'
import Start from './compoments/Start'
import EmployeeLogin from './compoments/EmployeeLogin'
import EmployeeDetail from './compoments/EmployeeDetail'
import Supplementary from './compoments/Supplementary'
import AddSupplementary from './compoments/AddSupplementary'
import EditSupplementary from './compoments/EditSupplementary'





function App() {
 
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start/>}></Route>
        <Route path='/adminlogin' element={<Login/>}></Route>
        <Route path='/employee_login' element={<EmployeeLogin/>}></Route>
        <Route path='/employee_detail/:id' element={<EmployeeDetail/>} ></Route>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='' element={<Home/>} ></Route>
          <Route path='/dashboard/employee' element={<Employee/>} ></Route>
          <Route path='/dashboard/category' element={<Category/>} ></Route>
          <Route path='/dashboard/profile' element={<Profile/>} ></Route>
          <Route path='/dashboard/add_category' element={<AddCategory/>} ></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee/>} ></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>} ></Route>
          <Route path='/dashboard/reports' element={<Reports/>} ></Route>
          <Route path='/dashboard/add_report' element={<AddReport/>} ></Route>
          <Route path='/dashboard/edit_report/:id' element={<EditReport/>} ></Route>
          <Route path='/dashboard/directory' element={<Directory/>} ></Route>
          <Route path='/dashboard/add_directory' element={<AddDirectory/>} ></Route>
          <Route path='/dashboard/edit_directory/:id' element={<EditDirectory/>} ></Route>
          <Route path='/dashboard/it_tax_slab' element={<Ittaxslab/>} ></Route>
          <Route path='/dashboard/add_it_tax_slab' element={<AddIttaxslab/>} ></Route>
          <Route path='/dashboard/edit_it_tax_slab/:id' element={<EditIttaxslab/>} ></Route>
          <Route path='/dashboard/salary_computations' element={<Computation/>} ></Route>
          <Route path="/dashboard/supplementary-payments" element={<Supplementary/>} />
          <Route path="/dashboard/addsupplementary-payment" element={<AddSupplementary/>} />
          <Route path="/dashboard/editsupplementary-payment/:id" element={<EditSupplementary />} />

         
          



        </Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
