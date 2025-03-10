import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const Cards = {
    upcoming: [
        { title: 'Prepare project plan', category: 'Planning', date: '24 Feb 2020' },
        { title: 'Prepare next project plan', category: 'New Planning', date: '24 Feb 2025' },
        { title: 'Prepare next project plan', category: 'New Planning', date: '24 Feb 2025' }
    ],
    overdue: [
        { title: 'Current planning', category: 'Plan A', date: '24 Feb 2025' },
        { title: 'Currently a new project', category: 'New Planning', date: '24 Feb 2025' }
    ],
    completed: [
        { title: 'I have completed', category: 'Plans', date: '20 Feb 2020' },
        { title: 'Your task is completed', category: 'New Planning', date: '24 Feb 2016' },
        { title: 'I have completed', category: 'Plans', date: '20 Feb 2020' },
        { title: 'Your task is completed', category: 'New Planning', date: '24 Feb 2016' }
    ]
};

function Home() {
    
    const [active, setActive] = useState("upcoming");
    const [showCalendar, setShowCalendar] = useState(null);

    const today = new Date();
    const day = today.toLocaleDateString("en-US", { weekday: 'long' });
    const date = today.toLocaleDateString("en-US", { month: 'long', day: 'numeric' });
    
    const [selectdate, setselectdate] = useState(new Date());

    const newdate=(date, index)=>{
        setselectdate(date);
        const updatecard = {...Cards};
        updatecard[active][index].date = date.toLocaleDateString("en-GB");
        setShowCalendar(null);
    }
    const [dot, setdot] = useState(false);
    return (
        <div className="text-gray-700">
            <div className="mt-6 ml-4">
                <span className="text-xl font-semibold">Home</span>
            </div>
            <div className='mt-10 flex flex-col items-center'>
                <div className="text-lg font-semibold p-0">
                    {day}, {date}
                </div>
                <div className='text-center'>
                    <p className="text-[32px]">Good afternoon, Amir</p>
                </div>
                <div className="border border-gray-600 rounded-lg sm:rounded-full flex flex-wrap justify-center items-center sm:px-5 sm:py-2 px-4 py-3 gap-x-5 gap-y-2">
                <div className="flex flex-col items-center sm:flex-row sm:space-x-5">
                    <div className="hover:bg-gray-300 py-1 px-3 rounded-md">
                        <select className="bg-transparent  outline-none">
                            <option value="My week">My week</option>
                            <option value="My Month">My month</option>
                        </select>
                    </div>
                    <div className="w-full h-[1px] bg-gray-500 sm:h-8 sm:w-[1px] hidden sm:block"></div>
                </div>
                <div className="flex items-center">
                    <i className="fa-solid fa-check text-sm"></i>
                    <p className="mx-2 text-xl font-semibold">{Cards["completed"].length}</p>
                    <p>tasks completed</p>
                </div>
                <div className="flex items-center">
                    <i className="fa-solid fa-user-group"></i>
                    <p className="mx-2 text-xl font-semibold">{0}</p>
                    <p>collaborators</p>
                </div>
            </div>

            </div>
            <div className='justify-between grid grid-cols-1 min-[1200px]:grid-cols-2 min-[1350px]:mx-16 2xl:mx-24 min-[1200px]:mx-2 gap-x-5'>
                <div className=" flex flex-col items-center text-[12px] my-6">
                    <div className=" w-full border border-gray-500 mx-2 rounded-lg hover:border-[#aaaaaa] px-8 py-5 space-y-2 h-96">
                            <div className="flex space-x-4 items-center">
                                <div className="outline-dotted outline-[2px] border-white w-12 h-12 rounded-full flex items-center justify-center">AJ</div>
                                <div><p className="text-[20px] font-semibold">My Tasks</p></div>
                                <i className="fa-solid fa-lock text-[#A2A0A2]"></i>
                            </div>
                            <div className="flex space-x-5 text-[14px] font-semibold ml-16">
                                {Object.keys(Cards).map((key) => (
                                    <div 
                                        key={key}
                                        onClick={() => {setActive(key); setShowCalendar(null) }} 
                                        className={`cursor-pointer pb-3 ${active === key ? 'text-white border-b-2 border-white' : 'hover:text-gray-800 hover:border-b-2'}`}
                                    >
                                        {key.charAt(0).toUpperCase() + key.slice(1)} ({Cards[key].length}) 
                                    </div>      
                                ))}
                            </div>
                            <div className="py-5">
                                {Cards[active].length > 0 ? (
                                    Cards[active].map((card, index) => (
                                        <div key={index} className="border-t-[2px] py-2 border-gray-500 flex justify-between">
                                            <div className="flex items-center">
                                                <input type="checkbox" />
                                                <span className="text-[14px] mx-2">{card.title}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="px-3 py-1 bg-[#9EE7E3] hover:bg-[#85c5c2] text-black rounded-md cursor-pointer mx-3">
                                                    {card.category}
                                                </span>
                                                <div className=''>
                                                    <span onClick={() => setShowCalendar(showCalendar === index  ? null : index)} className="text-red-500 cursor-pointer">
                                                        {card.date}
                                                    </span>
                                                    {showCalendar === index  && <div className='fixed mt-2 drop-shadow-[0_2px_8px_rgba(255,255,255,0.05)]'> <p><Calendar onChange={(date)=>{newdate(date, index)}} value={selectdate} className=''/></p></div>}
                                                    

                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No tasks available</p>
                                )}
                            </div>
                    </div>
                   
                </div>
                <div className=' flex flex-col items-center my-6'>
                    <div className=' w-full border border-gray-500 mx-2 rounded-lg hover:border-[#aaaaaa] space-y-2 h-96'>
                            <div className='flex justify-between px-7 py-5'>
                                <div className='cursor-pointer text-xl font-bold'>Projects</div>
                                <div onClick={()=>{setdot(!dot)}}><i class="fa-solid fa-ellipsis px-1"></i>
                                {dot &&
                                    <div className='fixed'><a href="/new-project" className=' text-sm bg-gray-500 px-3 py-1 hover:bg-[#565557] hover:outline hover:outline-[2px] hover:outline-white cursor-pointer'><i class="fa-solid fa-plus "></i> New Project</a></div>
                                }
                                </div>
                            </div>
                            <div>
                                <div className='px-8 py-5'>
                                    <div >
                                        <a href="/new-project" className=''>
                                            <span className='px-6 border-dotted border-[1px] py-5 rounded-2xl cursor-pointer'><i className='fa-solid fa-plus'></i></span>
                                            <span className=' font-bold text-[16px] ml-4'>Create Project</span>
                                        </a>
                                    </div>
                                    <div>
                                        <span>

                                        </span>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
