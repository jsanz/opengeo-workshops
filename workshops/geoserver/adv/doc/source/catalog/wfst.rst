.. _gsadv.catalog.wfs:

Transactional WFS
=================


What is WFS-T?
--------------

We know what WFS is (I hope) - It's the ~feature analog~ to WMS.

We have seen some examples (which is one reason why I hope we recall what WFS is)

We should understand that just like we can do WMS GetMaps we can do WFS GetFeatures.

_Unlike_ WMS from which we can only get information, WFS allows us to POST information to the server to effect transactions against our underlying data ...

The Web Feature Service (WFS) is a standard created by the OGC that refers to the sending and receiving of geospatial data through HTTP.

WFS encodes and transfers information in GML (Geography Markup Language), which is a subset of XML.

The current version of WFS is 1.1.0. GeoServer supports both version 1.1.0 (the default since GeoServer 1.6.0) and version 1.0.0.

There are differences between these two formats, some more subtle than others, and this will be noted where differences arise.

The current version of WFS is 1.1. WFS version 1.0 is still used in places, and we will note where there are differences. However, the syntax will often remain the same.

Benefits of WFS

One can think of WFS as the “source code” to the maps that one would ordinarily view (via WMS). WFS leads to greater transparency and openness in mapping applications. Instead of merely being able to look at a picture of the map, as the provider wants the user to see, the power is in the hands of the user to determine how to visualize (style) the raw geographic and attribute data. The data can also be downloaded, further analyzed, and combined with other data. The transactional capabilities of WFS allow for collaborative mapping applications. In short, WFS is what enables open spatial data.

WFS-T example
-------------

Let's go back to our Demo Request Builder ...

We saw examples of POST'ing XML/GML to the WFS end-point in our previous OGC encoded filter demo ...

There we were basically doing <wfs:GetFeature/>s with <wfs:Query> child elements against the base WFS end-point ...

> http://localhost:8080/geoserver/wfs

There are a ton of examples included ... Some we may need to edit to match our data:

<wfs:GetFeature service="WFS" version="1.1.0"

 xmlns:earth="http://earth.opengeo.org"

 xmlns:wfs="http://www.opengis.net/wfs"

 xmlns:ogc="http://www.opengis.net/ogc"

 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

 xsi:schemaLocation="http://www.opengis.net/wfs

                     http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">

 <wfs:Query typeName="earth:cities">

   <ogc:Filter>

      <ogc:FeatureId fid="cities.3"/>

   </ogc:Filter>

   </wfs:Query>

</wfs:GetFeature>

<wfs:GetFeature service="WFS" version="1.1.0"

 xmlns:earth="http://earth.opengeo.org"

 xmlns:wfs="http://www.opengis.net/wfs"

 xmlns:ogc="http://www.opengis.net/ogc"

 xmlns:gml="http://www.opengis.net/gml"

 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

 xsi:schemaLocation="http://www.opengis.net/wfs

                     http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">

 <wfs:Query typeName="earth:cities">

   <wfs:PropertyName>earth:name</wfs:PropertyName>

   <wfs:PropertyName>earth:pop_max</wfs:PropertyName>

   <ogc:Filter>

     <ogc:BBOX>

       <ogc:PropertyName>geom</ogc:PropertyName>

       <gml:Envelope srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">

          <gml:lowerCorner>-45 -45</gml:lowerCorner>

          <gml:upperCorner>45 45</gml:upperCorner>

       </gml:Envelope>

     </ogc:BBOX>

  </ogc:Filter>

 </wfs:Query>

</wfs:GetFeature>

<wfs:GetFeature service="WFS" version="1.0.0"

 xmlns:earth="http://earth.opengeo.org"

 xmlns:wfs="http://www.opengis.net/wfs"

 xmlns:ogc="http://www.opengis.net/ogc"

 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

 xsi:schemaLocation="http://www.opengis.net/wfs

                     http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">

 <wfs:Query typeName="earth:cities">

   <ogc:Filter>

     <ogc:PropertyIsEqualTo>

        <ogc:PropertyName>name</ogc:PropertyName>

        <ogc:Literal>Toronto</ogc:Literal>

   </ogc:PropertyIsEqualTo>

   </ogc:Filter>

   </wfs:Query>

</wfs:GetFeature>


Note among the list of Demo Requests that (towards the bottom) there are several examples of wfs:Transactions ...

Click one ... > Delete ...

And we see that the end-point is our old friend ...

> http://localhost:8080/geoserver/wfs 

And that our XML POST content is similar but different in that ...

> The root node is now <wfs:Transaction/>s with a <wfs:Delete> (eg) child element

The content of the child element is an ogc-compliant filter that isolates the transaction to one record ... 

<wfs:Transaction>

    <wfs:Delete>

            blah blah blah

    </wfs:Delete>

</wfs:Transaction>



DELETE

Let's illustrate this discussion with an example ...

Modify the POST content so that it actually hits a some data that a) exists and b) we don't care about ...

Zing!

(Like most Canadians, I like to poke fun at Toronto.)

(Unlike most Canadians, I consider everything between Vancouver and Quebec City part of Toronto).

