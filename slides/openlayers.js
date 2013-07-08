<div class="slides">
    <section>
        <h2>
<img src="https://s3.amazonaws.com/media-p.slid.es/uploads/albertoromeu/images/41364/slide_first.png">
        <br>
</h2>
    </section>
    <section data-background-color="rgba( 0, 0, 0, 0.6 )">
        <h1>
            <font color="#d9d9d9">Open Layers Workshop</font>
            </h1>
<div>
<font color="#ffffff">Jorge Sanz - </font>
            <a href="http://twitter.com/xurxosanz">
                <font color="#ffe599">@xurxosanz</font>
                </a>
</div>
<div>
<font color="#ffffff">Alberto Romeu - </font>
                <a href="http://twitter.com/alrocar">
                    <font color="#ffe599">@alrocar</font>
                </a>
</div>
            </section>
            <section>
                <h2>Objectives</h2>
<div>
    <ol style="text-align:left;">
<li>Learn why to use Open Layers</li>
<li>Understand OL concepts: map, layers,...</li>
<li>Learn how to</li>
<ol>
<li>add WMS and cached layers</li>
<li>add WFS and other vector layers</li>
<li>add some interactivity to your map</li>
<li>apply rules to your vector layers</li>
<li>apply styles to your vector layers&nbsp;</li>
</ol>
</ol>
</div>
</section>
                <section>
                    <h2>Outline</h2>
<div>
<ol style="text-align:left;">
<li>The Open Layers project</li>
    <li>Open Layers basics</li>
    <li>Working with layers</li>
    <li>Working with controls</li>
    <li>Vector layers</li>
</ol>
</div>

</section>
                    <section data-background-color="rgba( 22, 152, 213, 0.6 )">
                        <h1 class="absolute-element" style="position: absolute; width: 667px; height: 126px; z-index: 4; left: 148px; top: 173px;">
                            <font color="#ffffff">Open Layers</font>
                        </h1>

<div class="absolute-element" style="position: absolute; width: 291px; height: 261px; z-index: 4; left: 329px; top: 295px;">
<img src="http://live.osgeo.org/_images/logo-OpenLayers-large4.png">&nbsp;<h1 class="absolute-element" style="position: absolute; width: 667px; height: 126px; z-index: 4; left: 139px; top: 229px;">
</h1>
</div>

</section>
                        <section>
                            <div>
    <ul>
<li>
            <font style="font-size: 54px;">
                            <a href="http://openlayers.org">http://openlayers.org</a>
        </font>
</li>
        <li>
            <font style="font-size: 54px;">
                            <a href="http://www.osgeo.org">OSGeo</a> project</font>
</li>
            <li>
                            <font style="font-size: 54px;">Started in 2006 (<a href="http://trac.osgeo.org/openlayers/wiki/History">history</a>)</font>
                        </li>
            <li>
                        <font style="font-size: 54px;">95 contributors and almost 200k LOC (<a href="http://www.ohloh.net/p/openlayers">statistics</a>)</font>
                    </li>
            <li>
                    <font style="font-size: 54px;">2.13 stable release (will use this)</font>
                </li>
            <li>
                <font style="font-size: 54px;">3.0 next major release</font>
            </li>
                </ul>
</div>
</section>
            <section>
                <ul>
<li style="font-style: normal; font-variant: normal;">
                <font style="font-size: 54px;">
                <font>Mature, well established</font>
            </font>
</li>
            <li style="font-style: normal; font-variant: normal;">
                <font style="font-size: 54px;">
                <font>For years THE web mapping framework</font>
            </font>
</li>
            <li style="font-style: normal; font-variant: normal;">
                <font style="font-size: 54px;">
                <font>New challenges and competition (<a href="http://leafletjs.com/">Leaflet</a>)</font>
            </font>
</li>
            <li style="font-style: normal; font-variant: normal;">
                <font style="font-size: 54px;">
                <font>
                    <a href="http://lists.osgeo.org/mailman/listinfo/openlayers-users">Users</a>&nbsp;and&nbsp;<a href="http://lists.osgeo.org/mailman/listinfo/openlayers-dev">developers</a>&nbsp;mailing lists</font>
                </font>
