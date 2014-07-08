// initialize map when page ready
var map, citiesLayer, statesLayer;

// Get rid of address bar on iphone/ipod
var fixSize = function() {
    window.scrollTo(0, 0);
    document.body.style.height = '100%';
    if (!(/(iphone|ipod)/.test(navigator.userAgent.toLowerCase()))) {
        if (document.body.parentNode) {
            document.body.parentNode.style.height = '100%';
        }
    }
};
setTimeout(fixSize, 700);
setTimeout(fixSize, 1500);

var arrayOSM = ["http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.jpg",
    "http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.jpg",
    "http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.jpg",
    "http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.jpg"
];

var init = function() {
    // create map
    map = new OpenLayers.Map({
        div: "map",
        theme: null,
        controls: [
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.Zoom(),
            new OpenLayers.Control.LayerSwitcher(),
            new OpenLayers.Control.ZoomBox({
                alwaysZoom: true
            }),
            new OpenLayers.Control.MousePosition()
        ],
        layers: [
            new OpenLayers.Layer.OSM("OpenStreetMap", null, {
                transitionEffect: 'resize',
                displayInLayerSwitcher: false
            }),
            new OpenLayers.Layer.OSM("MapQuest", arrayOSM, {
                opacity: 0.5
            }),
            new OpenLayers.Layer.WMS("States", "/geoserver/wms", {
                layers: "states",
                transparent: true
            }, {
                tileSize: new OpenLayers.Size(512, 512)
            })
        ],
        center: new OpenLayers.LonLat(742000, 5861000),
        zoom: 3,
        projection: "EPSG:900913",
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        restrictedExtent: new OpenLayers.Bounds(-15000000, -15000000, 15000000, 15000000),
        allOverlays: true
    });

    addGMLLayer("Europe (GML)", "data/europe.gml");
    addKMLLayer("Global Undersea Fiber Cables", "data/global_undersea.kml");
    addStatesLayer();
    addCitiesLayer();
    addGeoJSONLayer("World Cities (GeoJSON)", "data/world_cities.json");
    addEditingToolbar();
    addMeasureControl();
    addPopupControl();
};

function addKMLLayer(layerName, layerURL) {
    map.addLayer(
        new OpenLayers.Layer.Vector(layerName, {
            protocol: new OpenLayers.Protocol.HTTP({
                url: layerURL,
                format: new OpenLayers.Format.KML({
                    extractStyles: true,
                    extractAttributes: true
                })
            }),
            strategies: [new OpenLayers.Strategy.Fixed()],
            projection: "EPSG:4326"
        })
    );
}

function addEditingToolbar() {
    var vlayer = new OpenLayers.Layer.Vector("Editing");
    map.addLayer(vlayer);
    map.addControl(new OpenLayers.Control.EditingToolbar(vlayer));
}

function addStatesLayer() {
    statesLayer = new OpenLayers.Layer.Vector("States", {
        protocol: new OpenLayers.Protocol.WFS({
            url: "/geoserver/wfs",
            featureType: "states",
            featureNS: "http://www.openplans.org/topp"
        }),
        strategies: [new OpenLayers.Strategy.BBOX()],
        projection: "EPSG:4326",
        filter: new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.AND,
            filters: [
                new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.GREATER_THAN,
                    property: "MALE",
                    value: "700000"
                }),
                new OpenLayers.Filter.Spatial({
                    type: OpenLayers.Filter.Spatial.WITHIN,
                    value: OpenLayers.Bounds.fromArray([-120, 10, -90, 50])
                })
            ]
        })
    });
    map.addLayer(statesLayer);
}

function addCitiesLayer() {
    citiesLayer = new OpenLayers.Layer.Vector("Cities", {
        protocol: new OpenLayers.Protocol.WFS({
            url: "/geoserver/wfs",
            featureType: "capitals",
            featureNS: "http://cartaro",
            geometryName: "field_location_geometry"
        }),
        strategies: [new OpenLayers.Strategy.BBOX()],
        projection: "EPSG:4326",
        styleMap: new OpenLayers.StyleMap({
            "default": new OpenLayers.Style({
                fillColor: "#8aeeef",
                fillOpacity: 0.5,
                label: '${name}',
                pointRadius: 10
            }),
            "select": new OpenLayers.Style({
                fillColor: "yellow",
                label: '${name}',
                fillOpacity: 0.8,
                pointRadius: 10
            })
        })
    });
    citiesLayer.events.register('featureselected', this, function(event) {
        alert(event.feature.fid);
    });
    map.addLayer(citiesLayer);
}

function addGMLLayer(layerName, layerURL) {
    map.addLayer(
        new OpenLayers.Layer.Vector(layerName, {
            protocol: new OpenLayers.Protocol.HTTP({
                url: layerURL,
                format: new OpenLayers.Format.GML()
            }),
            strategies: [new OpenLayers.Strategy.Fixed()],
            projection: "EPSG:4326",
            eventListeners: {
                'loadend': function() {
                    applyUniqueValuesStyle('Europe (GML)', 'UN');
                }
            }
        })
    );
}

