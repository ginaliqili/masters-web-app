# masters-web-app
web app for master's thesis

What this code is trying to achieve:
- Use OpenWeatherMap to get maximum temperature and humidity for current day
- Calculate the Heat Index (HI) based on these metrics
- Color Virginia climate divisions based on severity of Heat Index (HI)

Current issues:
- Due to syntax of Leaflet JS library, I am required to give each feature in a geoJSON a style which includes the color that I am trying to assign based on HI. This value always comes back undefined!

Basing my code off an example US choropleth tutorial:
- https://leafletjs.com/examples/choropleth/

Eventual goal:
- After creating the health risk statistical model (stage 1 of thesis), I will incorporate daily HI to forecast risk for heat-related deaths in VA cliamte divisions using this web application (stage 2).

