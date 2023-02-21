export class ApiService {
    data
    citySearchId

    constructor(citySearchId) {
        this.citySearchId = citySearchId
        
    }

    fetch() {
        const city = $(`#${this.citySearchId}`)[0].value;
        fetch(
          `http://api.weatherapi.com/v1/current.json?q=${city}&key=6e1accc7815a49338c2131030231902`
        )
          .then((response) => response.json())
          .then((weatherResponse) => {
            return weatherResponse
            // this.data = weatherResponse;
            // console.log(this.data)
            // this.setWeatherData(weatherResponse.current[this.unit], weatherResponse.location.name);
          })
          .catch(() => {
            console.log("error");
          });
      }
}
