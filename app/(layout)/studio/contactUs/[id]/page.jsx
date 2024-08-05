'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ContactDetails = () => {
const [data,setData] = useState([]);
const {id} = useParams();

    useEffect(() => {
        const fetchData = async()=>{
            try {
                const response = await fetch(`https://76h7esmkcf.execute-api.ap-south-1.amazonaws.com/dev/contactUs/${id}`);
                const data = await response.json();
                setData(data);
                console.log(data);
            } catch (error) {
                console.log(error)
            }      
        }

        fetchData()
    
    }, [id])
    
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[50%] h-[50%] bg-gray-200 rounded-md overflow-auto p-4'>
            <div>Name:- {data.name}</div>
            <div>Email:- {data.senderEmail}</div>
            <div>PhoneNo:- {data.phoneNumber}</div>
            <div>Message:- {data.message}</div>
        </div>
    </div>
  )
}

export default ContactDetails