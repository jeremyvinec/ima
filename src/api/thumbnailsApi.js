
class thumbnailsApi {

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
    //.catch((error) => console.error(error));
  }

  // https://' + searchedServeur + '/notifications/api/probes?user=' + searchedUser
  static getAllThumbnails2() {
    return fetch('https://172.20.4.46/notifications/api/probes?user=a', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'X-User': searchedUser
    }
  })
    .then((response) => console.log(response.json()))
    //.catch((error) => console.error(error));
  }

}

export default thumbnailsApi



