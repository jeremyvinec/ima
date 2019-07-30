
class thumbnailsApi {

  /*static getAllThumbnails() {
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
  }*/

  static getAllThumbnails(searchedServeur, searchedPort, searchedUser) {
    return fetch('http://' + searchedServeur + ':' + searchedPort + '/cockpit/api/thumbnails', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-User': searchedUser
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  }

}

export default thumbnailsApi



