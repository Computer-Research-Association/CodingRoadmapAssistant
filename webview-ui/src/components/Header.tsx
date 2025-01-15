import "../styles/Header.css";
import { AiOutlineClear } from "react-icons/ai";
import { RiHistoryFill } from "react-icons/ri";

function Header() {
  return (
    <>
      <div className="header flex">
        <div className="title">Chat with CRA</div>
        <div className="icon flex">
          <div className="icon-clear">
            <AiOutlineClear />
          </div>
          <div className="icon-history">
            <RiHistoryFill />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
