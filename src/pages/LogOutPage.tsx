import { useMsal } from "@azure/msal-react";
import { Loader2 } from "lucide-react";

export function LogOutPage() {
  const { instance } = useMsal();
  instance.logoutRedirect({
    postLogoutRedirectUri: "/",
  });

  return <Loader2 className="h-8 w-8 text-primary animate-spin" />;
}
