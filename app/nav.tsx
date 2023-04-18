import Navbar from './navbar';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export default async function Nav() {
  const session = await getServerSession();
  // console.log("Session in navbar",session);
  return <Navbar user={session?.user} />;
}
