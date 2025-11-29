

import { Image, Space, Flex, Divider } from "antd"
import { useMemo } from "react"
import styled from "styled-components"

const Lable = styled.div`
  color: hsla(0, 0%, 46%,1);
  min-width: 2rem;
`

const Value = styled.div`
  
`

const Item = ({ lable, value }) => {
  return (
    <Space style={{ flexGrow: 1, minWidth: 150 }} size={20} >
      <div style={{ width: 20 }}></div>
      <Lable>{lable}</Lable>
      <Value>{value}</Value>
    </Space>

  )


}

const ItemGroup = ({ children }) => {
  return (


    <Flex wrap='wrap' gap={4} justify='space-between'
      style={{ flexBasis: '3rem', maxWidth: 400 }}>
      {children}
    </Flex >

  )
}


// self page 
const Profile = ({ items = [{}] }) => {


  return (
    <Flex vertical align="center" gap={20} style={{ width: '100 %' }}>
      <Space style={{ marginTop: 20 }}>
        <Image width={120} height={160} ></Image>

      </Space>
      <Divider></Divider>
      <ItemGroup>
        {
          items.map((item, index) => {
            return (
              <Item lable={item.lable} value={item.value}> </Item>

            )

          })

        }

      </ItemGroup>

    </Flex >
  )

}
export default Profile
