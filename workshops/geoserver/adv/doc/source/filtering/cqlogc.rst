.. _gsadv.filtering.cqlogc:

CQL and OGC filtering
=====================

This section discusses the two main filtering languages, OGC filter encoding and CQL/ECQL filter expressions.

OGC filters
-----------

The **Filter Encoding** language is an XML-based method for defining filters.

These filters can be used in the following places in GeoServer:

* WMS GetMap requests, using the ``filter=`` parameter
* WFS GetFeature requests, using the ``filter=`` parameter
* SLD Rules, using the ``<ogc:Filter>`` element

CQL filters
-----------

A Contextual Query Language (CQL) filter is a plain-text language originally created for the OGC CS-W specification:

These filters are used by GeoServer for *easier* filtering in:

* WMS GetMap requests, using the ``cql_filter=`` parameter
* WFS GetFeature requests, using the ``CQL_FILTER=`` parameter
* SLD rules, using dynamic symbolizers

.. warning:: WHAT'S THE DIFFERENCE BETWEN FILTERS AND CQL FILTERS?

While we tend to say CQL, the filters are actually implemented as Extended CQL (ECQL), which allows the expression the full range of filters that OGC Filter 1.1 can encode.

.. note:: Both ``filter=`` and ``cql_filter`` are *vendor parameters*. This means that they are implementations specific to GeoServer, and are not part of any specification.

.. warning:: MORE DETAILS?

CQL filter examples
-------------------

IMAGE IN SLIDE

UNCLEAR WHAT THIS SECTION IS DOING

WHY NOT A URL?

Let's start out with a CQL example. We'll use our states layer, and perform an information query on the layer, singling out California.

#. First, launch the Layer Preview for this layer.

#. Click on any one of the states to see the attribute information (done through a GetFeatureInfo query).

#. Now click on the blue button on the top left on the page. This will expand the parameter options for this layer preview. Everything that is available in this menu can be done through a standard GET request, but it can be simpler to test certain parameters this way.

#. Make sure the :guilabel:`Filter` box says :guilabel:`CQL`. Then type the following in the box next to it::

     STATE_NAME = 'California'

#. Click the arrow button next to the box to submit the query. All the states aside from California should disappear.

CQL filter options
------------------

CQL Filters let us invoke core evaluations with key/value pairs, such as the above statement. There are all the standard complement of comparators:

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

Some examples::

  persons > 15000000
  persons BETWEEN 1000000 AND 3000000
  state_name LIKE '%C%'
  state_name IN ('New York', 'California', 'Montana', 'Texas')
  state_name LIKE 'C%' and persons > 15000000

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

  BBOX(geom, -90, 40, -60, 45)

Alternatively, the reverse is also valid, filtering the states that do not intersect with a given area (this time a polygon)::

  DISJOINT(geom, POLYGON((-90 40, -90 45, -60 45, -60 40, -90 40)))


.. warning:: REMOVED DISCUSSION OF EXECUTION PLAN as it did not make sense to me. We can add it back in later.

OGC filter functions
--------------------

The OGC Filter Encoding specification provides a generic concept of a filter function. A filter function is a named function with any number of arguments, which can be used in a filter expression to perform specific calculations.

This greatly increases the power of CQL expressions.

For example, suppose we want to find all states whose name contains an "k", regardless of letter case.

With straight CQL filters, we could create the following expression::

  STATE_NAME LIKE '%k%' OR STATE_NAME LIKE '%K%'

Or we could use the ``strToLowerCase`` function to convert all values to lowercase first, and then use a single like comparison::

  strToLowerCase(STATE_NAME) like '%k%'

.. warning:: THIS ISN'T IN XML

GeoServer provides many different kinds of filter functions covering a wide range of functionality including mathematics, string formatting, and geometric operations.

A complete list is provided in the `Filter Function Reference <http://docs.geoserver.org/stable/en/user/filter/function_reference.html>`_

Simple evaluations in OGC
-------------------------

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

These XML-based filters are URL encoded in GET requests.

Geometric filters in OGC
------------------------

There are also the full complement of geometric filters with OGC encoding::

  <Intersects>
    <PropertyName>geom</PropertyName>
    <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
      <gml:coordinates>-74.817265,40.5296504</gml:coordinates>
    </gml:Point>
  </Intersects>

.. warning:: NEED TO TEST THIS

::

  <Intersects>
    <PropertyName>geom</PropertyName>
    <Literal>
      <gml:Point>
        <gml:coordinates>-120.50 48.50</gml:coordinates>
      </gml:Point>
    </Literal>
  </Intersects>


WFS filtering
-------------

The previous examples have been WMS GetMap requests, but recall that we can apply both CQL and OGC filters to WFS requests as well.

Once again, we'll use the Demo request builder for this. There are demo requests that contain OGC filters, which we can examine and run.

.. WARNING:: WAS THE DRB INTRODUCED YET?

