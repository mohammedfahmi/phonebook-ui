import axios from './axios';
import {v4 as uuid} from "uuid";

import API_URL from './APIsConfig';

export default async function GetFiltersApi() {
    const url = `${API_URL}/phoneNumbersFilters`;
    const config = {
        headers: {
            Accept: 'application/json'
        }
    };
    const response = await axios.get(url, config );
    return response.data.filters.map(filter => {
        filter["uuid"] = uuid();
        filter.states.map(state => {
            state["stateUuid"] = uuid();
            return state;
        })
        return filter;
    });
};
