import { Outlet, Route, Routes } from "react-router";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import RoleCheck from "./component/RoleCheck";
import { ADMIN, ANY, STUDENT } from "./constant/Role";
import StudentProfile from "./pages/student/StudentProfile";
import Institute from "./pages/admin/Institute";
import Professional from "./pages/admin/Professional";
import Class from "./pages/admin/Class";
import Teacher from "./pages/admin/Teacher";
import Course from "./pages/admin/Course";
import Student from "./pages/admin/Student";
import Grade from "./pages/admin/Grade";
<<<<<<< HEAD
import GradeTest from "./pages/admin/GradeTest";
=======
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
import Dashboard from "./pages/admin/Dashboard";
import MyGrade from "./pages/student/MyGrade";
import GradeChart from "./pages/student/GradeChart";
import CourseSelection from "./pages/student/CourseSelection";


const RoutesConfig = () => {
  return (
    <Routes>

      <Route path="login" element={<Login></Login>}></Route>

      <Route path="/" element={
        <RoleCheck required={ANY}>

          <MainPage>
          </MainPage>
        </RoleCheck>}>
        <Route index element={
          <RoleCheck required={ADMIN}>
            <Dashboard></Dashboard>
          </RoleCheck>
        }>
        </Route>

        <Route path="dashboard" element={
          <RoleCheck required={ADMIN}>
            <Dashboard></Dashboard>
          </RoleCheck>
        }>
        </Route>

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
          <Route index element={
            <RoleCheck required={ADMIN}>
              <Professional></Professional>
            </RoleCheck>
          }>
          </Route>
          <Route path="list" element={
            <RoleCheck required={ADMIN}>
              <Professional></Professional>
            </RoleCheck>
          }>
          </Route>
          <Route path="plan" element={
            <RoleCheck required={ADMIN}>
              <Professional></Professional>
            </RoleCheck>
          }>
          </Route>
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
        <Route path="student" element={
          <RoleCheck required={ADMIN}>

            <Student></Student>

          </RoleCheck>
        }>
        </Route>
        <Route path="grade" element={
          <RoleCheck required={ADMIN}>

            <GradeTest></GradeTest>

          </RoleCheck>
        }>
        </Route>

        <Route path="student/grade" element={
          <RoleCheck required={STUDENT}>

            <MyGrade></MyGrade>

          </RoleCheck>
        }>
        </Route>

        <Route path="student/gradechart" element={
          <RoleCheck required={STUDENT}>

            <GradeChart></GradeChart>

          </RoleCheck>
        }>
        </Route>

        <Route path="student/course-selection" element={
          <RoleCheck required={STUDENT}>

            <CourseSelection></CourseSelection>

          </RoleCheck>
        }>
        </Route>





      </Route>

    </Routes >

  )
}
export default RoutesConfig
