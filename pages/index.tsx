import { getProviders, getSession, signIn} from 'next-auth/client'
import Head from 'next/head'

interface Providers {
  id: string,
  name: string,
  type: string,
  signinUrl: string,
  callbackUrl: string
}

export default function Page({providers}) {
  return (
   <div className="flex justify-center items-center h-screen">
       <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <title>Lyricist</title>
        <meta name="application-name" content="Lyricist" />
        <meta name="description" content="Lyricist is a place for the lyrics to all of your favorite songs
        in all of your favorite playlists!" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
       </Head> 
      <div className="w-full sm:w-3/4 text-primary h-2/3 mx-auto border rounded-md border-black 
       bg-tertiary text-center flex flex-col justify-evenly">
      <h1 className="text-4xl text-quarternary">Welcome to Lyricist!</h1>
     {Object.values(providers).map((provider: Providers, i) => ( 
       <div key={i}>
         {console.log(provider)}
          <button
           className="transform border-b-2 border-primary bg-quarternary rounded-sm p-4 px-4 mx-autos text-xl
           hover:translate-y-1 hover:border-secondary font-bold"
           onClick={() => signIn(provider.id)}>
            Sign In With {provider.name}
          </button>
        </div>
      ))}
      </div>
  </div>
  )
}

export async function getServerSideProps (context) {
  const session = await getSession(context)
  if(session != null) {
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
    }
  }
}
