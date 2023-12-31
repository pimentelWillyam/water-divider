interface IAPI {
  start: (listenerPort: number) => void
  stop: () => void
}

export type { IAPI }
