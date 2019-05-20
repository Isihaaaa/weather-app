import * as base from './base';
import Search from './models/Search';
import * as searchView from './view/searchView';
import axios from 'axios';
import { proxy, whereIAmApiUrl } from './config';

export const state = {};

/*
 * SEARCH CONTROLLER
*/

const controlSerach = async () => {
    // 1) Get location from view
    const location = searchView.getInput();

    if (location) {
        // 2) New search object and add to state
        state.search = new Search(location);

        try {
            // 3) Prepare UI for results
            searchView.clearInput();
            searchView.clearResults();
            base.renderLoader(base.parentArray);
            if (state.error === 'Error') {
                searchView.hideError();
            }

            await state.search.getForecast();
            await state.search.locationName(state.search.latitude, state.search.longitude);

            base.clearLoader();

            await console.log(state, 'van input value');
            //await console.log(state.search.forecast.data.hourly.data);
            searchView.renderCurrent(state.search.forecast);
            searchView.renderDailyResults(state.search.forecast.data.daily);
            searchView.renderHourlyResults(state.search.forecast.data.hourly.data);

        } catch (err) {
            console.log(err);
            state.error = 'Error';
            searchView.showError();
        }
        //If dont have location
    } else {
        const getWhereIAm = () => {

            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            const success = async pos => {
                try {
                    const crd = pos.coords;
                    const latitude = crd.latitude;
                    const longitude = crd.longitude;
                    const whereIAmName = `${proxy}${whereIAmApiUrl}lat=${latitude}&lon=${longitude}`;
                    const result = await axios(whereIAmName);
                    const location = result.data.name;

                    state.search = new Search(location);
                    await state.search.getForecast();
                    await state.search.locationName(state.search.latitude, state.search.longitude);

                    searchView.renderCurrent(state.search.forecast);
                    searchView.renderDailyResults(state.search.forecast.data.daily);
                    searchView.renderHourlyResults(state.search.forecast.data.hourly.data);
                    console.log(state, 'nincs input value');
                } catch (err) {
                    console.log(err);
                }
            }

            const error = err => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }

            navigator.geolocation.getCurrentPosition(success, error, options);

        }
        getWhereIAm();
    }
}


base.elements.searchInput.addEventListener('keypress', e => {
    if (e.keyCode === 13 || e.which === 13) {
        controlSerach();
    }
});

base.elements.button.addEventListener('click', () => {
    controlSerach()
});

controlSerach();



