.. _gsadv.filtering.cqlogc:

CQL and OGC filtering
=====================

This section discusses the two main filtering languages, OGC Filter encoding and CQL/ECQL filter expressions.

OGC filters
-----------

The OGC **Filter Encoding** language is an XML-based method for defining filters.

These filters can be used in the following places in GeoServer:

* WMS GetMap requests, using the ``filter=`` parameter
* WFS GetFeature requests, using the ``filter=`` parameter
* SLD Rules, using the ``<ogc:Filter>`` element

CQL filters
-----------

A Contextual Query Language (CQL) filter is a plain-text language originally created for the OGC CS-W specification:

These filters are used by GeoServer for *easier* filtering in:

* WMS GetMap requests, using the ``cql_filter=`` parameter
* WFS GetFeature requests, using the ``cql_filter=`` parameter
* SLD rules, using dynamic symbolizers

.. warning:: TALK ABOUT THE DIFFERENCE BETWEEN FILTERS AND CQL FILTERS

.. note:: Both ``filter=`` and ``cql_filter`` are *vendor parameters*. This means that they are implementations specific to GeoServer, and are not part of any specification.

.. note:: While we tend to say CQL, the filters are actually implemented as Extended CQL (ECQL), which allows the expression the full range of filters that OGC Filter 1.1 can encode.

.. warning:: MORE DETAILS?

CQL filter example
------------------

Let's start out with a CQL example. We'll use the ``usa:states`` layer and perform an information query on it, singling out California.

#. First, launch the Layer Preview for this layer.

#. Click on any one of the states to see the attribute information (done through a GetFeatureInfo query). Note that the attribute for the name of the state is called ``STATE_NAME``.

   .. figure:: img/cqlogc_preview.png

      Layer preview with feature info

#. Now add the following parameter to the end of the URL::

     &cql_filter=STATE_NAME='California'

#. Submit the request. All the states aside from California should disappear.

   .. figure:: img/cqlogc_california.png

      Feature filtered

CQL filter options
------------------

CQL filters let us invoke core evaluations with key/value pairs, such as the above statement. There exist all the standard comparators:

* Equals ``=``
* Not equals ``<>``
* Greater than ``>``
* Less than ``<``
* Greater than or equal to ``>=``
* Less than or equal to ``<=``

Some less common operators:

* BETWEEN / AND
* LIKE (with ``%`` as wildcard)
* IN (a list)

And combinations of the above using ``AND``, ``OR``, and ``NOT``.

Try some of these examples. Any of these will work with the ``usa:states`` layer::

  PERSONS > 15000000
  PERSONS BETWEEN 1000000 AND 3000000
  STATE_NAME LIKE '%C%'
  STATE_NAME IN ('New York', 'California', 'Montana', 'Texas')
  STATE_NAME LIKE 'C%' and PERSONS > 15000000

.. note:: Replace the ``%`` with ``%25`` for proper URL encoding.

If manually editing the ``cql_filter=`` parameter, all strings must be URL encoded, so that the parameter ``STATE_NAME LIKE '%C%'`` should be typed as ``STATE_NAME LIKE '%25C%25'``.

Also available are expressions with multiple attributes (``male > female``) and simple math operations (``male / female < 1``)

Geometric filters in CQL
------------------------

CQL also provides a set of geometric filter capabilities. The available operators are:

* Disjoint
* Equals
* DWithin
* Beyond
* Intersects
* Touches
* Crosses
* Within
* Contains
* Overlaps
* BBOX

For example, to display only the states that intersect a given area (a bounding box), the following expression is valid::

  BBOX(the_geom, -90, 40, -60, 45)

The reverse is also valid, filtering the states that do not intersect with a given area (this time using a polygon instead of a bounding box)::

  DISJOINT(the_geom, POLYGON((-90 40, -90 45, -60 45, -60 40, -90 40)))

.. warning:: SCREENSHOTS?

.. warning:: REMOVED DISCUSSION OF EXECUTION PLAN as it did not make sense to me. We can add it back in later.

OGC filter functions
--------------------

The OGC Filter Encoding specification provides a generic concept of a filter function. A filter function is a named function with any number of arguments, which can be used in a filter expression to perform specific calculations.

This greatly increases the power of CQL expressions.

For example, suppose we want to find all states whose name contains an "k", regardless of letter case.

With straight CQL filters, we could create the following expression::

  STATE_NAME LIKE '%k%' OR STATE_NAME LIKE '%K%'

Or we could use the ``strToLowerCase()`` function to convert all values to lowercase first, and then use a single like comparison::

  strToLowerCase(STATE_NAME) like '%k%'

