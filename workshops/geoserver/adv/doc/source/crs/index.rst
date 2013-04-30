.. _gsadv.crs:

Coordinate reference system management
======================================

.. warning:: Need to split up into individual pages.

Map projections
---------------

When talking about geospatial data, one must first define the numbers and units that will be used to notate that data.

On a flat (Cartesian) plane, it is straightforward to talk about where something is. Each point or vertex can be denoted by two ordinates (often referred to as x and y). The distance between two points can be easily calculated and understood.

GRAPHIC

Things get more complicated when we start dealing with the Earth (or any non-flat surface), and that is what we are concerned with when dealing with geospatial data.

Most everyone is familiar with latitude and longitude, the two ordinates that make up the location of a point on the globe. Latitude and longitude have units of degrees. Like x/y coordinates of the Cartesian plane, each coordinate describes a unique location. Unlike the Cartesian plane though, the unit of degrees does not describe a fixed distance.

GRAPHIC

All this is mentioned to bring up the point that it is not trivial to translate round surfaces to the flat plane, but crucial, as the flat plane is your computer screen or printed map. The process of moving from round surface to flat plane is called "projection". More formally:

**A map projection is a systematic transformation of the latitudes and longitudes of locations on the surface of a sphere or an ellipsoid into locations on a plane.**

There are many different ways to project a round surface on to the plane. Here are some examples:

GRAPHIC OF PROJECTIONS

