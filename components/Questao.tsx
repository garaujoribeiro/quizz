import { useContext } from "react"
import { QuestaoContext } from "../contexts/QuestaoContext"

interface QuestaoProps{
  questao:{
  id: number,
  enunciado: string,
  respostas: {
    valor: string,
    certa: boolean,
    revelada: boolean
  }[],
  acertou: boolean
}}

const LETTER_OPTION = ['A','B','C','D']

export default function Questao(){
    const {id, enunciado, respostas} = useContext(QuestaoContext).questao
    const { getNextQuestion, respondeu,
       respostaSelecionada, responder, finish } = useContext(QuestaoContext)

    const acertou: string = 'bg-green-300'
    const errou: string = 'bg-red-300'

    const handleClickProximo = () => {
      getNextQuestion()
    }

    const handleClickSelecionarResposta = (resposta: string) => {
      responder(resposta)
    }

    if(finish) return <div className='flex justify-center'>
      <p>Voce terminou o quizz</p>
    </div>

    return (id ? <>
        <h2 className='font-bold text-3xl bg-white text-indigo-700 rounded-md  p-6'>{enunciado}</h2>
        <ul>{respostas.map((resposta,index)=>{
            return(
            <li key={resposta.valor} onClick={()=> {
              if(respondeu) return
              handleClickSelecionarResposta(resposta.valor)}}
            className={`${!respondeu && 'hover:bg-slate-200 cursor-pointer'} text-xl flex items-center bg-white text-indigo-700 
            rounded-md w-11/12 mx-auto p-4 my-4 
            ${!respondeu? 'bg-white' : resposta.certa ? acertou : respostaSelecionada === resposta.valor ? errou : 'bg-white'}
            `}>
            <p className='mr-6 ring-2 w-12 h-12 rounded-full outline-indigo-700 flex items-center justify-center'>
            {LETTER_OPTION[index]} </p>
            <p className="text-black">
              {resposta.valor}
            </p>
            </li>)
          })}</ul>
            <button onClick={handleClickProximo}>Próximo</button>
      </> : <>
      <div className='flex justify-center'>
        carregando...
      </div>
      </>
    )
}