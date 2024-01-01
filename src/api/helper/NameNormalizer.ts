import { type INameNormalizer } from '../api/interface/INameNormalizer'

class NameNormalizer implements INameNormalizer {
  normalize = (rawFullName: string): string => {
    const splittedFullName = rawFullName.split(' ')
    let i; let j; let normalizedFullname = ''
    for (i = 0; i < splittedFullName.length; i++) {
      if (i !== 0) normalizedFullname += ' '
      for (j = 0; j < splittedFullName[i].length; j++) {
        if (j === 0) normalizedFullname += splittedFullName[i][j].toLocaleUpperCase()
        else normalizedFullname += splittedFullName[i][j].toLocaleLowerCase()
      }
    }
    return normalizedFullname
  }
}

export { NameNormalizer }
