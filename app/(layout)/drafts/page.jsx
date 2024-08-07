'use client'

import React, { useEffect, useState } from "react";
import { getArrayFromLocalStorage } from "../../services/localStoage";
import { useRouter } from "next/navigation";

const DraftListing = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const draftData = getArrayFromLocalStorage("draft");
    console.log(draftData);
    if (draftData !== null) {
      setData(draftData);
    }
  }, []);

  return (
    <div className="w-full h-full">
      {data.length === 0 ? (
        <div>
            No Draft Available
        </div>
      ) : (
        <div className="grid w-full gap-4 h-full p-4 grid-cols-2 overflow-auto">
          {
        data.map((val, index) => {
          return <div
            key={index}
            className=" border h-[40vh] p-4 border-dark flex flex-col justify-end cursor-pointer bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage:
                val.coverImg === ""
                  ? "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  : val.coverImg,
            }}
            onClick={() => {
              router.push(`/studio/blogs/blogForm/${val.id}?type=draft`);
            }}
          >
            <p>{val.title}</p>
          </div>
        })
        }
        </div>
      )}
    </div>
  );
};

export default DraftListing;
