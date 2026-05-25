import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const routesWithContact = new Set([
  '/',
  '/forex',
  '/remittance',
  '/branches',
  '/corporate',
  '/blog',
  '/lock-rate',
]);

type ContactLinkProps = React.ComponentPropsWithoutRef<'a'> & {
  onNavigate?: () => void;
};

export function ContactLink({
  className,
  children,
  onNavigate,
  ...props
}: ContactLinkProps) {
  const { pathname } = useLocation();

  if (routesWithContact.has(pathname)) {
    return (
      <a
        href="#contact"
        className={className}
        onClick={onNavigate}
        {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to="/#contact" className={className} onClick={onNavigate} {...props}>
      {children}
    </Link>
  );
}
