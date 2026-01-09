import { SubscriptionForm } from "@/components/SubscriptionForm";
import { PreviewCard } from "@/components/PreviewCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-yellow-500 to-orange-500 rounded-full"></div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Sunrise Manna
            </h2>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Start Your Day <br />
            Spiritually <br />
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Charged</span>
          </h1>

          <p className="text-xl text-gray-400">
            Every morning, receive a phone call with the day’s devotional rooted in kingdom wisdom and spiritual awakening.
          </p>

          <SubscriptionForm />

          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Join others supercharging their day with Word!
            </p>

            {/* Social Proof Section */}
            <div className="space-y-6">
              <div className="flex -space-x-4 animate-float">
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                  alt="Profile 1"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
                  alt="Profile 2"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop"
                  alt="Profile 3"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop"
                  alt="Profile 4"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
                  alt="Profile 5"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white">M</span>
                  <p>"This daily devotional has transformed my morning routine." - Michael</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white">S</span>
                  <p>"I feel more connected to God each day." - Sarah</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white">J</span>
                  <p>"The perfect way to start my day with purpose." - James</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative flex justify-center items-center">
            <img src="/fire-hero.gif" alt="Sunrise Manna Hero" className="w-full max-w-lg object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;