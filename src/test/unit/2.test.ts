import { fullNameNormalizer } from '../../missions/secondMission/secondMission'

test('Não deve ser possível cadastrar um nome com menos de 4 caracteres', () => {
  expect(fullNameNormalizer('COLonel poliCARPO QuAResMA')).toBe('Colonel Policarpo Quaresma')
  expect(fullNameNormalizer('SARGEANT fabio BIle')).toBe('Sargeant Fabio Bile')
  expect(fullNameNormalizer('cOrPoRaL MARLON brando')).toBe('Corporal Marlon Brando')
})
