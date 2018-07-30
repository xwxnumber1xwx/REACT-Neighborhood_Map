const API = 'https://api.foursquare.com/v2/venues'
const ID = 'JTT32GOT0Y23WWYAL5YO4RRWBUEW10YQBN02PKJJ5M4BIVW5'
const SECRET = '4PCLU4IVPJDWPFOYHNEJFMYAYK40ECATRXZJH04X5K2MMD4Z'

export const getFourSquareInfo = (lat, lng, name) => {
    return fetch(`${API}/search?&ll=${lat},${lng}&limit=1&radius=250&query=${name}&client_id=${ID}&client_secret=${SECRET}&v=20180323`)
        .then(result => result.json())
        .then(result => {
            if (result.response.venues[0]) {
                return result.response.venues[0].id
            }
        })
        .then(LocationID =>
            fetch(`${API}/${LocationID}?&client_id=${ID}&client_secret=${SECRET}&v=20180323`)
                .then(result => result.json())
        )
        .catch('err')
}