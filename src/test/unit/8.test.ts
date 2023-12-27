import MemoryDataSource from '../../missions/eigthMission/data/MemoryDataSource'

test('Deve ser possível cadastrar uma pessoa', () => {
  const memoryDataSource = new MemoryDataSource()
  memoryDataSource.insertPersonRegistry('willyam', 'willyampimenteldev@gmail.com', 22)
  expect(memoryDataSource.fetchEveryPersonRegistry().length).toBe(1)
})
