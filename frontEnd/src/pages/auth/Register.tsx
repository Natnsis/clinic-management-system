import { button, card, checkbox, input, text } from "@/styles";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className={`space-y-3 px-10 ${card.withBorder}`}>
        <div className="flex justify-center">
          <img src="logo.png" alt="logo" className="w-15" />
        </div>
        <div>
          <h1 className={`text-center ${text.heading}`}>Welcome</h1>
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link className="text-primary" to="/login">
              login
            </Link>
          </p>
        </div>
        <div>
          <p className={text.label}>Full Name</p>
          <input type="text" className={input.base} placeholder="john doe" />
        </div>
        <div>
          <p className={text.label}>Email</p>
          <input
            type="email"
            className={input.base}
            placeholder="example@gmail.com"
          />
        </div>{" "}
        <div>
          <p className={text.label}>Password</p>
          <input
            type="password"
            className={input.base}
            placeholder="123*****"
          />
        </div>{" "}
        <div>
          <p className={text.label}>Identification</p>
          <input type="text" className={input.base} placeholder="Ru1234/12" />
        </div>
        <div className="flex gap-5">
          <p className={text.label}>Gender</p>
          <input
            type="radio"
            name="gender"
            className={checkbox}
            placeholder=""
          />
          Male
          <input
            type="radio"
            name="gender"
            className={checkbox}
            placeholder=""
          />
          Female
        </div>{" "}
        <div>
          <p className={text.label}>Department</p>
          <input
            type="text"
            className={input.base}
            placeholder="Computer Science"
          />
        </div>
        <div className="flex justify-center">
          <button className={button.primary}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
