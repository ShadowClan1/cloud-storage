import React, { useEffect, useState } from 'react'
import File from '../Small Components/File'
import { getDirContent } from '../../api/api'

const Body = () => {
  const [content, setcontent] = useState([])
  const baseDir = [{name : "..", type : 'DIR'}]
  const [path, setPath] = useState("")
useEffect(()=>{
  console.log(path)
dirContent(path)
}, [path])

const dirContent = async (path)=>{
 const data = await  getDirContent(path)
 console.log(data)
 if(data.status == true) {
  console.log(data.data)
  setcontent(baseDir.concat(data.data))
 }
}
const setPathFun = (path) =>{
//  setPath(prev=>prev + "/" + path)
 if(path != "..")setPath(prev=>prev + "/" + path)
 else {
  setPath(prev=> {const arr = prev.split("/")
  arr.pop()
  return arr.join("/")
 })
 }

}

  return (
    <div className='flex flex-col'>
      { content.map(e=>{
        
        return (
          <div onClick={()=>{setPathFun(e.name)}}>
        <File  type={e.type} fileName={e.name}  />
            </div>
        
        )
      })

      }



    </div>
  )
}

export default Body
