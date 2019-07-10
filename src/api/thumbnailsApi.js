
class thumbnailsApi {

  static getAllThumbnails(serveur, port, user) {
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

}

export default thumbnailsApi



