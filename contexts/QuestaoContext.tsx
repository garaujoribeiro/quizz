import { createContext, useCallback, useEffect, useReducer, useRef, useState } from "react";
import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api/'

interface QuestaoType{
  id: number,
  enunciado: string,
  respostas: {
    valor: string,
    certa: boolean,
    revelada: boolean
  }[],
  acertou: boolean
}

const DEFAULT_QUESTAO: QuestaoType = {
    id: 0,
    enunciado: '',
    respostas: [{
    valor: '',
    certa: false,
    revelada: false
  }],
  acertou: false}

type QuestaoContent = {
  questao: QuestaoType,
  questionario: number[],
  questaoAtual: number,
  respondeu: boolean,
  respostaSelecionada: string,
  finish: boolean,
  responder: (r: string)=> void;
  getNextQuestion: ()=> void;
}

export const QuestaoContext = createContext<QuestaoContent>({
  questao: DEFAULT_QUESTAO,
  questionario: [],
  questaoAtual: 0,
  respondeu: false,
  respostaSelecionada: '',
  finish: false,
  responder: ()=>{},
  getNextQuestion: ()=>{}
}
)

export default function QuestaoProvider ({children}: any){

  console.log('renderizou')
    
/*   const [questionario, setQuestionario] = useState<number[]>([]);
  const [questao, setQuestao] = useState<QuestaoType>(DEFAULT_QUESTAO);
  const [questaoAtual, setQuestaoAtual] = useState<number>(0);

  const getQuestionario = useCallback(async ()=>{
    const path: string = 'questionario'
    const response = await axios.get(BASE_URL + path);
    const idQuestionario = response.data;
    setQuestionario(idQuestionario)
  },[])

  const getQuestao = useCallback(async (id: number)=>{
    const path: string = `questoes/${id}`
    const response = await axios.get(BASE_URL + path);
    const questao = response.data;
    setQuestao(questao)
  },[])

  useEffect(()=>{
    getQuestionario()
  },[getQuestionario])

  useEffect(()=>{
    if(questionario)
      getQuestao(questionario[questaoAtual])
  },[getQuestao, questaoAtual, questionario])
 */

  interface QuestaoInitialType {
    questao: QuestaoType,
    questionario: number[],
    questaoAtual: number,
    respondeu: boolean,
    respostaSelecionada: string
    finish: boolean
  }

  interface QuestaoAction {
    type: 'INIT_QUIZZ' | 'GET_NEXT_QUESTION' | 'RESPONDER' | 'FINISH',
    payload?: {
      questao?: QuestaoType,
      questionario?: number[],
      questaoAtual?: number,
      respondeu?: boolean,
      respostaSelecionada?: string
      finish?: boolean
    }
  }

  const QuestaoInitial = {
    questao: DEFAULT_QUESTAO,
    questionario: [],
    questaoAtual: 0,
    respondeu: false,
    respostaSelecionada: '',
    finish: false
  }

  const QuestaoReducer = (initialState: QuestaoInitialType, {type, payload}: QuestaoAction): any => {
    switch(type){
      case 'INIT_QUIZZ':
        return {...initialState, questionario: payload?.questionario, questao: payload?.questao}
      case 'GET_NEXT_QUESTION':
        return {...initialState, questao: payload?.questao, 
          questaoAtual: initialState.questaoAtual + 1, respondeu: false, respostaSelecionada: ''}
      case 'RESPONDER':
        return {...initialState, respondeu: true, respostaSelecionada: payload?.respostaSelecionada}
      case 'FINISH':
        return {...initialState, finish: true}
      default:
        throw new Error('unhandled type')
    }
  }

  const [{questao, questionario, questaoAtual, 
    respondeu, respostaSelecionada, finish}, dispatchQuestao] = useReducer(QuestaoReducer, QuestaoInitial)

  const initQuizz = useCallback(async () => {
    const questionarioResponse = await axios.get(BASE_URL + 'questionario');
    const questionario = questionarioResponse.data;
    console.log(questionario)
    const questaoResponse = await axios.get(BASE_URL + `questoes/${questionario[0]}`)
    const questao = questaoResponse.data;
    console.log(questao)
    dispatchQuestao({type: 'INIT_QUIZZ', payload: {questionario, questao}})
  },[])

  const getNextQuestion = async () => {
      if(questaoAtual < 15){
        const questaoResponse = await axios.get(BASE_URL + `questoes/${questionario[questaoAtual + 1]}`)
        const questao = questaoResponse.data;
        dispatchQuestao({type: 'GET_NEXT_QUESTION', payload: {questao}})
    } else{
        dispatchQuestao({type: 'FINISH'})
    }
    
  }

  const responder = (resposta: string) => {
    dispatchQuestao({type:'RESPONDER', payload: {respostaSelecionada: resposta}})
  }

  useEffect(()=>{
    console.log('renderizou o quizz')
    initQuizz()
  },[initQuizz])

  const contextValue: any = {
    questionario, questao, questaoAtual, getNextQuestion,
    respondeu, respostaSelecionada, responder, finish
  }
 
    return(
    <QuestaoContext.Provider value={contextValue}>
        {children}
    </QuestaoContext.Provider>)
}