function addMeasureControl() {
    var maptoolbar = new OpenLayers.Control.Panel({
        allowDepress: true,
        defaultControl: ""
    });
    var distance = new OpenLayers.Control.DynamicMeasure(OpenLayers.Handler.Path, {
        displayClass: "olControlDistance"
    });
    var area = new OpenLayers.Control.DynamicMeasure(OpenLayers.Handler.Polygon, {
        displayClass: "olControlArea"
    });

    // build the measure controls
    // var optionsLine = {
    //   geodesic: true,
    //   handlerOptions: {
    //     persist: true,
    //     layerOptions: {
    //       styleMap: styleMap
    //     }
    //   },
    //   immediate: true,
    //   displayClass: "olControlMeasureDistance",
    //   title: $.i18n._("measuredistance")
    // };

    // var optionsPolygon = {
    //   geodesic: true,
    //   handlerOptions: {
    //     persist: true,
    //     layerOptions: {
    //       styleMap: styleMap
    //     }
    //   },
    //   immediate: true,
    //   displayClass: "olControlMeasureArea",
    //   title: $.i18n._("measurearea")
    // };

    maptoolbar.addControls([distance, area]);
    map.addControl(maptoolbar);
}

function addPopupControl() {
    var fpControl = new OpenLayers.Control.FeaturePopups({
        boxSelectionOptions: {},
        layers: [
            [
                // Uses: Templates for hover & select and safe selection
                citiesLayer, {
                    templates: {
                        // hover single
                        hover: '${.name}',
                        // select: single & list
                        single: '<div><h2>${.name}</h2>${.body_value}</div>'
                    }
                }
            ]
        ]
    });
    map.addControl(fpControl);
}

function addGeoJSONLayer(layerName, layerURL) {
    var colors = {
        low: "rgb(181, 226, 140)",
        middle: "rgb(241, 211, 87)",
        high: "rgb(253, 156, 115)"
    };
    var lowRule = new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.LESS_THAN,
            property: "count",
            value: 15
        }),
        symbolizer: {
            fillColor: colors.low,
            fillOpacity: 0.9,
            strokeColor: colors.low,
            strokeOpacity: 0.5,
            strokeWidth: 12,
            pointRadius: 10,
            label: "${count}",
            labelOutlineWidth: 1,
            fontColor: "#ffffff",
            fontOpacity: 0.8,
            fontSize: "12px"
        }
    });
    var middleRule = new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.BETWEEN,
            property: "count",
            lowerBoundary: 15,
            upperBoundary: 50
        }),
        symbolizer: {
            fillColor: colors.middle,
            fillOpacity: 0.9,
            strokeColor: colors.middle,
            strokeOpacity: 0.5,
            strokeWidth: 12,
            pointRadius: 15,
            label: "${count}",
            labelOutlineWidth: 1,
            fontColor: "#ffffff",
            fontOpacity: 0.8,
            fontSize: "12px"
        }
    });
    var highRule = new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.GREATER_THAN,
            property: "count",
            value: 50
        }),
        symbolizer: {
            fillColor: colors.high,
            fillOpacity: 0.9,
            strokeColor: colors.high,
            strokeOpacity: 0.5,
            strokeWidth: 12,
            pointRadius: 20,
            label: "${count}",
            labelOutlineWidth: 1,
            fontColor: "#ffffff",
            fontOpacity: 0.8,
            fontSize: "12px"
        }
    });

    // Create a Style that uses the three previous rules
    var style = new OpenLayers.Style(null, {
        rules: [lowRule, middleRule, highRule]
    });

    map.addLayer(
        new OpenLayers.Layer.Vector(layerName, {
            protocol: new OpenLayers.Protocol.HTTP({
                url: layerURL,
                format: new OpenLayers.Format.GeoJSON()
            }),
            renderers: ['Canvas', 'SVG'],
            styleMap: new OpenLayers.StyleMap(style),
            strategies: [
                new OpenLayers.Strategy.Fixed(),
                new OpenLayers.Strategy.AnimatedCluster({
                    distance: 45,
                    animationMethod: OpenLayers.Easing.Expo.easeOut,
                    animationDuration: 10
                })
            ],
            projection: "EPSG:4326"

        })
    );
}

function applyUniqueValuesStyle(layerName, property) {
    var layer = map.getLayersByName(layerName, property)[0];
    var features = layer.features;

    var uniqueStyles = {},
        f;
    for (var i = 0, l = features.length; i < l; i++) {
        f = features[i];
        uniqueStyles[f.attributes[property]] = {
            fillColor: "#" + f.attributes[property]
        };
    }

    var styleMap = new OpenLayers.StyleMap();
    styleMap.addUniqueValueRules("default", property, uniqueStyles);
    layer.styleMap = styleMap;
    layer.redraw();
}

function transformCoordinates(point, from, to) {
    return point.transform(new OpenLayers.Projection(from), new OpenLayers.Projection(to));
}