GeoServer provides many different kinds of filter functions covering a wide range of usage including mathematics, string formatting, and geometric operations. A complete list is provided in the `Filter Function Reference <http://docs.geoserver.org/stable/en/user/filter/function_reference.html>`_

.. warning:: SCREENSHOTS?

Simple evaluations in OGC
-------------------------

.. warning:: NEED TO DISCUSS WHY XML HERE AND NOT ABOVE

There are the same kinds of OGC filter encodings as there were with CQL, such as comparators, operators and other logic::

    <PropertyIsEqualTo>
      <PropertyName>STATE_NAME</PropertyName>
      <Literal>California</Literal>
    </PropertyIsEqualTo>

    <PropertyIsBetween>
      <PropertyName>persons</PropertyName>
      <Literal>1000000</Literal>
      <Literal>3000000</Literal>
    </PropertyIsBetween>

    <Or>
      <PropertyIsEqualTo>
        <PropertyName>state_name</PropertyName>
        <Literal>California</Literal>
      </PropertyIsEqualTo>
      <PropertyIsEqualTo>
        <PropertyName>state_name</PropertyName>
        <Literal>Oregon</Literal>
      </PropertyIsEqualTo>
    </Or>

These XML-based filters would be URL encoded in GET requests.

Geometric filters in OGC
------------------------

There are also the full complement of geometric filters with OGC encoding::

  <Intersects>
    <PropertyName>the_geom</PropertyName>
    <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
      <gml:coordinates>-74.817265,40.5296504</gml:coordinates>
    </gml:Point>
  </Intersects>

::

  <Intersects>
    <PropertyName>the_geom</PropertyName>
    <Literal>
      <gml:Point>
        <gml:coordinates>-120.50 48.50</gml:coordinates>
      </gml:Point>
    </Literal>
  </Intersects>

.. warning:: THESE DON'T WORK

WFS filtering
-------------

The previous examples have been WMS GetMap requests, but recall that we can apply both CQL and OGC filters to WFS requests as well.

Once again, for simplicity we'll use the Demo Request Builder for this. There are demo requests that contain OGC filters, which we can examine and run.

Load the Demo Request Builder. In the :guilabel:`Request` box, select :guilabel:`WFS_getFeatureIntersects.url`. This is a GET request, so the filter will be URL-encoded::

  http://localhost:8080/geoserver/wfs?request=GetFeature&
    version=1.0.0&typeName=advanced:states&outputFormat=GML2&
    FILTER=%3CFilter%20xmlns=%22http://www.opengis.net/ogc%22%20xmlns:gml=%22http://www.opengis.net/gml%22%3E%3CIntersects%3E%3CPropertyName%3Egeom%3C/PropertyName%3E%3Cgml:Point%20srsName=%22EPSG:4326%22%3E%3Cgml:coordinates%3E-74.817265,40.5296504%3C/gml:coordinates%3E%3C/gml:Point%3E%3C/Intersects%3E%3C/Filter%3E


While this is hard to read, it is an OGC Intersects filter on the states layer on a given point (-74.817265,40.5296504)

.. figure:: img/cqlogc_wfsfilter.png

   WFS filter results

That would be New Jersey.

The exact same filter can be employed using a POST request.

In the box named :guilabel:`Request`, select :guilabel:`WFS_getFeatureIntersects-1.1.xml`:

.. code-block:: xml

   <wfs:GetFeature service="WFS" version="1.1.0"
     xmlns:usa="http://usa.opengeo.org"
     xmlns:wfs="http://www.opengis.net/wfs"
     xmlns="http://www.opengis.net/ogc"
     xmlns:gml="http://www.opengis.net/gml"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.opengis.net/wfs
                         http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
      <wfs:Query typeName="usa:states">
        <Filter>
          <Intersects>
            <PropertyName>the_geom</PropertyName>
            <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
              <gml:coordinates>-74.817265,40.5296504</gml:coordinates>
            </gml:Point>
          </Intersects>
        </Filter>
      </wfs:Query>
   </wfs:GetFeature>
 
This version is much easier to read, though the output is exactly the same as above.

The same set of comparators are available in WFS queries. For example, to filter for values between a certain range, see the ``WFS_getFeatureBetween-1.1.xml`` template:

.. code-block:: xml

   <wfs:GetFeature service="WFS" version="1.1.0"
    xmlns:usa="http://usa.opengeo.org"
    xmlns:wfs="http://www.opengis.net/wfs"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:gml="http://www.opengis.net/gml"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/wfs
                        http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
     <wfs:Query typeName="usa:states">
       <wfs:PropertyName>usa:STATE_NAME</wfs:PropertyName>
       <wfs:PropertyName>usa:LAND_KM</wfs:PropertyName>
       <wfs:PropertyName>usa:the_geom</wfs:PropertyName>
       <ogc:Filter>
         <ogc:PropertyIsBetween>
           <ogc:PropertyName>usa:LAND_KM</ogc:PropertyName>
           <ogc:LowerBoundary><ogc:Literal>100000</ogc:Literal></ogc:LowerBoundary>
           <ogc:UpperBoundary><ogc:Literal>150000</ogc:Literal></ogc:UpperBoundary>
         </ogc:PropertyIsBetween>
       </ogc:Filter>
     </wfs:Query>
   </wfs:GetFeature> 

