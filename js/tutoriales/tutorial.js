var geojson = {}

var context = d3.select('#content canvas')
  .node()
  .getContext('2d');

var projection = d3.geoOrthographic()
  .scale(300);

var geoGenerator = d3.geoPath()
  .projection(projection)
  .pointRadius(4)
  .context(context);

var yaw = 100;

function update() {
  projection.rotate([yaw, -45])

  context.clearRect(0, 0, 800, 600);

  context.lineWidth = 0.5;
  context.strokeStyle = '#333';

  context.beginPath();
  geoGenerator({type: 'FeatureCollection', features: geojson.features})
  context.stroke();

  // Graticule
  var graticule = d3.geoGraticule();
  context.beginPath();
  context.strokeStyle = '#ccc';
  geoGenerator(graticule());
  context.stroke();

  yaw -= 0.2
}



// REQUEST DATA
d3.json('https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json', function(err, json) {
  geojson = json;
  window.setInterval(update, 200);
})