</li>
                <li style="font-style: normal; font-variant: normal;">
                    <font style="font-size: 54px;">
                        <a href="https://www.packtpub.com/openlayers-2-1-javascript-web-mapping-library-beginners-guide/book">Beginner's guide</a>&nbsp;and&nbsp;<a href="http://www.packtpub.com/openlayers-create-gis-web-applications-cookbook/book">cookbook</a>&nbsp;available</font>
                    </li>
        </ul>
            </section>
            <section data-background-color="rgba( 22, 152, 213, 0.6 )">
                <h1 class="absolute-element" style="position: absolute; width: 967px; height: 241px; z-index: 4; left: -7px; top: 188px;">
                    <font color="#ffffff">Open Layers basics</font>
                </h1>
            </section>
            <section>
                <h2>Your first map</h2>
<div>
<img src="http://girona-openlayers-workshop.readthedocs.org/en/latest/_images/map1.png" style="height: 371px;">
                <br>
</div>
            </section>
            <section>
                <h2>Dissect your map</h2>
<div>
                <ul>
<li>markup</li>
<ul>
                <li>where you put the map</li>
            </ul>
<li>styles</li>
<ul>
            <li>
                <span>how big is your map?</span>
            </li>
        </ul>
<li>initialization code</li>
<ul>
<li>after loading OL library</li>
<li>order is important</li>
</ul>
</ul>
    </div>
</section>
<section>
    <h2>Open Layers resources</h2>
<div>
    <ul>
<li>Your&nbsp;<b>best</b>&nbsp;friend:&nbsp;<a href="http://docs.openlayers.org/">documentation</a>
<ul>
<li>
        <a href="http://docs.openlayers.org/library/layers.html">Layers</a>
    </li>
</ul>
</li>
<li class="fragment" data-fragment-index="0">Your <b>really best</b> friend: <a href="http://openlayers.org/dev/examples/">examples</a>
        <ul>
<li>
            <a href="http://openlayers.org/dev/examples/wms.html">Load WMS layer</a>
</li>
</ul>
</li>
    <li class="fragment" data-fragment-index="1">Your <b>inevitable</b> friend: <a href="http://dev.openlayers.org/apidocs/files/OpenLayers-js.html">API docs</a>
        <ul>
<li>
            <a href="http://dev.openlayers.org/apidocs/files/OpenLayers/Layer-js.html">OpenLayers.Layer</a> jsdoc</li>
        </ul>
</li>
    <li class="fragment" data-fragment-index="2">Your "<b>always there</b>" friend: sources!
    <ul>
<li>
            <a href="https://github.com/openlayers/openlayers/blob/master/lib/OpenLayers/Layer.js">Layer.js</a> source code on github</li>
        </ul>
</li>
</ul>
</div>

</section>
    <section data-background-color="rgba( 22, 152, 213, 0.6 )">
        <h1 class="absolute-element" style="position: absolute; width: 967px; height: 241px; z-index: 4; left: -5px; top: 206px;">
            <font color="#ffffff">Working with layers</font>
        </h1>
    </section>
    <section>
        <h2>WMS Layers</h2>
<div>
        <ul>
<li>Constructor with 3 parameters</li>
<ul>
<li>Name of the layers in your viewer</li>
<li>URL of the service</li>
<li>Parameters to pass to the service</li>
<ul>
<li>WMS layers to load</li>
<li>image format</li>
<li>transparency</li>
<li>...</li>
</ul>
</ul>
</ul>
    </div>
</section>
<section>
    <h2>Cached layers</h2>
<div>
    <ul>
<li>Images already rendered at the server</li>
<li>Several formats</li>
<li>OpenStreetMap is a typical base map</li>
<li>EPSG:3857 (see <a href="http://www.epsg-registry.org/">epsg-registry</a> for details)</li>
<li>OSM accepts custom urls</li>
</ul>
</div>
</section>
<section>
    <h2>Proprietary layers</h2>
<div>
    <ul>
<li>There are some proprietary <br>services available by default</li>
<ul>
<li>Bing</li>
<li>Google Maps</li>
<li>ArcIMS</li>
<li>ArcGIS Server REST (9.3)</li>
</ul>
<li>Others via custom code</li>
<ul>
<li>
    <a href="http://developers.cloudmade.com/projects/tiles/documents">Cloudmade</a>
