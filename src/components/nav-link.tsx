/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Link, useLocation } from "react-router-dom"
import type { LinkProps } from "react-router-dom";


export interface NavLinkProps extends LinkProps{}

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()
  return (
    <Link
      data-current={pathname === props.to}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foregraound hover:text-foreground data-[current=true]:text-foreground"
      {...props}
    />
  );
}
