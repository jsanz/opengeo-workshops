.. _gsadv.processing.rt:

Rendering transformations
=========================

NEED TO SET UP THESE SLDs

Related to processing is the rendering transformation. Rendering transformation allow processing to be carried out on data within the GeoServer rendering pipeline. This means that *the process gets applied dynamically*, between when it is accessed by GeoServer and it gets rendered as an image and shipped to your browser.

The important takeaway here is that a rendering transformation isn't any different from a process or chain of processes. The difference is that a process (through WPS) is executed at a given time and returns any number of outputs. A rendering transformation is a process that is executed in the process of rendering a WMS image. 

Theoretically, any WPS process can be executed as a rendering transformation.

NEEDS IMAGE

Types of rendering transformations
----------------------------------

The types of rendering transforms available in GeoServer include:

* Raster-to-Vector
* Vector-to-Raster
* Vector-to-Vector

Examples:

* Contour returns contour vectors from a DEM raster
* Heatmap computes a heatmap raster from weighted data points.
* PointStacker aggregates dense point data into point clusters.

Invoking rendering transformations
----------------------------------

Rendering transformations are invoked on a layer within an SLD styles. Parameters may be supplied to the transformation to control the appearance of the output.

Once transformed, the rendered output for the layer is produced by applying the styling rules and symbolizers in the SLD to the result of transformation.

This is similar to the use of filters in SLD, except that the filter is a stored process.

Installing WPS extension
------------------------

Because Rendering transformations are invoked as WPS processes, you will need to have the WPS extension installed to run them.

Note that the WPS service does not need to be *enabled* to use Rendering Transformations. To avoid unwanted consumption of server resources, it may even be desirable to disable the WPS service if it is not being used directly. To disable WPS, navigate to the WPS configuration (:guilabel:`WPS` under :guilabel:`Services`) and deselect :guilabel:`Enable WPS`.


Usage
-----

The following is a snippet of SLD that contains the transformation called "gs:ProcessName".

.. code-block:: xml

   <StyledLayerDescriptor ...>
     ...    
       <FeatureTypeStyle>
         <Transformation>
           <ogc:Function name="gs:ProcessName">
             <ogc:Function name="parameter">
               <ogc:Literal>paramName</ogc:Literal>
               <ogc:Literal>paramValue</ogc:Literal>
             </ogc:Function name="parameter">
             ... (other parameters) ...
         </Transformation>
             ... ( rest of SLD) ...
       </FeatureTypeStyle>
     ...
   </StyledLayerDescriptor>

Rendering Transformations are invoked by adding the ``<Transformation>`` element to a ``<FeatureTypeStyle>`` element in an SLD document. The <Transformation> element syntax leverages the OGC Filter function syntax. The content of the element is a <ogc:Function> with the name of the rendering transformation process. This element specifies the name of the transformation process, along with the parameter values controlling the operation of the transformation. Parameters are supplied as name/value pairs.

The first argument to this function is an <ogc:Literal> containing the name of the parameter. The optional following arguments provide the value for the parameter (if any).

Some parameters accept only a single value, while others may accept a list of values. As with any filter function argument, values may be supplied in several ways:

* As a literal value
* As a computed expression
* As an SLD environment variable (which allows obtaining values for the current request such as output image width and height)

The order of the supplied parameters does not matter.

Most rendering transformations take the dataset to be transformed as an input. This is supplied via a special parameter (named ``data``) which does not need to have a value specified. The name of the parameter is determined by the particular transformation being used.

When the transformation is executed, the input dataset is passed to it via this parameter.

The rest of the content inside the FeatureTypeStyle is the symbolizer. As this SLD is styling the *result* of the rendering transformation, the symbolizer should match the geometry of the output, not the input. Thus, for a vector-to-raster transformation, the symbolizer should be a ``<RasterSymbolizer>``. For a raster-to-vector transformation, the symbolizer can be any of ``<PointSymbolizer>``, ``<LineSymbolizer>``, ``<PolygonSymbolizer>``, and ``<TextSymbolizer>``.

Some notes:

* It is possible to display the original data along side the transformed output by using a separate ``<FeatureTypeStyle>``
* Rendering transformations may not work correctly in a tiled renderer, unless they have been specifically written to accommodate it.
* In vector-to-raster rendering transformations in order to pass validation the SLD needs to mention the geometry attribute of the input dataset even though it is not used. This is done by specifying the attribute name in the symbolizer <Geometry>element.

NEED DETAILS OF THE LAST POINT