</li>
<li>
<a href="http://openlayers.org/dev/examples/mapbox.html">MapBox</a>
</li>
</ul>
<li>Usually need to accept a Terms of Service,<br>get an API key, etc.</li>
</ul>
</div>
</section>
<section>
    <h2>Vector Layers</h2>
<div style="text-align: center;">Minimum parameters of a vector layer constructor:<span>&nbsp;</span>
</div>
<div>
<div>
    <ul>
<li>A layer name</li>
        <li>A configuration object with:</li>
        <ul>
<li>A list o strategies</li>
<ul>
<li>When your data is requested</li>
<li>Ordered</li>
<li>Independent</li>
</ul>
<li>A protocol</li>
<ul>
<li>How your data is requested</li>
<li>Deal with data format</li>
</ul>
</ul>
</ul>
</div>
</div>
</section>
    <section>
        <h2>Bonus exercises</h2>
<div>
        <ul>
            <ul>
<li>Visit the USGS web portal and try to represent other earthquakes documents (KML for example?)</li>
<li>Create a selection control and try to show below your map additional information stored on your earthquakes vector layer</li>
</ul>
        </ul>
    </div>
</section>
<section>
    <h2>Bonus exercises<br>
</h2>
<div>
<img src="http://i.imgur.com/X6wqCBo.png" style="font-size: 35.4107666015625px; font-style: normal; font-variant: normal; text-align: left; height: 570px;">
    <br>
</div>
</section>
<section data-background-color="rgba( 22, 152, 213, 0.6 )">&nbsp;<h1 class="absolute-element" style="position: absolute; width: 967px; height: 241px; z-index: 4; left: 2px; top: 235px;">
    <font color="#ffffff">Working with Controls</font>
</h1>
</section>
<section>
    <h2>Controls</h2>
<div>
    <ul>
<li>Add interactivity to the map</li>
<li>Not all provide a user interface</li>
<li>Some are loaded by default</li>
<ul>
<li>Navigation</li>
<li>PanZoom</li>
</ul>
<li>Examples:</li>
<ul>
<li>Overview map</li>
<li>Scale line</li>
<li>Selection tools</li>
<li>Drawing tools</li>
<li>and many <a href="http://dev.openlayers.org/docs/files/OpenLayers/Control-js.html">more</a>
</li>
</ul>
</ul>
</div>
</section>
<section data-background-color="rgba( 22, 152, 213, 0.6 )">&nbsp;<h1 class="absolute-element" style="position: absolute; width: 729px; height: 126px; z-index: 4; left: 113px; top: 290px;">
    <font color="#ffffff">Vector Layers</font>
</h1>
</section>
<section>
    <h2>Open Layers and vector concepts</h2>
<blockquote>"Dealing with vector layers and features is like a postal service"</blockquote>
<p>
</p>
<ul>
<li>Format:&nbsp;</li>
<ul>
<li>the language of your letters</li>
<li>let's play with <a href="http://openlayers.org/dev/examples/vector-formats.html">this example</a>
</li>
</ul>
<li>Protocol</li>
<ul>
<li>the way you put your address on the envelope</li>
<li>independent of the format or the features</li>
</ul>
<li>Strategy</li>
<ul>
<li>when you send your letter to the addressee</li>
</ul>
</ul>
</section>
<section>
    <h2>Creating new features</h2>
<div>
    <ul>
<li>Just create, without persisting yet</li>
<li>Create a checkbox to activate/deactivate the control</li>
<li>Create a OpenLayers.Control.DrawFeature</li>
<li>Create a function to toggle the control</li>
</ul>
</div>
</section>
<section>
    <h2>Persisting features</h2>
<div>
    <ul>
<li>We use the transactional profile of WFS</li>
<li>We need to add a couple of controls</li>
<li>Add the OpenLayers.Strategy.Save</li>
<li>Add a new EditingPanel control to the map</li>
<li>Check the changes on the GeoServer layer preview</li>
</ul>
</div>
</section>
<section>
    <h2>Vector Styling</h2>
<div>
    <ul>
<li>To apply a style we need to use <b>filters</b>
</li>
<li>
<b>Symbolizers</b> are similar to CSS</li>
<li>A <b>rule</b>&nbsp;joins a filter with a symbolizer</li>
<li>A <b>style</b> is a group of rules with a default symbolizer</li>
<li>A <b>style map</b> is a map of render intents with styles</li>
</ul>
</div>
</section>
</div>
