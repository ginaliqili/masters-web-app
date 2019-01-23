//TODO: Create function to get all NOAA weather stations categorize into climate divisions
// Herndon (Northern), Asberrys (Southwestern Mountain), Williamsville (Central Mountain), Huddleston (Western Piedmont), Lodore (Eastern Piedmont), Talleysville (Tidewater)
var coordinates = {
    'NORTHERN': [38.971166, -77.391141], 
    'SOUTHWESTERN MOUNTAIN': [37.024971, -81.501749], 
    'CENTRAL MOUNTAIN': [38.085100, -79.695909], 
    'WESTERN PIEDMONT': [37.103588, -79.487859], 
    'EASTERN PIEDMONT': [37.457468, -78.051378], 
    'TIDEWATER': [37.525816, -77.065183]
}


function callback(name, HI, humidity, temp_max_f) {
    console.log(name, HI, humidity, temp_max_f)
    var color = 
           HI >= 100 ? '#800026' :
           HI >= 90  ? '#BD0026' :
           HI >= 80  ? '#E31A1C' :
           HI >= 70  ? '#FC4E2A' :
           HI >= 60  ? '#FD8D3C' :
           HI >= 50  ? '#FEB24C' :
           HI >= 40  ? '#FED976' :
           HI >= 30  ? '#b2d0e4' :
           HI >= 20  ? '#5b86a3' :
           HI >= 10  ? '#24516f' :
                      '#FFEDA0';
    console.log(color)

    /*
    var obj = climDivData['features'];
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        console.log(obj[keys[i]]['properties']['NAME'])
    }
    */
}



// Get Heat Index for each climate division for current day
function getHeatIndexColor([lat, lon], name) {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=0bd2d25f8ba23d6922bc5c6f81d9d049'
    var HI;

    
    $.getJSON(url, function(data){
        var humidity = data['main']['humidity']
        var temp_max_k = data['main']['temp_max']
        // convert Kelvin to Fahrenheit
        temp_max_f = temp_max_k * (9/5)-459.67
        // calculate heat index
        HI = 0.5 * (temp_max_f + 61.0 + ((temp_max_f-68.0)*1.2) + (humidity*0.094))
        if (HI >= 80){
            HI = -42.379 + 2.04901523*temp_max_f + 10.14333127*humidity - .22475541*temp_max_f*humidity 
            - .00683783*temp_max_f*temp_max_f - .05481717*humidity*humidity + .00122874*temp_max_f*temp_max_f*humidity + .00085282*temp_max_f*humidity*humidity - .00000199*temp_max_f*temp_max_f*humidity*humidity
        }

        if (humidity < 13 && temp_max_f > 80 && temp_max_f < 112) {
            HI = HI-((13-humidity)/4)*SQRT((17-ABS(temp_max_f-95))/17)
        }

        if (humidity > 85 && temp_max_f > 80 && temp_max_f < 87) {
            HI = HI + ((humidity-85)/10) * ((87-temp_max_f)/5)
        }
        callback(name, HI, humidity, temp_max_f)
    });

    var color = 
    HI >= 100 ? '#800026' :
    HI >= 90  ? '#BD0026' :
    HI >= 80  ? '#E31A1C' :
    HI >= 70  ? '#FC4E2A' :
    HI >= 60  ? '#FD8D3C' :
    HI >= 50  ? '#FEB24C' :
    HI >= 40  ? '#FED976' :
    HI >= 30  ? '#b2d0e4' :
    HI >= 20  ? '#5b86a3' :
    HI >= 10  ? '#24516f' :
               '#FFEDA0';
    console.log("hi")
    console.log(color)
    
}


function style(feature) {

    name = feature.properties.NAME;

    var color = getHeatIndexColor(coordinates[name], name);
    return {
        fillColor: color,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };

}


function getHeatIndexColor2([lat, lon], name) {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=0bd2d25f8ba23d6922bc5c6f81d9d049'
    var HI; 

    var response = $.getJSON(url, function(data){});
    var humidity = response['main']['humidity']
        var temp_max_k = response['main']['temp_max']
        // convert Kelvin to Fahrenheit
        temp_max_f = temp_max_k * (9/5)-459.67
        // calculate heat index
        HI = 0.5 * (temp_max_f + 61.0 + ((temp_max_f-68.0)*1.2) + (humidity*0.094))
        if (HI >= 80){
            HI = -42.379 + 2.04901523*temp_max_f + 10.14333127*humidity - .22475541*temp_max_f*humidity 
            - .00683783*temp_max_f*temp_max_f - .05481717*humidity*humidity + .00122874*temp_max_f*temp_max_f*humidity + .00085282*temp_max_f*humidity*humidity - .00000199*temp_max_f*temp_max_f*humidity*humidity
        }

        if (humidity < 13 && temp_max_f > 80 && temp_max_f < 112) {
            HI = HI-((13-humidity)/4)*SQRT((17-ABS(temp_max_f-95))/17)
        }

        if (humidity > 85 && temp_max_f > 80 && temp_max_f < 87) {
            HI = HI + ((humidity-85)/10) * ((87-temp_max_f)/5)
        }
    console.log(HI)
    var color = 
    HI >= 100 ? '#800026' :
    HI >= 90  ? '#BD0026' :
    HI >= 80  ? '#E31A1C' :
    HI >= 70  ? '#FC4E2A' :
    HI >= 60  ? '#FD8D3C' :
    HI >= 50  ? '#FEB24C' :
    HI >= 40  ? '#FED976' :
    HI >= 30  ? '#b2d0e4' :
    HI >= 20  ? '#5b86a3' :
    HI >= 10  ? '#24516f' :
               '#FFEDA0';

    console.log(color)
    return {
        fillColor: color,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
    
}

function style2(feature) {
    name = feature.properties.NAME;

    return getHeatIndexColor2(coordinates[name], name).then(function(){
        return {
            fillColor: color,
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    });
    
}






