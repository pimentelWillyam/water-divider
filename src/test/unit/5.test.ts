import { crcCaulculator } from '../../missions/fifthMission/fifthMission'

test('Não deve ser possível cadastrar um nome com menos de 4 caracteres', () => {
  expect(crcCaulculator('Willyam')).toBe('2005')
  expect(crcCaulculator('Ueslei')).toBe('1302')
  expect(crcCaulculator('Marlon')).toBe('1804')
})
