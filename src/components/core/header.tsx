import Image from "next/image";
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

type HeaderProps = {

}
export const Header = ({}: HeaderProps) => {
  return (
    <Card>
      <CardContent className="p-5 flex justify-between items-center">
        <Image 
          src="/images/svg/logo.svg"
          alt="FSW Barber"
          width={120}
          height={22}
        />

        <Button variant="outline" size="icon">
          <MenuIcon size={18} />
        </Button>
      </CardContent>
    </Card>
  );
}