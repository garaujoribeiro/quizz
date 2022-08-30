import questoes from '../questoes/bancoDeQuestoes';
import type { NextApiRequest, NextApiResponse } from 'next'
import randomSort from '../../../utils/randomSort';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const idArray = questoes.map(questao=> questao.id)
    
    res.status(200).json(randomSort(idArray))
}
