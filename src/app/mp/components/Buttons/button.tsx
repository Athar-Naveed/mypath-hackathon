"use client";
import {Tooltip} from "@mui/material";
const Button = ({title, icon}: {title: string; icon: any}) => {
  const handleButton = () => {
    // switch (title) {
    //   case "New Chat":
    //     window.location.href = "mp/chatbot";
    //     break;
    //   default:
    //     return;
    // }
  };
  return (
    <>
      <Tooltip title={title} arrow={true} placement="bottom">
        <button onClick={handleButton}>
          <div className="text-dark-custom-dark-blue dark:text-white">{icon}</div>
        </button>
      </Tooltip>
    </>
  );
};

export default Button;
