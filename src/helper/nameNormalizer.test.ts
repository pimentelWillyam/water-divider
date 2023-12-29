import { NameNormalizer } from './NameNormalizer'

test('Deve ser possível cadastrar uma pessoa', () => {
  const nameNormalizer = new NameNormalizer()
  nameNormalizer.normalize('willyam')
  expect(nameNormalizer.normalize('willyam')).toBe('Willyam')
  expect(nameNormalizer.normalize('PIMENTEL')).toBe('Pimentel')
})
