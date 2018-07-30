const API = 'https://api.foursquare.com/v2/venues'
const ID = '4FOTAUXKWF1S131YZCZWVDSYEKT4F5YQLMFMAROOKNOTMWY5'
const SECRET = 'U0ANJSYBZX55LDI5VC5FM5EM3U1X5Z4E2JN5C3BZRJWBTRS1'

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