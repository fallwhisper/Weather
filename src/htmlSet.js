export class HtmlSetter {
  constructor(citySearchId, searchButtonId) {
    this.citySearchId = citySearchId;
    this.searchButtonId = searchButtonId;
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
    // $(`#hour_${id}`).text(`${hour}h`);
    // const imageHour = hourData.condition.icon;
    // $(`#imageHour_${id}`).attr(`src`, imageHour);
    // const tempHour = hourData[tempProperty];
    // $(`#hourTemperature_${id}`).text(`${tempHour}°`);
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
    // $(`#date_${id}`).text(`${day}`);
    // const imageDay = dayData.day.condition.icon;
    // $(`#iageDate_${id}`).attr(`src`, imageDay);
    // const minTemp = dayData.day[`min${tempProperty}`];
    // $(`#minTemp_${id}`).text(minTemp);
    // const maxTemp = dayData.day[`max${tempProperty}`];
    // $(`#maxTemp_${id}`).text(maxTemp);
  }
}
