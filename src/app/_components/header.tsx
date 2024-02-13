"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarDays, MenuIcon, UserCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Search from "../(home)/_components/Search";
import { usePathname } from "next/navigation";

interface HeaderProps {
  searchParams?: {
    search: string;
  };
}

const Header = ({ searchParams }: HeaderProps) => {
  const { data, status } = useSession();

  const url = usePathname();
  console.log('url', url)

  return (
    <header>
      <Card>
        <CardContent className="p-5 flex justify-between items-center max-w-[1240px] mx-auto">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={120} height={22} />
          </Link>
          {(url.includes("/barbershop") || url === "/bookings") && (
            <div className="md-desk:max-w-[535px] md-desk:w-full md-mobol:hidden">
              <Search
                defaultValues={{
                  search: searchParams?.search as any,
                }}
              />
            </div>
          )}
          <div className="md-desk:hidden">
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
          </div>
          <div className="md-mobol:hidden flex gap-4 items-center">
            <div className="flex gap-2">
              <CalendarDays />
              <Link href="/bookings">
                <span className="font-bold text-sm">Agendamentos</span>
              </Link>
            </div>
            <div className="flex gap-2">
              {status === "unauthenticated" ? (
                <Button className="flex gap-2" onClick={() => signIn("google")}>
                  <UserCircle />
                  <span>Perfil</span>
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={`${data?.user?.image}`} />
                  </Avatar>
                  <span className="font-bold text-base">
                    {data?.user?.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