In the box named :guilabel:`Request`, select :guilabel:`wfs_getFeatureIntersects.url`. This is a GET request, so the filter will be URL-encoded::

  http://localhost:8080/geoserver/wfs?request=GetFeature&version=1.0.0&typeName=advanced:states&outputFormat=GML2&FILTER=%3CFilter%20xmlns=%22http://www.opengis.net/ogc%22%20xmlns:gml=%22http://www.opengis.net/gml%22%3E%3CIntersects%3E%3CPropertyName%3Egeom%3C/PropertyName%3E%3Cgml:Point%20srsName=%22EPSG:4326%22%3E%3Cgml:coordinates%3E-74.817265,40.5296504%3C/gml:coordinates%3E%3C/gml:Point%3E%3C/Intersects%3E%3C/Filter%3E

While this is hard to read, it is an OGC Intersects filter on the states layer for a given point.

IMAGE

That would be New Jersey.

The exact same filter can be employed using a POST request.

In the box named :guilabel:`Request`, select :guilabel:`wfs_getFeatureIntersects.xml`:

.. code-block:: xml

   <wfs:GetFeature service="WFS" version="1.1.0"
    xmlns:advanced="http://advanced"
    xmlns:wfs="http://www.opengis.net/wfs"
    xmlns="http://www.opengis.net/ogc"
    xmlns:gml="http://www.opengis.net/gml"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/wfs
                        http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
     <wfs:Query typeName="advanced:states">
       <Filter>
         <Intersects>
           <PropertyName>geom</PropertyName>
           <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
             <gml:coordinates>-74.817265,40.5296504</gml:coordinates>
           </gml:Point>
         </Intersects>
       </Filter>
     </wfs:Query>
   </wfs:GetFeature>

This version is obviously much easier to read, though the output is the same.

The same set of comparators are available in WFS queries. For example, to filter for values between a certain range, see the ``wfs_getFeatureBetween.xml`` template:

.. code-block:: xml

   <wfs:GetFeature service="WFS" version="1.1.0"
    xmlns:advanced="http://advanced"
    xmlns:wfs="http://www.opengis.net/wfs"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:gml="http://www.opengis.net/gml"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/wfs
                        http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
     <wfs:Query typeName="usa:states">
       <wfs:PropertyName>advanced:STATE_NAME</wfs:PropertyName>
       <wfs:PropertyName>advanced:LAND_KM</wfs:PropertyName>
       <wfs:PropertyName>advanced:the_geom</wfs:PropertyName>
       <ogc:Filter>
         <ogc:PropertyIsBetween>
           <ogc:PropertyName>usa:LAND_KM</ogc:PropertyName>
           <ogc:LowerBoundary>
             <ogc:Literal>100000</ogc:Literal>
           </ogc:LowerBoundary>
           <ogc:UpperBoundary>
             <ogc:Literal>150000</ogc:Literal>
           </ogc:UpperBoundary>
         </ogc:PropertyIsBetween>
       </ogc:Filter>
     </wfs:Query>
   </wfs:GetFeature>

.. note:: As with all other filter requests, this could be URL-encoded and sent as a GET request. 

There are also operators and functions, for example in the ``wfs_mathGetFeature.xml`` request:

.. code-block:: xml

   <wfs:GetFeature service="WFS" version="1.1.0"
    xmlns:advanced="http://advanced"
    xmlns:wfs="http://www.opengis.net/wfs"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opengis.net/wfs
                        http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">
     <wfs:Query typeName="advanced:states">
       <ogc:Filter>
         <ogc:PropertyIsGreaterThan>
           <ogc:Div>
             <ogc:PropertyName>manual</ogc:PropertyName>
             <ogc:PropertyName>workers</ogc:PropertyName>
           </ogc:Div>
         <ogc:Literal>0.25</ogc:Literal>
       </ogc:PropertyIsGreaterThan>
     </ogc:Filter>
   </wfs:Query>

The full set of filtering capabilities is actually part of the WFS spec. This is shown in the WFS capabilities document in the tag named ``<ogc:Filter_Capabilities>``.

IMAGE?

WMS borrows these capabilities, implementing them as vendor parameters.

Filtering in SLD rules
----------------------

Sometimes, instead of filtering data for the sake of excluding records from the whole set, we would want to filter certain features for cartographic classifications. 

NEED XML

There are three rules here, only one of which is shown for brevity. Each rule has a filter (to drive the classification) and a symbolizer (to render the data in the class in a specific way).


CQL in SLD dynamic symbolizers
------------------------------

CQL filters also have a place in SLD, but not (strangely) for filtering.

Take a look at the following SLD

NEED XML

It contains a single rule, but with no explicit filter. The CQL is placed inside the ``${ }``. It's evaluated as an expression in-line in order to *return values* not filter features.

In this specific example what is returned is the value of the attribute ``state_abbr`` in lower case using the filter function ``strToLowerCase()``. 


