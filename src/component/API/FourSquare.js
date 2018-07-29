const API = 'https://api.foursquare.com/v2/venues'
const ID = 'N1PG40Q21KVTYI455F4APFQIXW1JSWBBOZ2XKETQMB4WHIP0'
const SECRET = '1IHMPPOKEBXKBV2FQE05JXRSSSHXDUNBZWS0U01BM4LLBLYM'

export const getFourSquareInfo = (lat, lng, name) => {
    return fetch(`${API}/search?&ll=${lat},${lng}&limit=1&radius=250&query=${name}&client_id=${ID}&client_secret=${SECRET}&v=20180323`)
        .then(result => result.json())
        .then(result => result.response.venues[0].id)
        .then(LocationID =>
            fetch(`${API}/${LocationID}?&client_id=${ID}&client_secret=${SECRET}&v=20180323`)
                .then(result => result.json())
        )
        .catch('err')
}