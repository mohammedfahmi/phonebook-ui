import axios from './axios';
import API_URL from './APIsConfig';
import {v4 as uuid} from "uuid";

export default async function GetPhoneNumbersApi(filterCriteria) {
    const url = `${API_URL}/customerPhonesNumbers`;
    const config = {
        headers: {
            Accept: 'application/json'
        },
        params: filterCriteria
    };
    const response = await axios.get(url, config);
    return {
        phoneNumbers: response.data["phoneNumbers"].map(phoneNumber => {
            phoneNumber["uuid"] = uuid();
            return phoneNumber;
        }),
        paginationLinks: response.data["paginationLinks"]
    };
};