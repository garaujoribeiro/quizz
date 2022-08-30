import RespostaModel from "./resposta"
import randomSort from "../utils/randomSort"
export default class QuestaoModel {
    #id: number
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean

    constructor(id: number, enunciado: string, respostas: RespostaModel[], acertou = false){
        this.#id = id
        this.#enunciado = enunciado
        this.#respostas = respostas
        this.#acertou = acertou
    }

    get id() {
        return this.#id
    }

    get enunciado() {
        return this.#enunciado
    }

    get respostas() {
        return this.#respostas
    }

    get acertou() {
        return this.#acertou
    }

    get respondida() {
        for(let resposta of this.#respostas){
            if(resposta.revelada === true){
                return true
            }
        }
        return false
    }
    paraObjeto() {
        return {
            id: this.#id,
            enunciado: this.#enunciado,
            respostas: this.#respostas.map(resposta=>resposta.paraObjeto()),
            acertou: this.#acertou
        }
    }
    randomRespostas() {
        return new QuestaoModel(this.#id, this.#enunciado, randomSort(this.#respostas), this.#acertou)
    }
}