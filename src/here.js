export const hereCredentials = {
    id: 'taZnpQ5ImkHyDEUf3aXg',
    key: 'jCib4OGUgnFdbUZ6__kMZA',
    apiKey: 'mzm_02U4D-JfaPHz8guVrCmz1ETv-E0_wNE8wZ41bTQ',
 }
 
 export const hereIsolineUrl = (coords, options) => `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json?app_id=${hereCredentials.id}&app_code=${hereCredentials.key}&mode=shortest;${options.mode};traffic:${options.traffic}&start=geo!${coords[0]},${coords[1]}&range=${options.range}&rangetype=${options.type}`
 
 export const hereTileUrl = (style) => `https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?app_id=${hereCredentials.id}&app_code=${hereCredentials.key}&ppi=320`;
 
 export const maxIsolineRangeLookup = {
    time: 20000,
    distance: 400000
 }
