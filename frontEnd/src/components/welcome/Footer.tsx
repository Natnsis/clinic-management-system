import { text } from "@/styles";
import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="p-15">
      <div className="border-b-1 mb-5 flex justify-between pb-10">
        <div className="flex gap-2 items-center font-poppins">
          <img src="/logo.png" alt="logo" className="w-15" />
          <h1 className={text.heading}>HealNet</h1>
        </div>
        <div className="">
          <h1 className={text.subheading}>Navigate</h1>
          <p>
            <Link to="" className={text.link}>
              Home
            </Link>
          </p>
          <p>
            {" "}
            <Link to="" className={text.link}>
              Features
            </Link>
          </p>
          <p>
            {" "}
            <Link to="" className={text.link}>
              About
            </Link>
          </p>
          <p>
            {" "}
            <Link to="" className={text.link}>
              Contact
            </Link>
          </p>
        </div>
        <div>
          <h1 className={text.subheading}>follow us on</h1>
          <Linkedin />
          <Github />
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-center">
          &copy; 2025, All rights reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
