import React from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Clean 404 */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </div>

        {/* Main content */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a
            different location.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-base px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Home className="h-5 w-5 mr-2" />
            Return Home
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white text-base px-8 py-6 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-20 left-10 w-1 h-16 bg-gradient-to-b from-blue-400 to-transparent opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-1 h-16 bg-gradient-to-t from-cyan-400 to-transparent opacity-50"></div>
        <div className="absolute top-1/2 left-5 w-px h-20 bg-gradient-to-b from-transparent to-blue-400 opacity-30"></div>
      </div>
    </div>
  );
};

export default NotFound;
