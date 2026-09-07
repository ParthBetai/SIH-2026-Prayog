import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { needsAccount } from '@/config/nav';
import { useSession } from '@/services/hooks';

/**
 * A link to a page that refuses a signed-out reader, shown only to one who
 * holds an account.
 *
 * The public site now has two kinds of destination. The demand board, how it
 * works and the policies are open to anyone. The register, the results, the
 * catalogue and the transparency figures are not — `RequireAccount` refuses
 * them, because each names an identifiable company and what it was measured at.
 *
 * A public page that links to the second kind is offering a locked door. It
 * looks like navigation and behaves like a wall, and the reader only finds out
 * after the click. That has now happened twice in this codebase — the empty
 * state that pointed at the challenge register, and the money panel that
 * pointed at the transparency register — so it is a component rather than a
 * condition typed out at each site.
 *
 * It renders NOTHING when the reader cannot follow it, rather than a disabled
 * control or a sign-in prompt. A greyed-out link still advertises a page, and
 * the page it advertises is one the programme has decided not to publish; the
 * way in is the account, and the account is offered where accounts belong.
 */
export function AccountOnlyLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) {
  const session = useSession();
  const signedIn = (session.data?.data.role ?? 'public') !== 'public';

  if (needsAccount(to) && !signedIn) return null;

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
