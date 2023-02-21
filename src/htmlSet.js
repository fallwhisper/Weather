export class HtmlSetter {
    setWeatherData(temp, city) {
        $("#temperature-value").text(temp);
        $("#city").text(city)
    }
}