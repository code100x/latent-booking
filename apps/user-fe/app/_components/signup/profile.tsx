import { useState } from "react";
import { Dialog, DialogContent } from "@repo/ui/dialog";
import Image from "next/image";
import { cn } from "@repo/ui/utils";
import { useRouter } from "next/navigation";
import { IMAGES } from "@/app/_assets";
import { Button } from "@repo/ui/button";
import { LogOut, Settings, User, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setIsOpen(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center justify-center w-10 h-10 rounded-full 
          bg-gradient-to-b from-[#fdffe0] via-[#f7ca7f] to-[#f4b45a] 
          hover:shadow-lg hover:shadow-[#f4b45a]/20 transition-all duration-300 
          transform hover:scale-105"
      >
        <User className="w-5 h-5 text-black group-hover:rotate-12 transition-transform duration-300" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[480px] bg-[#1A1A1A] p-12 border-[#f8d48d] border-opacity-25 border-2 rounded-[32px]">
          <div className="flex flex-col items-center gap-8">
            {/* Profile Image */}
            <div className="relative group cursor-pointer">
              <div className="size-[180px] rounded-full overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
                <div
                  className="absolute inset-0 bg-gradient-to-b from-[#fdffe0] via-[#f7ca7f] to-[#f4b45a] rounded-full 
                  group-hover:animate-gradient"
                />
                <Image
                  src={IMAGES.MaheepSingh}
                  alt="Profile"
                  width={240}
                  height={240}
                  className="object-cover relative z-10 rounded-full top-4 transition-transform duration-300 
                    group-hover:scale-105 group-hover:rotate-3"
                  priority
                />
              </div>
              <div
                className="absolute bottom-0 right-0 bg-[#f4b45a] p-2 rounded-full shadow-lg 
                transform translate-x-2 translate-y-2 group-hover:scale-110 transition-transform duration-300"
              >
                <Settings className="w-5 h-5 text-black" />
              </div>
            </div>

            {/* Profile Actions */}
            <div className="w-full space-y-4">
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-[#2A2A2A] hover:bg-[#333333] text-white border-2 border-[#3A3A3A] 
                  hover:border-[#f8d48d] transition-colors group"
                onClick={() => router.push("/profile")}
              >
                <UserCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                View Profile
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-[#2A2A2A] hover:bg-[#333333] text-white border-2 border-[#3A3A3A] 
                  hover:border-[#f8d48d] transition-colors group"
                onClick={() => router.push("/settings")}
              >
                <Settings className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Settings
              </Button>

              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#333333] to-transparent" />

              <Button
                variant="destructive"
                size="lg"
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 group 
                  transform transition-all duration-300 hover:scale-[1.02]"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Logout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
