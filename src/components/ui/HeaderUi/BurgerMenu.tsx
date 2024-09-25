import { links } from "@/constants/links";
import scss from "./BurgerMenu.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
const BurgerMenu = () => {
  const pathName = usePathname();

  return (
    <div className={scss.menu}>
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
    </div>
  );
};

export default BurgerMenu;
