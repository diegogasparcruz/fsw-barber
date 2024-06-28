'use client'
import Image from "next/image";
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { SideMenu } from "./side-menu";

type HeaderProps = {

}
export const Header = ({ }: HeaderProps) => {
  

  return (
    <Card>
      <CardContent className="p-5 flex justify-between items-center">
        <Image
          src="/images/svg/logo.svg"
          alt="FSW Barber"
          width={120}
          height={22}
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
}

12721174707923