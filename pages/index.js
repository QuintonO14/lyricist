import { getProviders, getSession, signIn} from 'next-auth/client'
import Head from 'next/head'

export default function Page({providers}) {
  return (
   <div className="w-full sm:w-1/3 text-black min-h-screen flex flex-col mx-auto border
    flex items-center justify-center rounded-md border-black">
       <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <title>Lyricist</title>
        <meta name="signin" content="Lyricist is a place for the lyrics to all of your favorite songs
        in all of your favorite playlists!" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
       </Head> 
     {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button
           className="border border-black bg-white rounded-sm p-4 px-4 mx-autos hover:bg-gray-100 active:bg-gray-100"
           onClick={() => signIn(provider.id)}>
            Sign In With {provider.name}
          </button>
        </div>
      ))}
  </div>
  )
}

export async function getServerSideProps (context) {
  const session = await getSession(context)
  if(session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      providers: await getProviders(),
      session: session
    }
  }
}
