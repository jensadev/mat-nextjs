import Link from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement } from 'react';

export default function Navlink({ href, children }) {
  const router = useRouter();

  let className = children.props.className || '';
  if (router.pathname === href) {
    className = `${className} active`;
  }

  return <Link href={href}>{cloneElement(children, { className })}</Link>;
}
