import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@repo/ui/dialog";
import Image from "next/image";
import { cn } from "@repo/ui/utils";
import { useRouter } from "next/navigation";
import { IMAGES } from "@/app/_assets";
import { Button } from "@repo/ui/button";
import { LogOut, User } from "lucide-react";

export function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsOpen(false);
    router.push("/");
    window.location.reload(); // Refresh to update auth state
  };

  if (!isLoggedIn) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-b from-[#fdffe0] via-[#f7ca7f] to-[#f4b45a] hover:opacity-90 transition-opacity"
      >
        <User className="w-5 h-5 text-black" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[480px] bg-[#1A1A1A] p-12 border-[#f8d48d] border-opacity-25 border-2 rounded-[32px]">
          <div className="flex flex-col items-center gap-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="size-[180px] rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#fdffe0] via-[#f7ca7f] to-[#f4b45a] rounded-full" />
                <Image
                  src={IMAGES.MaheepSingh}
                  alt="Profile"
                  width={240}
                  height={240}
                  className="object-cover relative z-10 rounded-full top-4"
                  priority
                />
              </div>
            </div>

            {/* Profile Actions */}
            <div className="w-full space-y-4">
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => router.push("/profile")}
              >
                View Profile
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => router.push("/settings")}
              >
                Settings
              </Button>

              <div className="w-full h-[1px] bg-[#333333]" />

              <Button
                variant="destructive"
                size="lg"
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
