import { baseUrl } from "@/utils/constants";
import axios from "axios";
import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface ComponentProps {
  onClose: () => void;
}

const InviteUser: React.FC<ComponentProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleInvite = async () => {
    if (!email && !name) {
      toast.error("Please provide a name and email address");
      return;
    }

    const retreiveToken = sessionStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${baseUrl}/admin/invite-admin`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${retreiveToken}`,
          },
        }
      );
      toast.success("User invited successfully");
      setEmail("");
      setName("");
      onClose();
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="bg-[#F5FAFF] p-2 rounded-full w-fit">
          <div className="bg-[#E6EFFA] p-2 rounded-full w-fit">
            <GoPerson size={20} color="#2390FA" />
          </div>
        </div>
        <h1 className="text-[20px] font-[600]">Invite Team Member</h1>
      </div>
      <form className="space-y-5 mt-5 flex flex-col px-[4rem]">
        <div className="space-y-2">
          <label className="text-[16px] font-[500]">Full Name</label>
          <div className="flex gap-2 items-center border border-[#D0D5DD] rounded-[6px] p-4 ">
            <GoPerson size={20} color="#667185" />
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full outline-none "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[16px] font-[500]">Email</label>
          <div className="flex gap-2 items-center border border-[#D0D5DD] rounded-[6px] p-4">
            <IoMailOutline size={20} color="#667185" />
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full outline-none "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className="px-[4rem] flex gap-5 mt-[4rem]">
        <button
          className="w-full border border-[#60269E] text-[#60269E] text-[16px] font-[700] h-[55px] rounded-[8px]"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className={`w-full bg-[#60269E] text-white text-[16px] font-[700] h-[55px] rounded-[8px] ${
            isLoading ? "opacity-50" : ""
          }`}
          onClick={handleInvite}
          disabled={isLoading}
        >
          Invite Member
        </button>
      </div>
    </div>
  );
};

export default InviteUser;
