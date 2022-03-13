export const BASE_URL = window.location.origin;
// = "https://620ac1f492946600171c5c69.mockapi.io/api/v1"
let API_URL;
/**
 * handle environment based on domainName
 * */
switch (BASE_URL) {
    case 'http://localhost:3000':
        API_URL = 'http://localhost:8080/phone-numbers-api/api/v1/rest';
        break;
    //todo: add different environments domains as cases and their corresponding backend-api endpoints
    default:
        API_URL = 'http://localhost:8080/phone-numbers-api/api/v1/rest';
        break;
}
export { API_URL };

export default API_URL;
