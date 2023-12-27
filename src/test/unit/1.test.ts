import { letterCounter } from '../../missions/firstMission/firstMission'

test('Deve contar com precisão as letras em uma string', () => {
  expect(letterCounter('a', 'it was not part of their blood, it came to them very late')).toBe(4)
  expect(letterCounter('e', 'With long arrears to make good, When the Saxon began to hate')).toBe(6)
  expect(letterCounter('z', 'aeiou')).toBe(0)
})
