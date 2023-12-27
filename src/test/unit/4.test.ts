import { caesarCypher } from '../../missions/fourthMission/fourthMission'

test('Não deve ser possível cadastrar um nome com menos de 4 caracteres', () => {
  expect(caesarCypher('Elaine', 0)).toBe('Elaine')
  expect(caesarCypher('Raul', 2)).toBe('Tcwn')
  expect(caesarCypher('Alencar', 4)).toBe('Epirgev')
  expect(caesarCypher('Nascimento', 6)).toBe('Tgyiosktzu')
})
