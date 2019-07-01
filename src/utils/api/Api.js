export function getThumbnails(data) {
  // http://172.20.4.42:8081/cockpit/api/thumbnails
  // http://localhost:8081/src/utils/api/thumbnails.json
  // https://raw.githubusercontent.com/jeremyvinec/ima/master/src/utils/api/thumbnails.json
  return fetch('http://172.20.4.42:8081/cockpit/api/thumbnails', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-User': 'a'
  },  
  body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

//http://172.20.4.42:8081/cockpit/api/thumbnails

export function getUser(serveur, port, user) {
  return fetch('http://' + serveur + ':' + port + '/cockpit/api/thumbnails', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-User': user
    }
  })
  .then((response) => response.json())
  .catch((error) => console.error(error));
}

