class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  // 1. Cargar la información del usuario desde el servidor
  getUser() {
    return this._makeRequest("/users/me");
  }

  // 2. Cargar las tarjetas desde el servidor
  getCards() {
    return this._makeRequest("/cards");
  }

  // 3. Editar el perfil
  updateUser(name, about) {
    return this._makeRequest("/users/me", "PATCH", { about, name });
  }

  // 4. Agregar una nueva tarjeta
  addNewCar(name, link) {
    return this._makeRequest("/cards", "POST", { name, link });
  }

  // 5.Alternar "me gusta" en una tarjeta
  addLike(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, "PUT");
  }

  removeLike(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, "DELETE");
  }

  // Método privado para realizar la conexión con el servidor
  _makeRequest(uri, method = "GET", params = {}) {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: this._token,
      },
    };
    if (method !== "GET") {
      config.body = JSON.stringify(params);
    }
    return fetch(`${this._url}/${uri}`, config).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}

// Variable que se exporta para realizar la conexión
const api = new Api(
  "https://around-api.es.tripleten-services.com/v1",
  "68e1f8c3-3bf9-46aa-93b3-f3486d4dae11"
);
export default api;
