import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// useEffect(() => {
//     if (typeof window !== 'undefined') {
//       let user2 = localStorage.getItem('user') || '{"id":"none","name":"none","email":"nobe"}';
//       setUser(JSON.parse(user2))
//       setUserId(JSON.parse(user2).id);
//       //console.log(user2)
//     }
//   },[]);

const middleware = async (request: NextRequest) => {
  return NextResponse.redirect(new URL('/', request.url));
};
export default middleware;
