import React from 'react'

const File = ({fileName, type, size , setPath}) => {
  return (
    <div className='flex flex-row  gap-5 hover:bg-blue-200 py-2 pl-5'>
      <div>
        
<img src={ "/assets/" + (type == "DIR" ?  'folder.png' : "file.png")} className='w-10' />
  


      </div>
<div className='w-11/12'>
 <div className='text-2xl'>{fileName}</div>
</div>

    </div>
  )
}

export default File
