
'use client'
import { useEffect, useState } from 'react';
import StudioDrawer from '@/app/components/studioDrawer';
import { usePathname } from 'next/navigation';

const Studio = ({ children }) => {
  const drawerItems = [
    { title: "Blogs", path: "/studio/blogs",key:"studioBlogs" },
    { title: "Careers", path: "/studio/careers",key:'careers' },
    { title: "Contact Us", path: "/studio/contactUs",key:"studioContactUs"},
    { title: "Works", path: "/studio/works", key:"studioWorks" },
  ]; 
  const pathname = usePathname()
  const [selectedIndex,setSelectedIndex]= useState(-1);
  useEffect(() => {
    const index = drawerItems.findIndex(item => item.path === pathname);
    setSelectedIndex(index);
  }, [pathname]);

  return (
    <div className='relative' style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%'}}>
        <StudioDrawer drawerItems={drawerItems} selectedIndex={selectedIndex}/>
      </div>
      <div className='h-full' style={{ width: '80%',}}>
        {children === undefined ?<div className='w-full h-full flex justify-center items-center'>
          Welcome To Studio Panel
        </div>:children}
      </div>
    </div>
  );
};

export default Studio;
