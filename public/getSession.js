let stage = 'prod';
//const host = stage === 'dev' ? 'http://localhost:5000' : 'http://goldennumberacademy.pt';
const host = 'http://localhost:5000';
const localStorageSession = localStorage.getItem('sessionId');

if(!localStorageSession) {
  window.location.replace(host);
}

async function getSession() {
  const response = await axios.get(`${host}/checkout/session/${localStorageSession}`);
 // const response = await axios.get(`${host}/checkout/session/${localStorageSession}`);

  if(response.data.success) {
    console.log("Clearing local Storage");
    localStorage.clear();
  } else {
    window.location.replace(host);
  }
}

getSession()