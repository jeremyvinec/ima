
class thumbnailsApi {

  static getAllThumbnails() {
    return fetch('http://172.20.4.42:8081/cockpit/api/thumbnails', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-User': 'a'
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  }

  /*static getAllThumbnails(serveur, port, user) {
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
  }*/

}

export default thumbnailsApi