Examples
--------

NEED TO ADD IMAGES FOR ALL OF THESE

Contour
~~~~~~~

The **gs:Contour** process is a raster-to-vector rendering transformation that extracts contour lines at specified levels from a raster DEM.

We use SLD to invoke the transformation, and style the contours as black lines

NEED SLD

Key aspects of the SLD are:

* Lines 14-15 define the rendering transformation, using the process gs:Contour.
* Lines 16-18 supply the input data parameter, named data in this process.
* Lines 19-29 supply a list of values for the process's levels parameter, which specifies the elevation levels for the contours to extract.
* Lines 35-40 specify a LineSymbolizer to style the contour lines.
* Lines 41-70 specify a TextSymbolizer to show the contour levels along the lines.

SHOW OUTPUT

http://localhost:8080/geoserver/wms/reflect?layers=sfdem&format=application/openlayers
http://localhost:8080/geoserver/wms/reflect?layers=sfdem&styles=transform_contours&format=application/openlayers
http://localhost:8080/geoserver/wms/reflect?layers=sfdem,sfdem&styles=,transform_contours&format=application/openlayers

Heat map
~~~~~~~~

The **gs:Heatmap** process is a vector-to-raster rendering transformation that generates a heat map surface from weighted point data.

Again we use SLD to invoke the heatmap rendering transformation on a layer with point geometries and an attribute population supplying the weight for the points.

The output is styled using a color ramp across the range or values in the output raster [0 .. 1].

Invocation and syntax ...

NEED SLD

Key aspects of the SLD are:

* Lines 14-15 define the rendering transformation, using the process gs:Heatmap.
* Lines 16-18 supply the input data parameter, named data in this process.
* Lines 19-22 supply a value for the process's weightAttr parameter, which specifies the input attribute providing a weight for each data point.
* Lines 23-29 supply the value for the radiusPixels parameter, which controls the "spread" of the heatmap around each point.* Lines 30-33 supply the pixelsPerCell parameter, which controls the resolution at which the heatmap raster is computed.
* Lines 34-38 supply the outputBBOX parameter, which is given the value of the standard SLD environment variable wms_bbox.
* Lines 40-45 supply the outputWidth parameter, which is given the value of the standard SLD environment variable wms_width.
* Lines 46-52 supply the outputHeight parameter, which is given the value of the standard SLD environment variable wms_height.
* Lines 55-70 specify a RasterSymbolizer to style the computed raster surface. The symbolizer contains a ramped color map for the data range [0..1].
* Line 58 specifies the geometry attribute of the input featuretype, which is necessary to pass SLD validation.

SHOW OUTPUT

http://localhost:8080/geoserver/wms/reflect?layers=cities&format=application/openlayers
http://localhost:8080/geoserver/wms/reflect?layers=cities&format=application/openlayers&styles=transform_heatmap
http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities&format=application/openlayers&styles=,transform_heatmap

Point clustering
~~~~~~~~~~~~~~~~

The **gs:PointStacker** rendering transformation is a vector-to-vector transformation that displays a data set of points with nearby points aggregated together. Often, this produces a more readable map in situations when there are many close points displayed at once. As the stacking is performed dynamically, it can be used to visualize changing data.

The stacked view is created by configuring a layer with an SLD style which invokes the PointStacker rendering transformation.

NEED SLD

Key aspects of the SLD are:

* Lines 15-43 define the PointStacker rendering transformation, giving values for the transformation parameters which are appropriate for the input dataset.
* Line 18 specifies the input dataset parameter name.
* Line 22 specifies a cell size of 20 to aggregate the points by.
* Lines 24-42 define the output parameters, which are obtained from internal environment variables set during rendering, as described above.
* Lines 44-175 define styling rules which are applied to the transformation output to produce the rendered layer.
* Lines 44-64 define a rule for depicting a single (unstacked) point using a red triangle symbol.
* Lines 65-123 define a rule for depicting a stacked point which has a count in the range 2 to 9. The points are styled as dark red circles of size 14 pixels, with a label showing the count inside them.
* Lines 123-175 define a rule for depicting a stacked point which has a count of 10 or greater. The points are styled as dark red circles of size 22 pixels, with a label showing the count inside them.

SHOW OUTPUT

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities&format=application/openlayers&styles=,transform_pointstacker
http://localhost:8080/geoserver/wms/reflect?layers=ocean,countries,cities&format=application/openlayers&styles=ocean,countries,transform_pointstacker
