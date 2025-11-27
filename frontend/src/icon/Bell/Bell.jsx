import { Flex } from "antd"
import './Bell.css'
import { useState } from "react"

const Bell = () => {
  const [swing, setSwing] = useState(false)
  return (
    <Flex
      onMouseEnter={() => {


        setSwing(true)
      }
      }
      style={{

        cursor: 'pointer',

      }}>


      <svg onAnimationEnd={() => setSwing(false)} className={swing ? 'bell-swing' : ''} id="bell-container" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
        <g id="bell-body">
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
        </g>
        <g id="bell-clapper">
          <path d="M10.268 21a2 2 0 0 0 3.464 0" />

        </g>
      </svg>
    </Flex>
  )
}

export default Bell
