'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const StudioDrawer = ({ drawerItems,selectedIndex }) => {

  const [permission,setPermissions] = useState([]);

  useEffect(() => {
    const getContactusDetail = async () => {
      try {
        const response = await fetch(
          "https://u6ul0pgf3i.execute-api.ap-south-1.amazonaws.com/dev/admin_permission/"
        );
        const data = await response.json();
        console.log('yoooooooo',data);
        setPermissions(data);
        // setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    getContactusDetail();
  }, []);

  return (
    <div className=" h-full w-full flex flex-col items-center justify-between bg-dark">
      <div className=" w-[60%] h-[10%] relative">
        <Image layout="fill" src={"/assets/kreatrLogo.svg"}  alt="image"/>
      </div>
      <div className="w-full text-light">
        {drawerItems.map((val, index) => (
          <Link key={index} href={val.path}> 
          <div
            
            className=" w-full pt-4 pb-4 flex justify-center items-center cursor-pointer hover:bg-light hover:text-dark"
            style={{
              backgroundColor: index === selectedIndex ? "#F0F0F0" : null,
              color: index === selectedIndex && "#373737",
            }}
          >
            <div className="w-[60%]">{val.title}</div>
          </div>
          </Link>
        ))}
      </div>
      <div className=" border-t border-light w-full text-center p-4 cursor-pointer text-light">LogOut</div>
    </div>
  );
};

export default StudioDrawer;