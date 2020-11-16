import { queue } from 'async'

export default queue((task: (callback: () => void) => void, callback) => {
  task(callback)
}, 3)
