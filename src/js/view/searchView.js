import {
  elements,
  parentArray
} from '../base';
import { state } from '../index';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => {
  elements.card.innerHTML = '', elements.dailyList.innerHTML = '', elements.hourlyList.innerHTML = ''
};

export const fahrenheitToCelsius = (fahrenheit) => {
  //[°C] = ([°F] - 32) × 5/9
  const celsius = (fahrenheit - 32) * (5 / 9);
  return Math.round(celsius);
}

const apiIcons = ['clear-day', 'clear-night', 'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night'];

const fontAwesomeIcons = ['sun', 'moon', 'cloud-rain', 'snowflake', 'cloud-showers-heavy', 'wind', 'eye-slash', 'cloud', 'cloud-sun', 'cloud-moon']

const getIcon = (arr, apiData) => {
  const index = arr.indexOf(apiData);
  return fontAwesomeIcons[index];
}

export const renderCurrent = forecast => {

  const markup = `
          <div class="card__header">
            <div class="card__header--wrapper">
              <span class="card__header--name">${state.search.locationName}</span>
              <i class="card__header--icon fas fa-map-marker-alt fa-2x"></i>
            </div>
            <div class="card__header--plus-wrapper">
              <i class="fas fa-plus fa-2x add-btn"></i>
            </div>
          </div>  
          <div class="card__main">
            <i class="card__main--icon fas fa-8x fa-${getIcon(apiIcons, forecast.data.currently.icon)}"></i>
            <span class="card__main--temperature">${fahrenheitToCelsius(forecast.data.currently.temperature)} &#8451;</span>
          </div>

          <div class="card__footer">
            <span class="card__footer--max-and-min">${fahrenheitToCelsius(forecast.data.daily.data[0].temperatureMin)} / ${fahrenheitToCelsius(forecast.data.daily.data[0].temperatureMax)}</span>
            <span class="card__footer--only-text">Érzékelt hőmérséklet : ${fahrenheitToCelsius(forecast.data.currently.apparentTemperature)}</span>
            <span class="card__footer--one-word">${forecast.data.currently.summary}</span>
          </div>
    `;
  elements.card.insertAdjacentHTML('beforeend', markup);
}


/***** DAILY *****/
const renderDaily = daily => {
  // console.log(daily);

  const markup = `
            <li class="list__item">
              <span class="list__item--heading">${getDayName(daily.time)}</span>
              <i class="list__item--icon fas fa-2x fa-${getIcon(apiIcons, daily.icon)}"></i>
              <span class="list__item--temperature">${fahrenheitToCelsius(daily.temperatureMin)} / ${fahrenheitToCelsius(daily.temperatureMax)} </span>
            </li>
  `

  elements.dailyList.insertAdjacentHTML('beforeend', markup);
}

const daysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getDayName = unixTime => {
  const day = new Date(unixTime * 1000);
  const index = day.getDay();
  return daysName[index];
}

export const renderDailyResults = days => days.data.slice(0, 7).forEach(renderDaily);

/***** HOURLY *****/
const renderHourly = hourly => {

  const markup = `
            <li class="list__item">
              <span class="list__item--heading">${getHour(hourly.time)}</span>
              <i class="list__item--icon fas fa-2x fa-${getIcon(apiIcons, hourly.icon)}"></i>
              <span class="list__item--temperature">${fahrenheitToCelsius(hourly.temperature)}</span>
            </li>
  `

  elements.hourlyList.insertAdjacentHTML('beforeend', markup);
}

const getHour = unixTime => {
  const hour = new Date(unixTime * 1000);
  const currentHour = hour.getHours();
  return `${currentHour}:00`;
}

export const renderHourlyResults = hours => hours.slice(0, 7).forEach(renderHourly);

/***** Error *****/

export const hideError = () => {

  const error = document.querySelector('.error');

  elements.header.removeChild(error);
}

export const showError = () => {
  // elements.header.appendChild(elements.error);

  const markup = `
        <!-- error -->
        <div class="error">
            <span>Not Found</span><i class="fas fa-2x fa-exclamation"></i>
          </div>

  `;

  // const markup2 = `
  //       <i class="fas fa-exclamation-triangle center"></i>
  // `;

  elements.header.insertAdjacentHTML('afterbegin', markup);

  // parentArray.forEach(el => {
  //   el.insertAdjacentHTML('afterbegin', markup2);
  // });


}