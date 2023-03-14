export default class SearchComponent {

  apiResponse = undefined

  constructor(citySearchId, searchButtonId, apiService, htmlSetter) {
    this.citySearchId = citySearchId;
    this.searchButtonId = searchButtonId;
    this.apiService = apiService;
    this.htmlSetter = htmlSetter;
    this.htmlSetter.setInitialValues();
    this.initEvent();
    $(`#${this.searchButtonId}`).trigger('click');
  }

  initEvent() {
    const apiFetch = async () => {
      const results = await Promise.all([
        this.apiService.fetchCurrent(),
        this.apiService.fetchHour(),
        this.apiService.fetchWeek(),
      ]);
      // clean week html;
      $(`.week`).html('');
      $(`.hours`).html('');
      this.apiResponse = results[0]
      this.htmlSetter.setWeatherData(results[0], this.getTemperature());
      results[1].forecast.forecastday[0].hour.forEach((hour, index) => {
        this.htmlSetter.setForecast(hour, this.getTemperature(), index);
      });
      results[2].forecast.forecastday.forEach((forecastday, index) => {
        this.htmlSetter.setForecastWeek(forecastday, this.getTemperature(), index);
      });
    };

    $(`#${this.citySearchId}`).on('keypress', async (ev) => {
      if (ev.key === 'Enter') {
        await apiFetch();
      }
    });

    $(`#${this.searchButtonId}`).on('click', async () => {
      await apiFetch();
    });

    $('#flexSwitchCheckDefault').on('change', async () => {
      await apiFetch();
    });
  }

  getTemperature() {
    return $('#flexSwitchCheckDefault')[0].checked ? 'temp_f' : 'temp_c';
  }

  async fetchWheather() {
    const result = await this.getData();
    this.setWeatherData(result);
  }

  setWeatherData(apiResponse) {
    const temp = this.getTemperature(apiResponse);
    this.htmlSetter.setWeatherData(apiResponse, temp);
  }

  async getData() {
    return await this.apiService.getData();
  }
}
