'use client'
import Image from "next/image";
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button";
import { CalendarDaysIcon, CalendarIcon, HomeIcon, Loader2Icon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { SideMenu } from "./side-menu";
import { SearchForm } from "../shared/search-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export const Header = () => {
  const { data: session } = useSession()

  const handleLoginClick = async () => {
    await signIn('google')
  }

  const handleLogoutClick = async () => {
    await signOut()
  }

  return (
    <Card className="lg:px-20">
      <CardContent className="p-5 lg:px-0 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/images/svg/logo.svg"
            alt="FSW Barber"
            width={120}
            height={22}
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon">
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <div className="gap-4 hidden lg:flex lg:items-center lg:gap-6">
          {session?.user ? (
            <>
              <Link href="bookings" className="flex gap-2 text-sm items-center">
                <CalendarDaysIcon size={16} />
                Agendamentos
              </Link>

              <div className="flex justify-between gap-3 items-center">
                <div className="flex gap-3 items-center">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={session.user?.image ?? ''} />
                  </Avatar>

                  <h2 className="font-bold text-base">{session?.user?.name}</h2>
                </div>

                

                <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button className="w-8 h-8" variant="secondary" size="icon">
                  <LogOutIcon size={16} />
                </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deseja fazer logout?</AlertDialogTitle>
                  </AlertDialogHeader>
                  
                  <AlertDialogFooter className="flex-row gap-3">
                    <AlertDialogCancel 
                      className="w-full mt-0"
                    >
                      Voltar
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      className="w-full"
                      onClick={handleLogoutClick}
                    >
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              </div>
            </>
          ) : (
            <Button
              variant="default"
              className="justify-start"
              onClick={handleLoginClick}
            >
              <LogInIcon className="mr-2" size={18} />
              Fazer Login
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}