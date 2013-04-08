.. _gsadv.filtering.cqlogc:

CQL and OGC filtering
=====================

Data Filtering (CQL/OGC) (demo requests)

Two filter languages
--------------------

GeoServer supports two main filtering languages

    OGC Filter encoding, and

    CQL/ECQL filter expressions

There are other ways to separate data from source ...

    SQL Views

    Time/Elevation dimensions on WMS requests

Bad news ... They're not really filters, so they aren't in this section.

Good news ... They have sections all of their own later on in this chapter

Back to our two main filter languages ...

OGC filters
-----------

The Filter Encoding language is an XML-based method for defining filters.

XML Filters can be used in the following places in GeoServer:

    in WMS GetMap requests, using the filter parameter

    in WFS GetFeature requests, using the filter parameter

    in SLD Rules, in the Filter element

The Filter Encoding language is defined in the following OGC specifications:

    OGC Filter encoding specification v 1.0, used in WFS 1.0 and SLD 1.0

    OGC Filter encoding specification v 1.1, used in WFS 1.1


CQL filters
-----------

    Plain-text language created for the OGC CS-W specification


    Used by GeoServer for ~easier~ filtering in:

        WMS GetMap requests with CQL_FILTER=

        WMS GetFeature requests with CQL_FILTER=


    Actually implemented as E(xtended)CQL

    (Full range of filters in OGC Filter 1.1)

CQL (Common Query Language) is a plain-text language created for the OGC Catalog specification.

GeoServer has adapted it to be an easy-to-use filtering mechanism

    in WMS GetMap requests, using the cql_filter parameter

    in WFS GetFeature requests, using the cql_filter parameter

    in SLD dynamic symbolizers


GeoServer actually implements a more powerful extension called ECQL (Extended CQL), which allows the expression the full range of filters that OGC Filter 1.1 can encode.

The ECQL Reference describes the features of the ECQL language. The CQL and ECQL tutorial shows examples of defining filters.

The CQL and ECQL languages are defined in:

    OpenGIS Catalog Services Specification contains the standard definition of CQL

    ECQL Grammar is the grammar defining the GeoTools ECQL implementation



CQL filter examples
-------------------

Rather than send you off to read the language-specific filter specifications, I'll get you started with some examples ...

CQL filter examples, first ...

Their clear language of expression is a better place to launch things from

Using our States Layer ...

Introducing (or re-introducing) GeoServer's Layer Preview tool(s) ...

Let's do a quick ~Info-Query~ on California to set the stage ...

    Review fields

    Yay, fields!


Notice the layer preview tool's ~Magic Button~ ...



Simple evaluations in CQL
-------------------------

CQL Filters let us envoke ...

Core Evaluations ...

state_name = 'California'

We have a lot of Comparators/Operators

Using ( =, <>, >, >=, <, <=, BETWEEN, LIKE, IN )

persons > 15000000

persons BETWEEN 1000000 AND 3000000

state_name LIKE '%C%'

state_name IN ('New York', 'California', 'Montana', 'Texas')

Combinations

    Using ( and, or & not )

state_name LIKE 'C%' and persons > 15000000

Multiple Attributes

male > female

Operations

(+, -, *, /)

male / female < 1


Geometric filters in CQL
------------------------

CQL provides a set of geometric filter capabilities. Say, for example, you want to display only the states that intersect a given bounding box.

BBOX(geom, -90, 40, -60, 45)

Alternatively, you can select the states that do not intersect the bounding box with a DISJOINT filter like:

DISJOINT(geom, POLYGON((-90 40, -90 45, -60 45, -60 40, -90 40)))

The complete set of Geometric Filters is ...

<ogc:SpatialOperator name="Disjoint"/>

<ogc:SpatialOperator name="Equals"/>

<ogc:SpatialOperator name="DWithin"/>

<ogc:SpatialOperator name="Beyond"/>

<ogc:SpatialOperator name="Intersects"/>

<ogc:SpatialOperator name="Touches"/>

<ogc:SpatialOperator name="Crosses"/>

<ogc:SpatialOperator name="Within"/>

<ogc:SpatialOperator name="Contains"/>

<ogc:SpatialOperator name="Overlaps"/>

