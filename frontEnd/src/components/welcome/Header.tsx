import { button } from "@/styles";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="text-secondary">
      {" "}
      HealNet
      <Button className={button.primary}>hehe</Button>
      <h1 className="text-3xl font-bold font-sans">This uses Inter</h1>
      <p className="font-poppins">This uses Poppins</p>
    </div>
  );
};

export default Header;
