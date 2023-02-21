export default class SearchComponent {
    constructor(citySearchId, searchButtonId) {
        console.log('search constructor')
        this.citySearchId = citySearchId;
        this.searchButtonId = searchButtonId;
        this.initEvent();
    }

  initEvent() {
    $(`#${this.citySearchId}`).on('keypress', (ev) => {
      if (ev.key === 'Enter') {
        this.fetch()
      }
    })

    $(`#${this.searchButtonId}`).on("click", () => {
      const result = this.fetch()
      current
      console.log(result) 
      this.setWeatherData(result.current.temp)
    });
  }

  setWeatherData(temp, city) {
    console.log(temp, city)
    this.htmlSetter.setWeatherData(temp, city)
  }

  fetch() {
    return this.apiService.fetch()
  }

}
