var area = ""
var lat = ""
var lon = ""
var momentTime = moment().format('MM/DD/YYYY');

function clear() {
    $(".fiveday").empty();
    $(".display").empty();
    // $("searchBar").empty();
}

// function getLatLon(input) {
//     lat = input.coord.lat;
//     lon = input.coord.lon;
// }

function getCurrentData(areaName) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + areaName + "&appid=e8f25ce1d29428f3bfaa9b91edbf1f50"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(displayWeather)
}

function get5Day(areaName) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + areaName + "&appid=e8f25ce1d29428f3bfaa9b91edbf1f50"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(display5Day)
}

$(".searchBtn").on("click", function (event) {
    event.preventDefault();
    clear();
    area = $(".searchBar").val();
    getCurrentData(area)
    get5Day(area)
    $(".fiveday").addClass("fivedayShow")
})


function convertTemp(kelvin) {
    var celsius = kelvin - 273;
    var farenheit = Math.floor(celsius * (9 / 5) + 32);
    return farenheit;
};


function displayWeather(data) {
    var nameDiv = $("<div>")
    var tempDiv = $("<div>")
    var humidityDiv = $("<div>")
    var windDiv = $("<div>")
    var uvDiv = $("<div>")

    nameDiv.addClass("card-title")
    tempDiv.addClass("body")
    humidityDiv.addClass("body")
    windDiv.addClass("body")
    uvDiv.addClass("body")

    var iconDiv = $("<div>")
    var iconCode = data.weather[0].icon
    // console.log(iconCode)
    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png"
    var weatherIcon = $("<img>").attr("src", iconURL)

    nameDiv.text(data.name + " " + momentTime);
    iconDiv.append(weatherIcon)

    nameDiv.append(iconDiv)
    tempDiv.text("Temperature: " + convertTemp(data.main.temp) + " Degrees F")
    humidityDiv.text("Humidity: " + data.main.humidity + "%")
    windDiv.text("Wind Speed: " + data.wind.speed + " MPH")
    $(".display").append(nameDiv, tempDiv, humidityDiv, windDiv)
    //put name into list:
    $(".select-name").append(data.name)

    var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=e8f25ce1d29428f3bfaa9b91edbf1f50"
    $.ajax({
        url: uvQueryURL,
        method: "GET"
    }).then(function (response) {

        uvDiv.text("UV Index: " + response.value)
        // console.log(response)
    })
    $(".display").append(uvDiv)

}
function display5Day(data) {
    var dayOne = $(".forcast1")
    var dayTwo = $(".forcast2")
    var dayThree = $(".forcast3")
    var dayFour = $(".forcast4")
    var dayFive = $(".forcast5")

    var dayOneDate = $("<div>")
    var dayOneIcon = $("<div>")
    var dayOneTemp = $("<div>")
    var dayOneHumid = $("<div>")
    var oneIconCode = data.list[4].weather[0].icon;
    var oneIconURL = "http://openweathermap.org/img/w/" + oneIconCode + ".png"
    var weatherIconOne = $("<img>").attr("src", oneIconURL)
    dayOneDate.text(moment().add(1, 'd').format('MM/DD/YYYY'));
    dayOneTemp.text("Temp: " + convertTemp(data.list[4].main.temp) + "F");
    dayOneHumid.text("Humidity: " + data.list[4].main.humidity + "%");
    dayOneIcon.append(weatherIconOne)

    var dayTwoDate = $("<div>")
    var dayTwoIcon = $("<div>")
    var dayTwoTemp = $("<div>")
    var dayTwoHumid = $("<div>")
    var twoIconCode = data.list[12].weather[0].icon;
    var twoIconURL = "http://openweathermap.org/img/w/" + twoIconCode + ".png"
    var weatherIconTwo = $("<img>").attr("src", twoIconURL)
    dayTwoDate.text(moment().add(2, 'd').format('MM/DD/YYYY'));
    dayTwoTemp.text("Temp: " + convertTemp(data.list[12].main.temp) + "F")
    dayTwoHumid.text("Humidity: " + data.list[12].main.humidity + "%")
    dayTwoIcon.append(weatherIconTwo)

    var dayThreeDate = $("<div>")
    var dayThreeIcon = $("<div>")
    var dayThreeTemp = $("<div>")
    var dayThreeHumid = $("<div>")
    var threeIconCode = data.list[20].weather[0].icon;
    var threeIconURL = "http://openweathermap.org/img/w/" + threeIconCode + ".png"
    var weatherIconThree = $("<img>").attr("src", threeIconURL)
    dayThreeDate.text(moment().add(3, 'd').format('MM/DD/YYYY'));
    dayThreeTemp.text("Temp: " + convertTemp(data.list[20].main.temp) + "F")
    dayThreeHumid.text("Humidity: " + data.list[20].main.humidity + "%")
    dayThreeIcon.append(weatherIconThree)

    var dayFourDate = $("<div>")
    var dayFourIcon = $("<div>")
    var dayFourTemp = $("<div>")
    var dayFourHumid = $("<div>")
    var fourIconCode = data.list[28].weather[0].icon;
    var fourIconURL = "http://openweathermap.org/img/w/" + fourIconCode + ".png"
    var weatherIconFour = $("<img>").attr("src", fourIconURL)
    dayFourDate.text(moment().add(4, 'd').format('MM/DD/YYYY'));
    dayFourTemp.text("Temp: " + convertTemp(data.list[28].main.temp) + "F")
    dayFourHumid.text("Humidity: " + data.list[28].main.humidity + "%")
    dayFourIcon.append(weatherIconFour)

    var dayFiveDate = $("<div>")
    var dayFiveIcon = $("<div>")
    var dayFiveTemp = $("<div>")
    var dayFiveHumid = $("<div>")
    var fiveIconCode = data.list[36].weather[0].icon;
    var fiveIconURL = "http://openweathermap.org/img/w/" + fiveIconCode + ".png"
    var weatherIconFive = $("<img>").attr("src", fiveIconURL)
    dayFiveDate.text(moment().add(5, 'd').format('MM/DD/YYYY'));
    dayFiveTemp.text("Temp: " + convertTemp(data.list[36].main.temp) + "F")
    dayFiveHumid.text("Humidity: " + data.list[36].main.humidity + "%")
    dayFiveIcon.append(weatherIconFive)

    // console.log(fiveIconCode)
    // console.log(fiveIconURL)

    dayOne.append(dayOneDate, dayOneIcon, dayOneTemp, dayOneHumid)
    dayTwo.append(dayTwoDate, dayTwoIcon, dayTwoTemp, dayTwoHumid)
    dayThree.append(dayThreeDate, dayThreeIcon, dayThreeTemp, dayThreeHumid)
    dayFour.append(dayFourDate, dayFourIcon, dayFourTemp, dayFourHumid)
    dayFive.append(dayFiveDate, dayFiveIcon, dayFiveTemp, dayFiveHumid)
}
