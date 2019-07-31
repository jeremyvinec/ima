
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
    .catch((error) => console.error(error));
  }

}

export default thumbnailsApi



