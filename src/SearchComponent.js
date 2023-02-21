export default class SearchComponent {
  constructor(
    citySearchId,
    searchButtonId,
    apiService,
    htmlSetter
  ) {
    this.citySearchId = citySearchId;
    this.searchButtonId = searchButtonId;
    this.apiService = apiService;
    this.htmlSetter = htmlSetter;
    this.initEvent();
  }

  initEvent() {
    $(`#${this.citySearchId}`).on("keypress", async (ev) => {
      if (ev.key === "Enter") {
        this.fetchWheather();
      }
    });

    $(`#${this.searchButtonId}`).on("click", async () => {
      this.fetchWheather();
    });

    $('#flexSwitchCheckDefault').on("change", () => {
      this.fetchWheather();
    });
  }

  getTemperature(apiResponse){
    return $('#flexSwitchCheckDefault')[0].checked ? apiResponse.current.temp_f : apiResponse.current.temp_c
  }

  async fetchWheather() {
    const result = await this.fetch();
    this.setWeatherData(result);
  }

  setWeatherData(apiResponse) {
    const temp = this.getTemperature(apiResponse)
    const city = apiResponse.location.city;
    this.htmlSetter.setWeatherData(temp, city);
  }

  async fetch() {
    return await this.apiService.fetch();
  }
}