This returns a number of medium-sized states, among them: Illinois, Kentucky, and Virginia.

There are also operators and functions, for example in the ``WFS_mathGetFeature.xml`` request:

.. code-block:: xml

   <wfs:GetFeature service="WFS" version="1.0.0"
    outputFormat="GML2"
    xmlns:usa="http://usa.opengeo.org"
    xmlns:wfs="http://www.opengis.net/wfs"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/wfs
                        http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">
     <wfs:Query typeName="usa:states">
       <ogc:Filter>
         <ogc:PropertyIsGreaterThan>
           <ogc:Div>
             <ogc:PropertyName>MANUAL</ogc:PropertyName>
             <ogc:PropertyName>WORKERS</ogc:PropertyName>
           </ogc:Div>
         <ogc:Literal>0.25</ogc:Literal>
         </ogc:PropertyIsGreaterThan>
       </ogc:Filter>
     </wfs:Query>
   </wfs:GetFeature>

This returns all features that satisfy this criteria::

  MANUAL / WORKERS > 0.25

The full set of filtering capabilities is actually part of the WFS spec. This is shown in the WFS capabilities document in the tag named ``<ogc:Filter_Capabilities>``. WMS borrows these capabilities, implementing them as vendor parameters.

Filtering in SLD rules
----------------------

Sometimes, instead of filtering data for the sake of excluding records from the whole set, we would want to filter certain features for the sake of cartographic classification. You've likely encountered this before in any basic work with SLD.

Given the following familiar image:

.. figure:: ../crs/img/usastates_4326.png

   usa:states forever

Here is its SLD, or rather, one rule excerpted for brevity.

.. code-block:: xml

   <Rule>
     <Name>Population &lt; 2M</Name>
     <Title>Population &lt; 2M</Title>
     <ogc:Filter>
       <ogc:PropertyIsLessThan>
         <ogc:PropertyName>PERSONS</ogc:PropertyName>
         <ogc:Literal>2000000</ogc:Literal>
       </ogc:PropertyIsLessThan>
     </ogc:Filter>
     <PolygonSymbolizer>
       <Fill>
         <CssParameter name="fill">#A6CEE3</CssParameter>
         <CssParameter name="fill-opacity">0.7</CssParameter>
       </Fill>
     </PolygonSymbolizer>
   </Rule>

This rule, and the others like it, has a filter (to drive the classification) and a symbolizer (to render the data in the class in a specific way).

CQL in SLD dynamic symbolizers
------------------------------

CQL filters also have a place in SLD, but not (strangely) for filtering. It can be evaluated as an expression in-line in order to *return values*.

Take a look at the following SLD:

.. code-block:: xml

    <?xml version="1.0" encoding="ISO-8859-1"?>
    <StyledLayerDescriptor version="1.0.0"
      xmlns="http://www.opengis.net/sld"
      xmlns:ogc="http://www.opengis.net/ogc"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.opengis.net/sld
                          http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
      <NamedLayer>
        <Name>Default Polygon</Name>
        <UserStyle>
          <Title>Flags of USA</Title>
          <FeatureTypeStyle>
            <Rule>
              <Name>Solid black outline</Name>
              <LineSymbolizer>
                <Stroke/>
              </LineSymbolizer>
            </Rule>
          </FeatureTypeStyle>
          <FeatureTypeStyle>
            <Rule>
              <Name>Flags</Name>
              <Title>USA state flags</Title>
              <PointSymbolizer>
                <Graphic>
                  <ExternalGraphic>
                    <OnlineResource xlink:type="simple"
                      xlink:href="http://www.usautoparts.net/bmw/images/states/tn_${strToLowerCase(STATE_ABBR)}.jpg" />
                    <Format>image/gif</Format>
                  </ExternalGraphic>
                </Graphic>
              </PointSymbolizer>
            </Rule>
          </FeatureTypeStyle>
        </UserStyle>
      </NamedLayer>
    </StyledLayerDescriptor>

It contains a single rule, but with no explicit filter. The CQL is placed inside the ``${ }``. What is returned is the value of the attribute ``STATE_ABBR`` in lower case using the filter function ``strToLowerCase()``. 

The resulting map image looks like this:

.. figure:: img/cqlogc_usaflags.png

   Dynamic symbolizers

