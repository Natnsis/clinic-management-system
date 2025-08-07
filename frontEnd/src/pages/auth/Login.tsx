import { button, card, input, text } from "@/styles";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className={`space-y-3  px-10 ${card.withBorder}`}>
        <div className="flex justify-center">
          <img src="logo.png" alt="logo" className="w-15" />
        </div>
        <div>
          <h1 className={`text-center ${text.heading}`}>Welcome Back</h1>
          <p className="text-gray-400">
            Don't have an account yet?{" "}
            <Link className="text-primary" to="/register">
              register
            </Link>
          </p>
        </div>
        <div>
          <p className={text.label}>enter email</p>
          <input
            name="email"
            type="email"
            className={input.base}
            placeholder="example@gmail.com"
          />
        </div>
        <div>
          <p className={text.label}>enter password</p>
          <input
            type="password"
            className={input.base}
            placeholder="Asu12***"
          />
        </div>
        <div className="flex justify-center">
          <button className={button.primary}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
