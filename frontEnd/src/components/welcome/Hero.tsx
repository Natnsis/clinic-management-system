import { button } from "@/styles";
import { MoveUpRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-screen p-15">
      {/* Left side (text) */}
      <div className="flex justify-center p-10 bg-background text-foreground">
        <div>
          <h1 className="text-4xl mb-4 text-justified">
            <span className="font-bold">Your Health, Simplified.</span>Manage
            your medical visits, records, and care digitally and securely.
          </h1>
          <p className="text-md mb-6 text-gray-400 text-justify">
            Say goodbye to paper documents. Access your health records, receive
            realtime updates from the university clinic, and get the care you
            need without the wait.
          </p>
          <button className={`flex gap-2 ${button.primary}`}>
            Get Started <MoveUpRight />
          </button>
        </div>
      </div>

      {/* Right side (image) */}
      <div className="flex items-center justify-center ">
        <img src="/hero.png" alt="Hero" className="max-w-full h-auto" />
      </div>
    </section>
  );
};

export default Hero;
