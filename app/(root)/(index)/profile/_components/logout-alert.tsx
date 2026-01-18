"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/helpers/context/auth/auth.hook";

const LogoutAlert = () => {
  const { logout } = useAuth();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-auto cursor-pointer">Logout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Make sure you remember your previous credentials before logout
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <Button variant="destructive" onClick={() => logout()}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutAlert;
