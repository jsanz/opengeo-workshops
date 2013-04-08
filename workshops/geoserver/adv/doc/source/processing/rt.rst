.. _gsadv.processing.rt:

Rendering transformations
=========================


Rendering Transformations allow processing to be carried out on datasets within the GeoServer rendering pipeline.

Sometime ...

> After it leaves the data-store in it's native format

> Before it gets rendered as an image and shipped to your browser

Types of rendering transformations
----------------------------------

Transformations may transform data from one format into another (i.e vector to raster or vice-versa), to provide a more appropriate format for display.

Some of the types of rendering transforms available  in GeoServer include ...

Raster-to-Vector

    Contour extracts contours from a DEM raster.

    RasterAsPointCollections extracts a vector field from a multi-band raster


Vector-to-Raster

    BarnesSurfaceInterpolation computes a contiguous surface from scattered data points.

    Heatmap computes a heatmap surface from weighted data points.


Vector-to-Vector

    PointStacker aggregates dense point data into clusters.


Invoking rendering transformations
----------------------------------

    Invoked on layers within SLD

    SLD takes parameters to drive the transform

    SLD rules & symbolizers for cartography

    Rendering Transforms implemented as WPS

    Can also execute them as WPS, if needed

    All WPS can be run as a transformation


Rendering transformations are invoked on a layer within SLD styles.

Parameters may be supplied to the transformation to control the appearance of the output.

Once transformed ...

The rendered output for the layer is produced by applying the styling rules and symbolizers in the (same) SLD to the result of transformation.

Rendering transformations are implemented as WPS Processes

So, you can also execute them via the WPS protocol, if required.

Theoretically, any WPS process can be executed as a rendering transformation

... as long as the input and output are appropriate for use within an SLD

[[[]]] what makes this appropriate?


Installing WPS extension
------------------------

Because Rendering transformations are invoked as WPS processes, you will need to have the WPS extension installed to run them.

In the community GeoServer you will need to install the WPS Extension separately.

The OpenGeo Suite version of GeoServer includes, the WPS extension by default.

Note:

The WPS service does not need to be enabled to use Rendering Transformations.

To avoid unwanted consumption of server resources, it may even be desirable to disable the WPS service if it is not being used directly.


Usage
-----

<FeatureTypeStyle>

 <Transformation>

   <ogc:Function name="gs:ProcessName">

     <ogc:Function name="parameter">

       <ogc:Literal>paramName</ogc:Literal>

       <ogc:Literal>paramValue</ogc:Literal>

       [ <ogc:Literal>paramValue</ogc:Literal> ]

     </ogc:Function name="parameter">

     ... (other parameters) ...

   </ogc:Function name="parameter">

   ... ( rest of SLD) ...


This is a snippet of an SLD ...

We should recognize the FeatureTypeStyle tag, but the <Transformation> element and it's contents might be new.

Rendering Transformations are invoked by adding the <Transformation> element to a <FeatureTypeStyle> element in an SLD document.

This element specifies the name of the transformation process, and normally includes parameter values controlling the operation of the transformation.

The <Transformation> element syntax leverages the OGC Filter function syntax. The content of the element is a <ogc:Function> with the name of the rendering transformation process.

Transformation processes may accept some number of parameters, which may be either required or optional (with a default).

Parameters are supplied as name/value pairs. Each parameter’s name and value are supplied via another function <ogc:Function name="parameter">.

The first argument to this function is an <ogc:Literal> containing the name of the parameter. The optional following arguments provide the value for the parameter (if any).

Some parameters accept only a single value, while others may accept a list of values. As with any filter function argument, values may be supplied in several ways:

    As a literal value

    As a computed expression

    As an SLD environment variable (which allows obtaining values for the current request such as output image width and height)


The order of the supplied parameters is not significant.

Most rendering transformations take the dataset to be transformed as an input.

This is supplied via a special parameter (named data) which does not have a value specified.

The name of the parameter is determined by the particular transformation being used.

When the transformation is executed, the input dataset is passed to it via this parameter.

The input dataset is subject to the same query mechanism(s) used for all WMS requests so

you can filter it if required ...


Other nuances ...

In rendering transformations which take as input a featuretype (vector dataset) and convert it to a raster dataset, in order to pass validation the SLD needs to mention the geometry attribute of the input dataset (even though it is not used). This is done by specifying the attribute name in the symbolizer <Geometry>element.


  ... ( transformation parameters )

 </Transformation>

 <Rule>

   <Symbolizer>

    ... ( symbolizer instructions ) ...

   </Symbolizer>

 </Rule>

 ... ( other rules ) ...

</FeatureTypeStyle>



The output of the rendering transformation is styled using an appropriate symbolizer:

> PointSymbolizer, LineSymbolizer, PolygonSymbolizer, and TextSymbolizer for vector data

> RasterSymbolizer for coverage data.