<ogc:SpatialOperator name="BBOX"/>



Under the hood
--------------

There are a few things happening under the hood here ... Notably ...

Vendor Parameters

-- Both FILTER and CQL_FILTER are vendor parameters specific to GeoServer

-- Which introduces a new concept to our discussion of the OGC services ...

-- Totally able to provide implementation-specific parameters ...

-- Purists ... May argue the politics of this ...  

-- Generally enhance the capacity of an implementation

-- (Often contribute to the future revisions of the spec)

> "Sniff" the URLs in your browser to see the additional parameters.

Execution Plan

-- In both OGC and CQL filters, the optimal strategy is to drive as much of the query execution down into the equivalent functions and filters in the underlying data-stores as possible ...

-- If we have a look at verbose logging in GeoServer we can see how this translation occurs ...

> Execution plan through GeoServer verbose logging

    > (Or <PostGIS> log_statements - 'all')

But ... Equivalent <> Equivalent ...

    > ST_DWithin("the_geom",ST_GeomFromText('POINT (1 2)', 4326),10.0)


    PostGIS ignores the units (you can confirm this by looking at the function signatures)

    Oracle respects the units (within a given set of options and balks at others)


The implementation and the nuances of the execution plan, is datastore specific ...

Filter functions in CQL
-----------------------

The OGC Filter Encoding specification provides a generic concept of a filter function

A filter function is a named function with any number of arguments, which can be used in a filter expression to perform specific calculations.

CQL/ECQL can use any of the filter functions available in GeoServer.

This greatly increases the power of CQL expressions.

For example, suppose we want to find all states whose name contains an “k”, regardless of letter case.

Rather than OR'ing two likes on '%k%' and '%K%'

    state_name like '%k%' OR state_name like '%K%'

We can use the strToLowerCase to turn all the state names to lowercase and then use a single like comparison:

strToLowerCase(state_name) like '%k%'

GeoServer provides many different kinds of filter functions, covering a wide range of functionality including mathematics, string formatting, and geometric operations.

A complete list is provided in

    The Filter Function Reference


Simple evaluations in OGC
-------------------------

We can repeat the same kinds of filters we performed using CQL with the equivalent OGC filter encodings ... 

We have the same Comparators and Operators and Logic in OGC that we do in CQL ...

    <PropertyIsEqualTo><PropertyName>state_name</PropertyName><Literal>California</Literal></PropertyIsEqualTo>


    <PropertyIsBetween><PropertyName>persons</PropertyName><Literal>1000000</Literal><Literal>3000000</Literal></PropertyIsBetween>


Have a look at the Traffic Monitor and see that the Query (FILTER=) is also URL encoded ...

Use AND, OR, and NOT

    <Or><PropertyIsEqualTo><PropertyName>state_name</PropertyName><Literal>California</Literal></PropertyIsEqualTo><PropertyIsEqualTo><PropertyName>state_name</PropertyName><Literal>Oregon</Literal></PropertyIsEqualTo></Or>


Geometric filters in OGC
------------------------

We can also specify a the full complement of geometric filters with OGC encoding ...

<Intersects><PropertyName>geom</PropertyName><gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326"><gml:coordinates>-74.817265,40.5296504</gml:coordinates></gml:Point></Intersects>

[[[]]] WTF isn't this query working ... ???

<Intersects><PropertyName>geom</PropertyName><Literal><gml:Point><gml:coordinates>-120.50 48.50</gml:coordinates></gml:Point></Literal></Intersects>


WFS filtering
-------------

- Previous examples were all WMS GetMap Requests ...

- Recall that we can apply both CQL and OGC filters to WFS requests as well ...

- We'll use the Demo Request Builder for this ...

- The Demo Request Builder is another "hidden" gem for prototyping requests ...

-- Like the Layer Preview (also does WMS GetMaps), but more tuned to WFS

-- Makes GET and POST requests

-- So it's pretty handy for prototyping Filters (in WMS / WFS) and Transactions to WFS

-- Respects session authentication ...

-- Also lets you provide credentials (for testing remote ~GeoServers~)

- Contains a shwack of template examples to get started with ...

- Just look at that list!

- Let's have a look at a few ...

