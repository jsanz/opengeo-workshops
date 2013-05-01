.. _gsadv.crs.projection:

Map projections
===============

What is a projection?
---------------------

When talking about geospatial data, one must first define the numbers and units that will be used to notate that data.

On a flat (Cartesian) plane, it is straightforward to talk about "where" something is. Each point or vertex can be denoted by two ordinates (often referred to as **x** and **y**). The distance between two points can be easily calculated and understood.

.. figure:: img/proj_cartesianpoints.png

   Points on the Cartesian plane

Things get more complicated when we start dealing with the Earth (or any non-flat surface), and that is what we are concerned with when dealing with geospatial data.

Most everyone is familiar with latitude and longitude, the two ordinates that make up the location of a point on the globe. Latitude and longitude have units of degrees. Like x/y coordinates of the Cartesian plane, each coordinate describes a unique location. Unlike the Cartesian plane though, the unit of degrees does not describe a fixed distance. This can be most easily seen in the following graphic, where the "rectangles" of all different sizes each represent one square degree.

.. figure:: img/proj_latlongsphere.png

   Points on the Cartesian plane

All this is mentioned to bring up the point that it is not trivial to translate round surfaces to the flat plane, but that is exactly what is needed when working in mapping, as the flat plane is the computer screen or printed page. The process of moving from round surface to flat plane is called "projection". More formally:

*A map projection is a systematic transformation of the latitudes and longitudes of locations on the surface of a sphere or an ellipsoid into locations on a plane.*

There are many different ways to project a round surface on to the plane. Here are some examples:

.. figure:: img/proj_mapprojections.png

    Some map projections (these images and others on this page courtesy of `Wikipedia <https://en.wikipedia.org/wiki/Map_projection>`_)

Each projection has different considerations, mainly involving distortion. There will be some kind of distortion in every projection; the only question is what is distorted and to what extent. For example, certain projections, such as Albers or Sinusoidal, preserve the area of shapes, while projections such as Mercator or stereographic (called "conformal" projections, preserve angles locally. Other projections, such as the Buckminster Fuller Dymaxion map, are "compromise projections" that preserve some proportion of area, angle, shape, or scale.

Some projections are valid for only a certain area, and not for the entire globe. For example, a rectilinear (gnomonic) projection can only show half the globe.

.. figure:: img/proj_rectilinear.png

   Rectilinear projection

The Mercator projection may be the best known projection outside of professional circles, though it is as well known for its distortions and inaccuracies as much as for its utility (the common complaint being that Greenland is seen to be as big as Africa, despite being 1/14 the size).

.. figure:: img/proj_mercator.png

   Mercator projection

.. note:: Technically, the Earth's surface is not a sphere, but a spheroid, but such distinctions are beyond the scope of this discussion.

Datums
------

.. warning:: Content needed.

GeoServer and projections
-------------------------

GeoServer has support for a large number of projections (around 5,000). In GeoServer, they are referred to as "spatial reference systems" (SRS) or "coordinate reference systems" (CRS). The use of SRS versus CRS can be inconsistent, but they are both referring to the same concept.

Typically, CRSs are noted in the form of "EPSG:####", where "####" is a numerical code that is most often four digits. The "EPSG" prefix refers to the European Petroleum Survey Group, a now-defunct entity that was instrumental in cataloging different CRSs.

To see what CRSs GeoServer supports, there is a demo in the web interface that displays a list of all the CRSs as well as their definitions.

#. Click the :guilabel:`Demos` link. (You don't need to be logged in for this.)

   .. figure:: img/srs_demolink.png

      Click to see GeoServer demos

#. In the list that follows, click :guilabel:`SRS List`.

   .. figure:: img/srs_listlink.png

      Click to see the SRS list

#. The full list of projections will be displayed.

   .. figure:: img/srs_list.png

      All SRSs supported by GeoServer

#. You can click on any entry, or use the search box to filter the list by keyword or number. Enter "yukon" in the search box and press Enter. The list will be filtered down to two options: 3578 and 3579.

   .. figure:: img/srs_listfiltered.png

      Filtered list of SRSs

#. Click :guilabel:`3578`. You will see details about this CRS, including its Well Known Text (WKT) definition. This is the formal definition of the CRS, and includes all information necessary to process geospatial data to and from this CRS. You will also see a map of the area of validity for that CRS.

   .. figure:: img/srs_description.png

      SRS description

GeoServer and reprojection
--------------------------

Data is stored in a particular CRS. However, GeoServer is able to leverage its database of CRSs and reproject data dynamically. So while a particular layer may be stored in one CRS, it is possible to make a request for data in any CRS.

For example, let's request some data to be reprojected. For simplicity, we'll use the WMS Reflector, as it provides the simplest way to craft WMS requests.

.. note:: For more information on the WMS reflector, please see the `GeoServer documentation <http://docs.geoserver.org/stable/en/user/tutorials/wmsreflector.html>`_.

Execute this request::

  http://suite.opengeo.org/geoserver/wms/reflect?layers=usa:states

This will return an image of the usa:states layer over its full extent with all default options. The default CRS is EPSG:4326.

.. figure:: img/usastates_4326.png

   The usa:states layer in EPSG:4326

Now try the following request::

  http://suite.opengeo.org/geoserver/wms/reflect?layers=usa:states&srs=EPSG:3700

This returns the same data, but in EPSG:3700, or "Wisconsin South (ftUS)".

.. figure:: img/usastates_3700.png

   The usa:states layer in EPSG:3700

GeoServer has dynamically reprojected the data during the request execution. No data was or is ever stored in EPSG:3700.

Dynamic reprojection allows for a great deal of flexibility, as the same data need not be stored in multiple CRSs. However, there is a cost involved in reprojection, in that it requires extra processing time. With small data sets this is negligible, but for larger, more complex situations, the processing time can be prohibitive.

For this reason, we recommended that you **store your data in the CRS in which it will be accessed most frequently**. If you need to transform your data to this CRS, use a spatial database function such as ST_Transform in PostGIS. 

.. note:: Caching is one option that gets around the processing time, but even still, data should still be stored in its most frequently-accessed CRS for optimization.

