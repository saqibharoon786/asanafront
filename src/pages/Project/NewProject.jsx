import React from 'react'
import { Navigate, useNavigate} from 'react-router-dom'

function NewProject() {

const navigate=useNavigate();
  return (
    <div className='bg-[#1E1F21] h-screen text-white'>
        <div className='flex justify-between fixed w-full'>
            <div onClick={() => navigate('/')} className='cursor-pointer ml-10 pt-6 text-[#A09EA0]'>
                <i className="fa-solid fa-arrow-left p-1"></i>
            </div>
            <div onClick={() => navigate('/Layout')} className='cursor-pointer mr-10 pt-6 text-[#A09EA0]'>
                <i className="fa-solid fa-xmark hover:bg-red-400 p-1"></i>
            </div>
        </div>
        <div className='h-screen flex flex-col justify-center items-center'>
            <div><p className='text-[32px] cursor-default'>Create a new project</p></div>
            <div><p className='text-[20px] cursor-default'>How would you like to start?</p></div>
            <div className='mt-12 flex  '>
                <div onClick={()=>navigate('/project-form')} className='cursor-pointer flex flex-col justify-center space-y-2 hover:bg-[#2B2C2E] pt-8 pb-12 px-5 rounded-[30px] transition-all delay-600 ease-in-out translate-y-0 hover:-translate-y-2'>
                    <div className='w-full flex justify-center'>
                        <div className='border-dotted border-2 border--[#424244] px-10 w-28 h-28 flex justify-center items-center rounded-xl'>
                            <p><i class="fa-solid fa-plus text-3xl text-[#A2A0A2]"></i></p>
                        </div>
                    </div>
                    <div className='flex-col flex text-center'>
                        <span className='font-bold text-[14px]'>Blank Project</span>
                        <span className='text-sm text-[13px] text-[#999799]'>Start from scratch</span>
                    </div>
                </div>
                <div className='cursor-pointer flex flex-col justify-center  space-y-2 hover:bg-[#2B2C2E] pt-8 pb-12 px-5 rounded-[30px] transition-all delay-600 ease-in-out translate-y-0 hover:-translate-y-2'>
                    <div className='w-full flex justify-center'>
                        <div className='border-solid  border-2 border-[#424244] px-10 w-28 h-28 flex justify-center items-center rounded-xl'>
                            <p><i class="fa-regular fa-file-lines text-3xl"></i></p>
                        </div>
                    </div>
                    <div className='flex-col flex text-center'>
                        <span className='font-bold text-[14px] '>Use a template</span>
                        <span className='text-sm text-[13px] text-[#999799]'>Choose from library</span>
                    </div>
                </div>
                <div className='cursor-pointer flex flex-col space-y-2 hover:bg-[#2B2C2E] pt-8 pb-12 px-5 rounded-[30px] transition-all delay-600 ease-in-out translate-y-0 hover:-translate-y-2'>
                    <div className='w-full flex justify-center'>
                        <div className='border-solid border-2 border-[#424244] px-10 w-28 h-28 flex justify-center items-center rounded-xl '>
                        <p><i class="fa-regular fa-file-excel text-4xl"></i></p>
                    </div>
                    </div>
                    
                    <div className='flex-col flex text-center'>
                        <span className='font-bold text-[14px] '>Import spreadsheet</span>
                        <span className='text-sm text-[13px] text-[#999799]'>Add from another tool</span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default NewProject