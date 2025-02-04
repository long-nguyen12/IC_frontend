import React, { useState } from 'react';
import {  Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const Optionfill = (props) => {
  console.log("props",props)
  const [open, setOpen] = useState(false);
  // const hide = () => {
  //   setOpen(false);
  // };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const options = props.option
  const content = (
    <div>
    {
      props.option ?
        options.map((item, index) => (
          <p key={index}>{item.userName}</p>
        ))
      :""
    }
  </div>
  )
     
         
      
    
     
   
  

  


  return (
    <Popover
    
      title = { props.title }
      content={content}
      trigger="click"
      open={open}
      placement="bottomLeft"
      onOpenChange={handleOpenChange}
    >
    <div className='container-item cursor-pointer'>
      <span>{ props.title }</span>
      {
        props.icon? <DownOutlined style={{ fontSize: '12px', marginLeft: '6px'}}/> : ""
      }
    </div>
    </Popover>
  );
};

export default Optionfill;