import React from "react"
import NavPure from "@/components/NavPure.jsx"

// 옛 import 경로 호환: 어디서 NavBase를 불러도 NavPure가 렌더됨
export function NavBase(props){ return <NavPure {...props} /> }
export default NavBase
