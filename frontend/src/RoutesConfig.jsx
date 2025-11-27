import { Outlet, Route, Routes } from "react-router";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import RoleCheck from "./component/RoleCheck";
import { ANY, STUDENT } from "./constant/Role";
import Profile from "./component/Profile";
import StudentProfile from "./pages/student/StudentProfile";


const RoutesConfig = () => {
  return (
    <Routes>

      <Route path="login" element={<Login></Login>}></Route>
      <Route path="/" element={
        <RoleCheck required={ANY}>
          <Outlet />
        </RoleCheck>
      }>


        <Route path="main" element={
          <RoleCheck required={STUDENT}>
            <MainPage>
              <Outlet></Outlet>

            </MainPage>
          </RoleCheck>
        }>

          <Route path="profile" element={<StudentProfile></StudentProfile>}>
          </Route>


        </Route>




      </Route>
    </Routes>

  )
}
export default RoutesConfig
