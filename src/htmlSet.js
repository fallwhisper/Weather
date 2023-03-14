export class HtmlSetter {

  constructor(citySearchId, searchButtonId, weatherObj) {
    this.citySearchId = citySearchId;
    this.searchButtonId = searchButtonId;
    this.weatherObj = weatherObj
  }

  setInitialValues() {
    const city = window.localStorage.getItem('city');
    $(`#${this.citySearchId}`).val(city);
    const temp = window.localStorage.getItem('temp');
    $('#flexSwitchCheckDefault').prop('checked', temp === 'true');
  }

  setWeatherData(apiResponse, tempProperty) {
    const temp = apiResponse.current[tempProperty];
    $('#temperature-value').text(`${temp}°`);
    const date = apiResponse.location.localtime;
    $('#date').text(date);
    const city = apiResponse.location.name;
    $('#city').text(city);
    const condition = apiResponse.current.condition.text;
    $('#condition').text(condition);
    const image = apiResponse.current.condition.icon;
    $('#icon').attr('src', image);
    const humidity = apiResponse.current.humidity;
    $('#humidity').text(humidity);
    const wind = apiResponse.current.wind_kph;
    $('#wind').text(wind);
    const uv = apiResponse.current.uv;
    $('#uv').text(uv);
    window.localStorage.setItem('city', city);
    window.localStorage.setItem(
        'temp',
      tempProperty === 'temp_c' ? false : true
    );
    const weatherCode = apiResponse.current.condition.code;
        $(`#background`).css("background-image", `url('${this.weatherObj[weatherCode].img}')`)
  

  }
  // generate html for the day and add it to <div class="week">
  setForecast(hourData, tempProperty, id) {
    const dateObject = new Date(hourData.time);
    const hour = dateObject.getHours();
    const imageHour = hourData.condition.icon;
    const tempHour = hourData[tempProperty];

    $(`.hours`).append(`<div class="hour">
    <span>${hour}h</span>
    <img src="${imageHour}">
    <span>${tempHour}</span>
  </div>`);
  }

  setForecastWeek(dayData, tempProperty, id) {
    const dayObject = new Date(dayData.date);
    const day = dayObject.getDate();
    const imageDay = dayData.day.condition.icon;
    const minTemp = dayData.day[`min${tempProperty}`];
    const maxTemp = dayData.day[`max${tempProperty}`];

    $(`.week`).append(`<div class="day">
    <span class="date">${day}</span>
    <img src="${imageDay}" class="image-week">
    <span class="minTemp">${minTemp}L</span>
    <span class="maxTemp">${maxTemp}H</span>
    </div>`);
  }
}
