import type { NextPage } from 'next'
import Head from 'next/head'
import Questao from '../components/Questao'
import QuestaoProvider from '../contexts/QuestaoContext'

const MOCK_QUESTAO = {
  "id": 212,
  "enunciado": "Qual montanha se localiza entre a fronteira do Tibet com o Nepal?",
  "respostas": [
    {
      "valor": "Monte Branco",
      "certa": false,
      "revelada": false
    },
    {
      "valor": "Monte Fuji",
      "certa": false,
      "revelada": false
    },
    {
      "valor": "Monte Carlo",
      "certa": false,
      "revelada": false
    },
    {
      "valor": "Monte Everest",
      "certa": true,
      "revelada": false
    }
  ],
  "acertou": false
}



const Home: NextPage = () => {

  return (
    <QuestaoProvider>
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-screen h-screen bg-indigo-700 text-white flex justify-center items-center'>
        <section className='flex flex-col m-6 container max-w-3xl py-3 justify-center'><Questao /></section>
      </main>
    </div>
    </QuestaoProvider>
  )
}

export default Home