Each projection has different considerations, mainly involving distortion. There will be some kind of distortion in every projection; the only question is what is distorted and to what extent. For example, certain projections, such as Albers or Sinusoidal, preserve the area of shapes, while projections such as Mercator or stereographic (called "conformal" projections, preserve angles locally. Other projections, such as the Buckminster Fuller Dymaxion map, are "compromise projections" that preserve some proportion of area, angle, shape, or scale.

Some projections are valid for only a certain area, and not for the entire globe. For example, WHAT is only valid for SOMETHING, while WHERE is only valid at SOMETHING.

The Mercator projection may be the best known projection outside of professional circles, though it is as well known for its distortions and inaccuracies as much as for its utility (the common complaint being that Greenland is seen to be as big as Africa, despite being 1/14 the size).

.. note:: Technically, the Earth's surface is not a sphere, but a spheroid, but such distinctions are beyond the scope of this discussion.

TALK ABOUT DATUMS IN HERE SOMEWHERE?


GeoServer and projections
-------------------------

GeoServer has support for a large number of projections (around 5,000). In GeoServer, they are referred to as "spatial reference systems" (SRS) or alternately, "coordinate reference systems" (CRS). The use of SRS versus CRS can be inconsistent, but they are referring to the same idea.

Typically, CRSs are noted in the form of "EPSG:####", where "####" is a numerical code that is most often four digits. The "EPSG" prefix refers to the European Petroleum Survey Group, a now-defunct entity that was instrumental in cataloging different CRSs.

To see what CRSs GeoServer supports, there is a demo in the web interface that displays a list of all the CRSs as well as their definitions.

#. Click the :guilabel:`Demos` link.

   IMAGE

#. In the list that follows, click :guilabel:`SRS List`.

   IMAGE

#. The full list will be displayed. You can click on any entry, or use the search box to filter the list by keyword or number. Enter "yukon" in the search box and press Enter.

   IMAGE

#. The list will be filtered down to two options: 3578 and 3579. Click :guilabel:`3578`.

   IMAGE

#. You will see details about this CRS, including its Well Known Text (WKT) definition. This is the formal definition of the CRS, and includes all information necessary to process geospatial data to and from this CRS. You will also see a map of the area of validity for that CRS.

   IMAGE


GeoServer and reprojection
--------------------------

Data is stored in a particular CRS. However, GeoServer is able to leverage its database of CRSs and reproject data dynamically. So while a particular layer may be stored in one CRS, it is possible to make a request for data in any CRS.

For example, let's request some data to be reprojected. For simplicity, we'll use the WMS Reflector, as it provides the simplest way to craft WMS requests.

.. note:: For more information on the WMS reflector, please see the `GeoServer documentation <http://docs.geoserver.org/stable/en/user/tutorials/wmsreflector.html>`_.

Execute this request:

http://SOMEWHERE/geoserver/wms/reflect?layers=usa:states

This will return an image of the usa:states layer over its full extent with all default options. The default CRS is EPSG:4326.

GRAPHIC

Now try the following request:

http://SOMEWHERE/geoserver/wms/reflect?layers=usa:states&srs=EPSG:3700

This returns the same data but in EPSG:3700, or "Wisconsin South (ftUS)".

http://dev.horizon.opengeo.org/geoserver/web/?wicket:bookmarkablePage=:org.geoserver.web.demo.SRSDescriptionPage&code=EPSG:3700

GRAPHIC

GeoServer has dynamically reprojected the data during the request execution. No data was or is ever stored in EPSG:3700.

Dynamic reprojection allows for a great deal of flexibility, as the same data need not be stored in multiple CRSs. However, there is a cost involved in reprojection, in that it requires extra processing time. With small data sets this is negligible, but for larger, more complex situations, the processing time can be prohibitive.

For this reason, we recommended that you **store your data in the CRS in which it will be accessed most frequently**. If you need to transform your data to this CRS, use a spatial database function such as ST_Transform in PostGIS. 

.. note:: Caching is one option that gets around the processing time, but even still, data should still be stored in its most frequently-accessed CRS for optimization.

Adding a custom projection
--------------------------

NEED AN EXAMPLE OF A LAYER THAT REQUIRES THIS

While there are a great many projections natively served by GeoServer, there will be occasions where you will encounter data that is in a CRS that is not in the EPSG database. In this case, you will need to add a custom projection to GeoServer.

We'll add EPSG:34003, with the following WKT definition::

  34003=PROJCS["Danish System 34 Jylland-Fyn",GEOGCS["ED50",DATUM["European_Datum_1950",SPHEROID["International - 1924",6378388,297.0000000000601,AUTHORITY["EPSG","7022"]],AUTHORITY["EPSG","6230"]],PRIMEM["Greenwich",0],UNIT["degree",0.0174532925199433],AUTHORITY["EPSG","4230"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",9],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",9.999999999999999e-099],UNIT["METER",1]]

HOW TO INDENT THIS PROPERLY?

To do this, we'll need to edit a file in the GeoServer catalog. This file is called :file:`epsg.properties` and it is found in :file:`user_projections/`.

#. Open the :file:`epsg.properties` file in a text editor.

#. Paste the above code at the very end of the file. It is not necessary for the EPSG codes to be in numerical order, though you can do that if you'd like.

#. Save and close the file.

#. Restart GeoServer.

#. Now go back to the SRS List (:guilabel:`Demos`, :guilabel:`SRS List`) and search for the number 34003. You should see it in the list.

   GRAPHIC

This CRS, though user-supplied, is now on equal footing with any of the other CRSs in GeoServer, and is available for dynamic reprojecting and auto-detection. 


Limiting advertised CRS list 
----------------------------

The WMS capabilities document publishes a list of all supported CRSs. As GeoServer supports so many CRSs, this list is quite long, and can make the capabilities document quite large.

However, a GeoServer instance typically only uses a small fraction of that list. So it is sometimes a good idea to limit the number of advertised CRSs that appear in the capabilities documents.

View the WMS capabilities document at http://SOMEWHERE/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities

GRAPHIC

Note all of the <CRS> tags. They comprised the vast majority of the document.

Limiting the CRS list is done through the web admin interface.

#. Click :guilabel:`WMS` under :guilabel:`Services`.

#. Under the section titled :guilabel:`Limited SRS list`, enter a list of comma-separated values, such as the following::

     2001, 2046

#. Scroll to the bottom of the page and click :guilabel:`Submit`.

#. Now view the capabilities document again and note the changed list of CRSs.

GRAPHIC

If you want to output the bounding box for each CRS on every layer, make sure to check the :guilabel:`Output bounding box for every supported CRS` box. This is useful for WHATTTTTTTT.

Note that EPSG:4326 (latitiude/longitude coordinates) will always be available.

Note that other CRSs will still be available to be manually requested, as in the following WMS reflector request:

http://SOMEWHERE/geoserver/wms/reflect?layers=usa:states&srs=EPSG:2200
http://SOMEWHERE/geoserver/wms/reflect?layers=usa:states&srs=EPSG:2900

SO WHAT'S THE POINT?


When a CRS is requested (as part of a WMS GetMap request) that is not part of the published WMS list, the request is denied.