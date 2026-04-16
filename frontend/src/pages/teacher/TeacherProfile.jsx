import { useEffect, useState } from "react"
import Profile from "../../pages/Profile.jsx"

const TeacherProfile = () => {
  const [items, setItems] = useState()

  useEffect(() => {

    setItems([{ lable: '%%%', value: '111' }])
  }, [items])

  return (
    <Profile items={items}>

    </Profile>

  )
}

export default TeacherProfile

