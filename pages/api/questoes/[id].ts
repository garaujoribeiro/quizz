import questoes from './bancoDeQuestoes'
import type { NextApiRequest, NextApiResponse } from 'next'



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {id} = req.query;
    const questao = questoes.filter(questao=>questao.id === Number(id))[0]
    res.status(200).json(questao.paraObjeto())
}
