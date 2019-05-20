export const elements = {
    searchInput: document.querySelector('.finder'),
    card: document.querySelector('.card'),
    dailyList: document.querySelector('.daily__list'),
    hourlyList: document.querySelector('.hourly__list'),
    button: document.querySelector('.btn'),
    header: document.querySelector('.header')
    
};

export const elementStrings = {
    loader: 'loader'
};

export const parentArray = [elements.card, elements.dailyList, elements.hourlyList];

export const renderLoader = parentArray => {
    const loader = `
    <div class="wrapper ${elementStrings.loader}">
        <div class="dot-loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </div>
    `;

    parentArray.forEach(el => {
        el.insertAdjacentHTML('afterbegin', loader);
    })
    //parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {

    parentArray.forEach(() => {
        const loader = document.querySelector(`.${elementStrings.loader}`);
        if (loader) {

            loader.parentElement.removeChild(loader);

        }
    })
}

// export const clearError = () => {
//     const error = document.querySelector(`.$`)
// }