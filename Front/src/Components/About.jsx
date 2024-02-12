import React from 'react'

export default function About() {
  return (
    <div className='bg-green-300 w-full  py-[60px]'>
         <div className='max-w-[1240px] p-[40px] my-[50] mx-auto md:flex justify-between text-center'>

            <div className=' md:w-[50%]'>
                <h1 className='text-[20px] md:text-[40px] font-bold text-white'>About Us</h1>
                <samp className='text-black inline'>
                     Hamro Futsal is a fast-paced and exciting indoor version of football (soccer) that is played on a smaller field. The game originated in Uruguay in the 1930s and has since gained popularity worldwide. Futsal is recognized as the official indoor football format by FIFA and is governed by the Futsal International Federation
                </samp>
            </div>
            <div className=' '>
                <input type="text" className=' m-3 p-3 md:w-full text-xl/6 rounded text-slate-600  mr-2'placeholder="Write Your reviews" />
                <button className=' bg-black text-white p-3 m-2 hover:bg-white hover:text-black rounded '>
        Send Reviews

      </button>
      <br/>
      <p className='mt-4'>
        We care about the protection of your data
      </p>
            </div>
         </div>
      
    </div>
  )
}
