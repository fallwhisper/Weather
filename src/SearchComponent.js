export default class SearchComponent {
    constructor(citySearchId, searchButtonId) {
        console.log('search constructor')
        this.citySearchId = citySearchId;
        this.searchButtonId = searchButtonId;
        this.initEvent();
    }

    initEvent() {
        console.log('search created')
        $(`#${this.searchButtonId}`).on('click', () => {
            console.log('clicked')
            const city = $(`#${this.citySearchId}`)[0].value;
            console.log(city)
            fetch(`http://api.weatherapi.com/v1/current.json?q=${city}&key=6e1accc7815a49338c2131030231902`)
                .then((response) => response.json())
                .then((weatherResponse) => this.setWeatherData(weatherResponse));
        });
    }

    setWeatherData(weatherData) {
        $('#temperature-value').text(weatherData.current.temp_c)
    }
}