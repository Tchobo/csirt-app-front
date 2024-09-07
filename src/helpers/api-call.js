import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
//export const apiUrl = 'https://rtaxibackendtest.raynis.co' //Prod
// Local apiUrl

const apiUrl = import.meta.env.VITE_API_URL;



import store from "../store";
export async function apiRequest(
  method, // "GET" | "DELETE" | "HEAD" | "OPTIONS" | "POST" | "PUT" | "PATCH" | "LINK" | "UNLINK" | undefined,
  endPoint, // string,
  variables, // any,
  formData, //boolean
) {
  let authToken //: string | undefined | null = undefined;

     authToken = localStorage.getItem('token')



  
  store.dispatch('setLoggedUserToken', authToken)
  //authToken = sessionStorage.getItem("token");
 
  console.log(authToken);
  
  const router = useRouter();

  try {
    const options = {
      method,
      url: `${apiUrl}/${endPoint}`,
      data: variables,
      headers: {},
    }

    if (authToken) options.headers['authorization'] = `Token ${authToken}`

    if (formData)
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'

    const resp = await axios(options)

    if (!resp) return resp

    return resp
  } catch (err) {
    console.error('[ERROR]:', err)
    const resp = err.response
    if (resp && resp.status === 401) {
      sessionStorage.removeItem('accessToken')
      router.push('/');
    } else {
      //throw new Error(err);
      return resp
    }
  }
}
