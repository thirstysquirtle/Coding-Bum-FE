<script>
import {PUBLIC_API_ENDPOINT} from "$env/static/public";
let test = "nothing happened"

async function handleClick () {
    const text = await fetchGetJSON(`${PUBLIC_API_ENDPOINT}/test`)

    test = text


}


async function fetchGetJSON(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return Promise.resolve(response.text);
  } catch (error) {
    return Promise.reject(error);
  }
}
</script>

<h2>{test}</h2>
<button on:click={handleClick} >Do the Thing</button>