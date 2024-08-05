"use client";
import { useEffect, useState } from "react";
import Studio from "../page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes,faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { DeleteConfirmation } from "../../../components/deleteButton";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [api, setApi] = useState("");
  const [trigger, setTrigger] = useState("");
  const path = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://76h7esmkcf.execute-api.ap-south-1.amazonaws.com/dev/contactUs`
        );
        const data = await response.json();
        setContacts(data || []);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [trigger]);

  return (
    <Studio>
      {loading === false ? (
        contacts.length !== 0 ? (
          <div className="w-full h-full flex flex-col justify-between p-4 ">
            <div className=" grid grid-cols-2 gap-4 mb-4 overflow-auto">
              {contacts.map((val, index) => (
                <div
                  key={index}
                  className="border border-dark w-full p-2 h-full rounded-lg"
                >
                  <div className="h-[3.5vw] flex justify-end">
                    <div
                      className="w-[3.5vw] h-full flex items-center justify-center cursor-pointer bg-white bg-opacity-[50%] p-2 rounded-[50%] "
                      onClick={() => {
                        setApi(
                          `https://76h7esmkcf.execute-api.ap-south-1.amazonaws.com/dev/contactUs/${val.id}`
                        );
                        setIsDeleting(true);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="h-full w-full text-gray-500"
                      />
                    </div>
                  </div>
                  <h1 className="font-bold p-1">{val.name}</h1>
                  <h2 className="p-1 flex gap-2 items-center"><img src="/assets/mail.png" alt="mailimg" className="w-[5%] h-[5%]" />{val.senderEmail}</h2>
                  <p className="p-1 flex gap-2 items-center"><img src="/assets/phone.png" alt="phonenumber" className="w-[5%] h-[5%]" />{val.phoneNumber}</p>
                  <div className="w-full flex justify-end pr-4 pb-4">
                      <Link key={index} href={`${path}/${val.id}`}>
                        <div className="w-full flex justify-end items-end">
                          <FontAwesomeIcon icon={faArrowRight} className="" />
                        </div>
                      </Link>
                    </div>
                </div>
              ))}
            </div>
            {isDeleting === true && (
              <DeleteConfirmation
                api={api}
                setDeleteConfirmation={setIsDeleting}
                setTrigger={setTrigger}
              />
            )}
          </div>
        ) : (
          <div className=" text-[26px] w-full h-full flex justify-center items-center">
            {" "}
            No Data Available
          </div>
        )
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          Loading...
        </div>
      )}
    </Studio>
  );
};

export default ContactUs;
