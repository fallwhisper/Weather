export default class SearchComponent {
  constructor(
    citySearchId,
    searchButtonId,
    apiService,
    htmlSetter,
  ) {
    this.citySearchId = citySearchId;
    this.searchButtonId = searchButtonId;
    this.apiService = apiService;
    this.htmlSetter = htmlSetter;
    this.initEvent();
  }

  initEvent() {
    const apiFetch = async () => {
      const results = await Promise.all([this.apiService.fetchCurrent(), this.apiService.fetchHour()]);
      this.htmlSetter.setWeatherData(results[0], this.getTemperature());
      this.htmlSetter.setForecast(results[1], this.getTemperature())
    }
    
    $(`#${this.citySearchId}`).on("keypress", async (ev) => {
      if (ev.key === "Enter") {
        apiFetch();
      }
    });

    $(`#${this.searchButtonId}`).on("click", async () => {
      apiFetch();
    });

    $('#flexSwitchCheckDefault').on("change", () => {
      apiFetch();
    });
  }

  getTemperature(apiResponse){
    return $('#flexSwitchCheckDefault')[0].checked ? 'temp_f' : 'temp_c'
  }

  async fetchWheather() {
    const result = await this.getData();
    this.setWeatherData(result);
  }

  setWeatherData(apiResponse) {
    const temp = this.getTemperature(apiResponse)
    this.htmlSetter.setWeatherData(apiResponse, temp);
  }

  async getData() {
    return await this.apiService.getData();
  }
}
