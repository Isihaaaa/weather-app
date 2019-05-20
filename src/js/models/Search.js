import axios from 'axios';
import {
    proxy,
    key,
    darksky,
    whereIAmApiUrl
} from '../config'


export default class Search {
    constructor(location) {
        this.location = location;
    }
    

    async getForecast() {
        try {
            const latiLongURL = `${proxy}https://darksky.net/geo?q=${this.location}`;
            const res = await axios(latiLongURL);
            this.latitude = res.data.latitude;
            this.longitude = res.data.longitude;

            // API URL = https://api.darksky.net/forecast/[key]/[latitude],[longitude]
            const apiURL = `${proxy}${darksky}${key}/${this.latitude},${this.longitude}?lang=hu`;
            const forecast = await axios(apiURL);
            this.forecast = forecast;
        } catch (err) {
            console.log(err);
        }

    }

    async locationName(lat, long) {
        try {
            const whereIAmName = `${proxy}${whereIAmApiUrl}lat=${lat}&lon=${long}`;
            const result = await axios(whereIAmName);
            this.locationName = result.data.name;
        } catch (err) {
            console.log(err);
        }
    }



}