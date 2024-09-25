"use client";
import Link from "next/link";
import scss from "./Header.module.scss";
import { links } from "@/constants/links";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import BurgerMenu from "@/components/ui/HeaderUi/BurgerMenu";

const Header = () => {
  const pathName = usePathname();
  const session = useSession();

  const [isMobile, setIsMobile] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const changeIsMobile = () => {
    setIsMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    changeIsMobile();
    window.addEventListener("resize", changeIsMobile);
    return () => window.removeEventListener("resize", changeIsMobile);
  }, []);
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left}>
            <div className={scss.logo}>
              <Link href="/">
                <h1>My-movie</h1>
              </Link>
            </div>
          </div>
          <div className={scss.right}>
            {!isMobile ? (
              <nav className={scss.nav}>
                <ul>
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        className={
                          pathName === link.href
                            ? `${scss.link} ${scss.active}`
                            : scss.link
                        }
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            {session.data ? (
              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => {
                  signIn();
                }}
              >
                Sing in
              </button>
            )}
            <div className={scss.auth}>
              {session.data && (
                <img
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                  src={session.data?.user?.image!}
                  alt=""
                />
              )}
            </div>
            {isOpenMenu && isMobile ? <BurgerMenu /> : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
