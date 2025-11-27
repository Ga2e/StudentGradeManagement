import { useEffect, useState } from "react"
import Profile from "../../component/Profile"


const StudentProfile = () => {
  const [items, setItems] = useState()

  useEffect(() => {

    setItems([{ lable: '%%%', value: '111' }])
  }, [])

  return (
    <Profile items={items}>

    </Profile>

  )
}

export default StudentProfile
