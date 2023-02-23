export class ApiService {
  constructor(citySearchId) {
    this.citySearchId = citySearchId;
  }

  async fetchCurrent() {
    const city = $(`#${this.citySearchId}`)[0].value;
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?q=${city}&key=6e1accc7815a49338c2131030231902`
    );
    const weather = await response.json();
    return weather;
  }
  
  async fetchHour() {
    const city = $(`#${this.citySearchId}`)[0].value;
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?q=${city}&key=6e1accc7815a49338c2131030231902`
    );
    const weather = await response.json();
    return weather;
  }
}
