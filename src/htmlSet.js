export class HtmlSetter {
    setWeatherData(apiResponse, tempProperty) {
        const temp = apiResponse.current[tempProperty]
        $("#temperature-value").text(`${temp}°`);
        const date = apiResponse.location.localtime;
        $("#date").text(date); 
        const city = apiResponse.location.name;
        $("#city").text(city);
        const condition = apiResponse.current.condition.text;
        $("#condition").text(condition);
        const image = apiResponse.current.condition.icon;
        $("#icon").attr('src', image);
        const humidity = apiResponse.current.humidity;
        $("#humidity").text(humidity);
        const wind = apiResponse.current.wind_kph;
        $("#wind").text(wind);
        const uv = apiResponse.current.uv;
        $("#uv").text(uv);
    }
    setForecast(apiResponse, tempProperty){
        const hour = apiResponse.forecast.forecastday[0].hour[0].time;
        $(".hour").text(`${hour}h`);
        const imageHour = apiResponse.forecast.forecastday[0].hour[0].condition.icon;
        $(".imageHour").attr('src', imageHour);
        const tempHour = apiResponse.forecast.forecastday[0].hour[0][tempProperty];
        $(".tempHour").text(`${tempHour}°`);
    }
    setForecastWeek(apiResponse, tempProperty){

    }
}