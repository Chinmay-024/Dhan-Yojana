import Navbar from './navbar';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
// import { useLocalStorage } from '../hooks/useLocalStorage';

export default async function Nav() {
  const session = await getServerSession(authOptions);
  //use LocalStorage to store session

  // localStorage.setItem('session', JSON.stringify(session));

  // console.log("Session in navbar",session);
  return <Navbar user={session?.user} />;
}
