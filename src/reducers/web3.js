import { WEB3_LOAD } from '../constants'

export default (state = {}, action) => {
  switch(action.type) {
    case WEB3_LOAD:
      return {
        instance: action.instance
      }
    default:
      return state
  }
}