"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlogDetail = () => {
  const param = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fatchData = async () => {
      const response = await fetch(
        `https://7nfhxqula3.execute-api.ap-south-1.amazonaws.com/dev/studioBlogs/${param.id}`
      );
      const data = await response.json();
      setData(data.data);
      console.log(data.data);
    };
    fatchData();
  }, []);
  return (
    <div className="bg-light p-4 w-full min-h-full flex justify-center items-center">
      <div className="h-full w-[40%]">
        <div className="firstImage">
          <img src={data.coverImg} alt="coverImg" />
        </div>
        <div className="blogHeading">{data.title}</div>
        <div className="flex">
          <div>{data.date}</div>
          <div>{data.writer}</div>
        </div>

        <div>
          
          {data.blogsDetails!== undefined &&
            data.blogsDetails.map((val, index) =>
              val.tagType !== "images" ? (
                <div key={index} className={`${val.class} whitespace-pre-line`}>
                  {val.value}
                </div>
              ) :(
                <img key={index} className={`${val.class}`} src={val.value} alt="imggg" />
              )
            )}
            <div className="font-bold h-full">
              Suggestions
              <div className="flex flex-col gap-4 h-full pt-4">
              {data.suggestions!== undefined && data.suggestions.map((val,index)=>(
                <div className="bg-center bg-cover bg-no-repeat w-full h-[40vh] flex items-end" style={{backgroundImage:`url(${val.coverImg})`}}>
                  <div className="bg-light bg-opacity-[50%] p-4">
                    {val.title}
                  </div>
                </div>
              ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
  
};

export default BlogDetail;
