import { button, text } from "@/styles";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between px-10 py-5 items-center">
      {/* fist section  */}
      <div className="flex gap-40">
        <div className="flex gap-2 items-center font-poppins">
          <img src="/logo.png" alt="logo" className="w-15" />
          <h1 className={text.heading}></h1>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/" className={text.link}>
            Home
          </Link>
          <Link to="/" className={text.link}>
            Features
          </Link>
          <Link to="/" className={text.link}>
            About Us
          </Link>
          <Link to="/" className={text.link}>
            Contact
          </Link>
        </div>
      </div>
      <div className="flex gap-3">
        <Link to="/login">
          <button className={button.primary}>Login</button>
        </Link>
        <Link to="/register">
          <button className={button.outline}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
