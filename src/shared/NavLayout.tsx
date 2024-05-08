import {
  useMsal,
  useIsAuthenticated,
  AuthenticatedTemplate,
} from "@azure/msal-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Outlet } from "react-router-dom";
import { loginRequest } from "@/authConfig";

export function NavLayout() {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  if (!isAuthenticated) {
    console.log("User is not authenticated, redirecting to login");
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  }

  return (
    <AuthenticatedTemplate>
      <div className="bg-background">
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <Navbar />
          </aside>
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 justify-around item">
            <Outlet />
          </div>
        </div>
      </div>
    </AuthenticatedTemplate>
  );
}