If you want to display the original data untransformed and/or transformed in another way along with the transformation

There are two options:

    Another <FeatureTypeStyle> can be used in the same SLD

    Another SLD can be created, and the layer displayed twice using the different SLDs

Notes / Nuances ...

    Rendering transformations may not work correctly in tiled mode, unless they have been specifically written to accommodate it

    Get Feature Info



Example: contour
----------------

gs:Contour is a Raster-to-Vector rendering transformation which extracts contour lines at specified levels from a raster DEM.

We use SLD to invoke the transformation, and style the contours as black lines

Invocation and syntax ...

    SLD


Key aspects of the SLD are:

    Lines 14-15 define the rendering transformation, using the process gs:Contour.

    Lines 16-18 supply the input data parameter, named data in this process.

    Lines 19-29 supply a list of values for the process’s levels parameter, which specifies the elevation levels for the contours to extract.

    Lines 35-40 specify a LineSymbolizer to style the contour lines.

    Lines 41-70 specify a TextSymbolizer to show the contour levels along the lines.

http://localhost:8080/geoserver/wms/reflect?layers=sfdem&format=application/openlayers

http://localhost:8080/geoserver/wms/reflect?layers=sfdem&styles=transform_contours&format=application/openlayers

http://localhost:8080/geoserver/wms/reflect?layers=sfdem,sfdem&styles=,transform_contours&format=application/openlayers


http://blog.opengeo.org/2012/10/23/contour-maps/

http://suite.opengeo.org/opengeo-docs/processing/contour/


Example: heat map
-----------------

gs:Heatmap is a Vector-to-Raster rendering transformation which generates a heatmap surface from weighted point data.

Again we use SLD to invoke the heatmap rendering transformation on a featuretype with point geometries and an attribute population supplying the weight for the points.

(This is our cities layer from the previous SQL View examples).

The output is styled using a color ramp across the range or values in the output raster [0 .. 1].

Invocation and syntax ...

    SLD


Key aspects of the SLD are:

    Lines 14-15 define the rendering transformation, using the process gs:Heatmap.

    Lines 16-18 supply the input data parameter, named data in this process.

    Lines 19-22 supply a value for the process’s weightAttr parameter, which specifies the input attribute providing a weight for each data point.

    Lines 23-29 supply the value for the radiusPixels parameter, which controls the “spread” of the heatmap around each point. 


ENVs ...

    Lines 30-33 supply the pixelsPerCell parameter, which controls the resolution at which the heatmap raster is computed.

    Lines 34-38 supply the outputBBOX parameter, which is given the value of the standard SLD environment variable wms_bbox.

    Lines 40-45 supply the outputWidth parameter, which is given the value of the standard SLD environment variable wms_width.

    Lines 46-52 supply the outputHeight parameter, which is given the value of the standard SLD environment variable wms_height.


    Lines 55-70 specify a RasterSymbolizer to style the computed raster surface. The symbolizer contains a ramped color map for the data range [0..1].


    Line 58 specifies the geometry attribute of the input featuretype, which is necessary to pass SLD validation.

http://localhost:8080/geoserver/wms/reflect?layers=cities&format=application/openlayers

http://localhost:8080/geoserver/wms/reflect?layers=cities&format=application/openlayers&styles=transform_heatmap

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities&format=application/openlayers&styles=,transform_heatmap


Example: point clustering
-------------------------

The Point Stacker rendering transformation is a Vector-to-Vector transformation which displays a data set of points with nearby points aggregated together.

Often, this produces a more readable map in situations when there are many close points displayed at once.

The stacking is performed dynamically, so it can be used to visualize changing data.

It provides good performance even when applied to very large datasets.

The stacked view is created by configuring a layer with an SLD style which invokes the PointStacker rendering transformation.


Invocation and syntax ...

    SLD


In this SLD ...

    Lines 15-43 define the PointStacker rendering transformation, giving values for the transformation parameters which are appropriate for the input dataset.

        Line 18 specifies the input dataset parameter name.

        Line 22 specifies a cell size of 20 to aggregate the points by.

        Lines 24-42 define the output parameters, which are obtained from internal environment variables set during rendering, as described above.


    Lines 44-175 define styling rules which are applied to the transformation output to produce the rendered layer.

        Lines 44-64 define a rule for depicting a single (unstacked) point using a red triangle symbol.

        Lines 65-123 define a rule for depicting a stacked point which has a count in the range 2 to 9. The points are styled as dark red circles of size 14 pixels, with a label showing the count inside them.

        Lines 123-175 define a rule for depicting a stacked point which has a count of 10 or greater. The points are styled as dark red circles of size 22 pixels, with a label showing the count inside them.



http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities&format=application/openlayers&styles=,transform_pointstacker

http://localhost:8080/geoserver/wms/reflect?layers=ocean,countries,cities&format=application/openlayers&styles=ocean,countries,transform_pointstacker



