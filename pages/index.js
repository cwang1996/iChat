import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar';

export default function Home() {

  return (
    <div>
      <Head>
        <title>iChat</title>
      </Head>

      <Sidebar />
    </div>
  )
}
