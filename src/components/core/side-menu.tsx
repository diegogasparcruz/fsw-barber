'use client'
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOutIcon, UserIcon, LogInIcon, HomeIcon, CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { SheetHeader, SheetTitle } from "../ui/sheet";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

type SideMenuProps = {
}

export const SideMenu = ({ }: SideMenuProps) => {
  const { data: session } = useSession();

  const handleLoginClick = async () => {
    await signIn('google')
  }
  
  const handleLogoutClick = async () => {
    await signOut()
  }
  
  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {session?.user ? (
        <div className="flex justify-between gap-3 px-5 py-6 items-center">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={session.user?.image ?? ''} />
            </Avatar>

            <h2 className="font-bold">{session?.user?.name}</h2>
          </div>

          <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col px-5 py-6 gap-3">
          <div className="flex items-center gap-2">
            <UserIcon size={32} />
            <h2 className="font-bold">Olá, faça seu login!</h2>
          </div>

          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={handleLoginClick}
          >
            <LogInIcon className="mr-2" size={18} />
            Fazer Login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button
          variant="outline"
          className="justify-start"
          asChild
        >
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {session?.user && (
          <Button
            variant="outline"
            className="justify-start"
            asChild
          >
            <Link href="/bookings">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}