<wfs:Transaction service="WFS" version="1.0.0"

 xmlns:ogc="http://www.opengis.net/ogc"

 xmlns:wfs="http://www.opengis.net/wfs"

 xmlns:earth="http://earth.opengeo.org">

 <wfs:Delete typeName="earth:cities">

   <ogc:Filter>

     <ogc:PropertyIsEqualTo>

       <ogc:PropertyName>earth:name</ogc:PropertyName>

       <ogc:Literal>Toronto</ogc:Literal>

     </ogc:PropertyIsEqualTo>

   </ogc:Filter>

 </wfs:Delete>

</wfs:Transaction>

Preview at ...

http://localhost:8080/geoserver/wms/reflect?layers=earth&format=application/openlayers

Honey, we're never going back to Toronto!


UPDATE

Another option for our WFS-Transactions is Update ...

This does exactly what you think it does ...

Same endpoint ...

    > http://localhost:8080/geoserver/wfs

Different content ...

    (select, paste, generate, or hand-bomb it) ...

    I'm filtering by FID here ...

        > It's easy to encode,

        > (And we have it on hand from a previous example)

    For lack of a better example ... Let's imagine that:

> In Luxembourg everything is so magical, that it should be called Deluxembourg!

    (Why not we can change it back when we're done)

    Note:

> The Name/Value of property we're changing

> The filter to isolate the change

<wfs:Transaction service="WFS" version="1.0.0"

 xmlns:earth="http://earth.opengeo.org"

 xmlns:ogc="http://www.opengis.net/ogc"

 xmlns:wfs="http://www.opengis.net/wfs">

 <wfs:Update typeName="earth:cities">

   <wfs:Property>

     <wfs:Name>name</wfs:Name>

     <wfs:Value>Deluxembourg!!!</wfs:Value>

   </wfs:Property>

   <ogc:Filter>

     <ogc:FeatureId fid="cities.3"/>

   </ogc:Filter>

 </wfs:Update>

</wfs:Transaction>

Preview

http://localhost:8080/geoserver/wms/reflect?layers=earth&format=application/openlayers



INSERT


Lastly (and I have no idea why I reversed the order of these operations ...)

We can invoke Inserts statements against WFS to add new records to feature-sets ...

The endpoint is the same ...

    > http://localhost:8080/geoserver/wfs

We can in fact add entirely unreasonable zig-zaggy rivers called "Sammy" in the middle of the Atlantic ocean to our rivers dataset by POST'ing something like this ...

<wfs:Transaction service="WFS" version="1.0.0"

 xmlns:wfs="http://www.opengis.net/wfs"

 xmlns:earth="http://earth.opengeo.org"

 xmlns:gml="http://www.opengis.net/gml"

 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

 xsi:schemaLocation="http://www.opengis.net/wfs   http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd http://usa.opengeo.org http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=usa:tasmania_roads">

 <wfs:Insert>

   <earth:rivers>

     <earth:geom>

       <gml:MultiLineString srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">

         <gml:lineStringMember>

           <gml:LineString>

             <gml:coordinates decimal="." cs="," ts=" ">

               -20,0 -10,10 10,-10 20,0

             </gml:coordinates>

           </gml:LineString>

         </gml:lineStringMember>

       </gml:MultiLineString>

     </earth:geom>

     <earth:name>Sammy</earth:name>

   </earth:rivers>

 </wfs:Insert>

</wfs:Transaction>

Preview at ...

    > http://localhost:8080/geoserver/wms/reflect?layers=earth&format=application/openlayers

    > Whoomp, there it is ...



TRANSACTIONS PLURAL


One last note to wrap up our WFS-T work-through ... We can add many, heterogeneous transaction children to a wfs:Transaction document, POST it to the server, (and do many things in one request) ...

So, I take it all back ...

* Toronto's not so bad

* Luxembourg is actually just meh

* And the river Sammy is a pipe dream

<wfs:Transaction service="WFS" version="1.0.0"

 xmlns:wfs="http://www.opengis.net/wfs"

 xmlns:earth="http://earth.opengeo.org"

 xmlns:ogc="http://www.opengis.net/ogc"

 xmlns:gml="http://www.opengis.net/gml"

 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

 xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd">

 

 <!-- LUXEMBOURG, MEH -->

 <wfs:Update typeName="earth:cities">

   <wfs:Property>

     <wfs:Name>name</wfs:Name>

     <wfs:Value>Luxembourg</wfs:Value>

   </wfs:Property>

   <ogc:Filter>

     <ogc:FeatureId fid="cities.3"/>

   </ogc:Filter>

 </wfs:Update>

   

 <!-- AU REVOIR SAMMY -->

 <wfs:Delete typeName="earth:rivers">

   <ogc:Filter>

     <ogc:PropertyIsEqualTo>

       <ogc:PropertyName>earth:name</ogc:PropertyName>

       <ogc:Literal>Sammy</ogc:Literal>

     </ogc:PropertyIsEqualTo>

   </ogc:Filter>

 </wfs:Delete>

 <!-- BRING SEXY BACK -->

 <wfs:Insert>

   <earth:cities>

   <earth:geom>

     <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">

       <gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">

         -79.496,43.676

       </gml:coordinates>        

     </gml:Point>

   </earth:geom>

   <earth:name>T'rana</earth:name>

   </earth:cities>

 </wfs:Insert>

 

</wfs:Transaction>