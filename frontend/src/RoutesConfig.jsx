import { Outlet, Route, Routes } from "react-router";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import RoleCheck from "./component/RoleCheck";
import { ADMIN, ANY, STUDENT } from "./constant/Role";
import StudentProfile from "./pages/student/StudentProfile";
import Institute from "./pages/admin/Institute";
import Professional from "./pages/admin/Professional";
import Class from "./pages/admin/Class";
import CoursePage from "./pages/admin/Course";
import Teacher from "./pages/admin/Teacher";
import Course from "./pages/admin/Course";


const RoutesConfig = () => {
  return (
    <Routes>

      <Route path="login" element={<Login></Login>}></Route>

      <Route path="/" element={
        <RoleCheck required={ANY}>

          <MainPage>
            <Outlet></Outlet>
          </MainPage>
        </RoleCheck>}>

        <Route path="studentProfile" element={
          <RoleCheck required={STUDENT}>
            <StudentProfile></StudentProfile>
          </RoleCheck>
        }>
        </Route>


        <Route path="institute" element={
          <RoleCheck required={ADMIN}>

            <Institute></Institute>

          </RoleCheck>
        }>
        </Route>
        <Route path="professional" element={
          <RoleCheck required={ADMIN}>

            <Professional></Professional>

          </RoleCheck>
        }>
        </Route>
        <Route path="class" element={
          <RoleCheck required={ADMIN}>

            <Class></Class>

          </RoleCheck>
        }>
        </Route>
        <Route path="course" element={
          <RoleCheck required={ADMIN}>

            <Course></Course>

          </RoleCheck>
        }>
        </Route>
        <Route path="teacher" element={
          <RoleCheck required={ADMIN}>

            <Teacher></Teacher>

          </RoleCheck>
        }>
        </Route>




      </Route>

    </Routes >

  )
}
export default RoutesConfig
