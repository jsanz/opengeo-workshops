Ext.util.CSS.swapStyleSheet('opengeo-theme', 'resources/css/xtheme-opengeo.css');

Ext.onReady(function () {

  // Use this word on startup
  var startWord = "ocean";

  // Base map
  var osmLayer = new OpenLayers.Layer.OSM();

  // Heat map + point map
  var wmsLayer = new OpenLayers.Layer.WMS("WMS", 
    // Uncomment below to use your local server
    // "http://localhost:8080/geoserver/wms", 
    "http://apps.opengeo.org/geoserver/wms", 
  {
    format: "image/png8",
    transparent: true,
    layers: "opengeo:geonames,opengeo:geonames",
    styles: "point,heatmap"
  }, {
    opacity: 0.6,
    singleTile: true,
  });

  // Start with map of startWord
  wmsLayer.mergeNewParams({viewparams: "word:"+startWord});

  // Projection info for map
  var geographicProj = new OpenLayers.Projection("EPSG:4326");
  var mercatorProj = new OpenLayers.Projection("EPSG:900913");

  // Convert center point to projected coordinates
  var mapCenter = new OpenLayers.LonLat(-110,45).transform(geographicProj, mercatorProj);

  // Map with projection into (required when mixing base map with WMS)
  olMap = new OpenLayers.Map({
    projection: mercatorProj,
    displayProjection: geographicProj,
    units: "m",
    layers: [wmsLayer, osmLayer],
    center: mapCenter
  });

  // Text field component. On 'enter' update the WMS URL
  var wordField = new Ext.form.TextField({
    value: startWord,
    listeners: {
      specialkey: function(field, e) {
        // Only update the word map when user hits 'enter' 
        if (e.getKey() == e.ENTER) {
          wmsLayer.mergeNewParams({viewparams: "word:"+field.getValue()});
        }
      }
    }
  });

  // Map panel, with text field embedded in top toolbar
  var mapPanel = new GeoExt.MapPanel({
    region: "center",
    headerAsText: false,
    header: false,
    title: "Boundless Word Map",
    tbar: ["Enter a word to map:", wordField],
    map: olMap
  });

  // Draw the map into the 'wordmap' <div>
  mapPanel.render("wordmap");
  
});


