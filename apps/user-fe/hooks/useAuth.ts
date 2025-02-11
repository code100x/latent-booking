import { useState, useEffect } from "react";
import { userApi } from "@/api";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const validateUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          setIsAuthenticated(false);
          setIsValidating(false);
          return;
        }

        const response = await userApi.validateUser();

        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserData(response.data);
        } else {
          setIsAuthenticated(false);
          router.push("/");
        }
      } catch (error) {
        console.error("Auth validation error:", error);
        setIsAuthenticated(false);
        router.push("/");
      } finally {
        setIsValidating(false);
      }
    };

    validateUser();
  }, [router]);

  return { isValidating, isAuthenticated, userData };
};
