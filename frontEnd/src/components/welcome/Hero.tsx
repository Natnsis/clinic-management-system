import { button, text } from "@/styles";
import { Activity, Ambulance, Clock7, MoveUpRight } from "lucide-react";

const Hero = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 h-screen p-15">
        {/* Left side (text) */}
        <div className="flex justify-center p-10 bg-background text-foreground">
          <div>
            <h1 className="text-4xl mb-4 text-justified">
              <span className="font-bold">Your Health, Simplified.</span>Manage
              your medical visits, records, and care digitally and securely.
            </h1>
            <p className="text-md mb-6 text-gray-400 text-justify">
              Say goodbye to paper documents. Access your health records,
              receive realtime updates from the university clinic, and get the
              care you need without the wait.
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

      <section className="mt-20 p-15 w-full ">
        <h1 className={text.heading}>Experience the difference</h1>
        <div className="px-10 flex justify-between mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 rounded-lg shadow bg-muted">
              <Clock7 className="w-10 h-10 text-primary mb-4" />
              <h1 className="text-xl font-semibold mb-2">Time Saving</h1>
              <p className="text-sm text-muted-foreground">
                No more waiting in long lines or searching for lost paper cards.
                Everything is digital and fast.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg shadow bg-muted">
              <Activity className="w-10 h-10 text-primary mb-4" />
              <h1 className="text-xl font-semibold mb-2">
                Live Record Updates
              </h1>
              <p className="text-sm text-muted-foreground">
                Every clinic visit is logged and updated in real-time so your
                records are always up-to-date.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg shadow bg-muted">
              <Ambulance className="w-10 h-10 text-primary mb-4" />
              <h1 className="text-xl font-semibold mb-2">Faster Response</h1>
              <p className="text-sm text-muted-foreground">
                Get notified about your appointments, treatment progress, and
                medication reminders instantly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
