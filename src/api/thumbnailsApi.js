
class thumbnailsApi {

  static getAllThumbnails(searchedServeur, searchedPort, searchedUser) {
    return fetch('http://' + searchedServeur + ':' + searchedPort + '/notifications/api/probes?user=' + searchedUser, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    //.catch((error) => console.error(error));
  }

}

export default thumbnailsApi