> wfs_getFeatureIntersects.url

    http://localhost:8080/geoserver/wfs?request=GetFeature&version=1.0.0&typeName=advanced:states&outputFormat=GML2&FILTER=%3CFilter%20xmlns=%22http://www.opengis.net/ogc%22%20xmlns:gml=%22http://www.opengis.net/gml%22%3E%3CIntersects%3E%3CPropertyName%3Egeom%3C/PropertyName%3E%3Cgml:Point%20srsName=%22EPSG:4326%22%3E%3Cgml:coordinates%3E-74.817265,40.5296504%3C/gml:coordinates%3E%3C/gml:Point%3E%3C/Intersects%3E%3C/Filter%3E


This one is big and scary ... This is the URL encoded version of an OGC intersects filter to ...

I readily admit the encoding is hard to read ...

Possibly only from the response can I decipher that I'm submitting a query to my states layer for the feature that intersects the geographic point at ~-74.8 and ~40.5 ...

New Joisey!


Again, we can apply the same filter, using the same language by POST'ing the XML to the WFS ...  

> wfs_getFeatureIntersects.xml

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

I find the un-URL encoded version just a bit easier to read ...

I have the same set of Comparators available for WFS Queries ...

(LessThan, GreaterThan, Between, Etc.)

For example I can Filter for values between a certain range ...

> wfs_getFeatureBetween.xml

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

<ogc:PropertyName>usa:LAND_</ogc:PropertyName>

<ogc:LowerBoundary><ogc:Literal>100000</ogc:Literal></ogc:LowerBoundary>

<ogc:UpperBoundary><ogc:Literal>150000</ogc:Literal></ogc:UpperBoundary>

</ogc:PropertyIsBetween>

</ogc:Filter>

</wfs:Query>

</wfs:GetFeature>

(FWIW ... I could URL-encode this and send it in a GET request)

(The thought makes me shudder)

Yes ... I also have Operators and Functions ...

> wfs_mathGetFeature.xml

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

</wfs:GetFeature>

   </ogc:PropertyIsGreaterThan>

   </ogc:Filter>

   </wfs:Query>

</wfs:GetFeature>


We should be noticing a trend at this point ...

All of the comparators, operators (spatial and otherwise), that I can use in WMS requests are available to WFS requests ...

Actually the opposite is true ...

The full set of filtering capabilities is actually part of the WFS spec ...

> Look at the WFS capabilities document ... 

> <ogc:Filter_Capabilities>

WMS _just_ borrows these capabilities.

While they are part of the WFS spec ... WMS implements them as vendor parameters.

They're useful but not every WMS can, or is expected to do them.

CQL filters in WMS URLs
-----------------------

Rounding out our examples, note that it is indeed possible to do CQL style filters in WFS GETs ...

> wfs_getFeatureBetweenCQL.url

http://localhost:8080/geoserver/wfs?request=GetFeature&typeName=advanced:states&propertyName=state_name,land_km,geom&CQL_FILTER=land_km%20BETWEEN%20100000%20AND%20150000&version=1.1.0

... So there !!!

Filtering in SLD rules
----------------------

Midway during my preparations for of all this, my cat gets up yawns, stretches and looks at me as if to say ...

"Sometimes I don't want to filter my data, why are we learning all this?

And she actually has a point ...

We don't always want to filter our data for the sake of excluding records from the whole set.

But for cartographic classifications (different values = different symbology), we definitely want to

We may / may not have known that those were the mechanics for it or not ...

Consider the following example ...

[SLD]

Three rules, only one of which is shown ...

Each rule has:

> a filter (to drive the classification) and 

> a (Polygon)Symbolizer (to draw the data in the class a different way)

NOTE

... Execution plan is the same ...


CQL in SLD dynamic symbolizers
------------------------------

CQL also has a place in SLD, but it's not for filtering ...

We mention this here simply just to close out this section ...

This SLD contains one Rule ...

With no filter (so it's applied to all features) ...

"But it contains CQL", she said ... "So where does the filter come into play"

CQL is placed between " $ { } " its evaluated as an expression in-line ... to return values, not filter features ...

In this case we return

> the value of the field state_abbr

> in lower case using the filter function strToLowerCase()

which concatenates to the directory path / file name of a set of images


