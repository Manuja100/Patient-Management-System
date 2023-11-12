/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import axios from 'axios'

export async function authenticate(email: any) {
  try {
    return await axios.post('/api/authenticate', {email})
  } catch (error) {
    return {error: 'User does not exist'}
  }
}
