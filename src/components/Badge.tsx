import * as React from 'react';

import { FaCheckCircle } from "react-icons/fa";

export default function Badge(){
    return(
      <div className='bg-[#F8FAFC] flex gap-2 text-[#059669] items-center py-[2px] px-[12px] rounded-[12px] w-[80px]'>
        <FaCheckCircle color="#059669" />
        <p>Active</p>
      </div>
    )
  }
