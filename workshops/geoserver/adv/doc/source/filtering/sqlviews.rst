.. _gsadv.filtering.sqlviews:

SQL views
=========

This next section discusses SQL views. Not to be confused with CQL filters, SQL views allow custom SQL queries to be saved as views.

IS THIS TRUE?

A traditional way to access database data is to configure layers against either tables or database views.

There may be some data preparation into tables, and database views will often include joins across tables and functions to change a data's state, but as far as GeoServer sees these results as somewhat static.

SQL views in GeoServer
----------------------

In GeoServer, layers can be defined by SQL views. SQL views allow execution of custom SQL queries each time GeoServer requests the layer, so data access need not be static at all.

This is similar to filters, but CQL and OGC filters comprise only the WHERE part of a SQL expression. They apply to one layer / feature class at a time, ar esomewhat limited in their set of functions / predicates, and there is an ambiguous and possibly sub-optimal execution plan.

NEED MORE INFO ABOUT THE EXECUTION PLAN

SQL Views don't suffer from any of these limitations.

Perhaps most usefully, as well as being arbitrary SQL executed in the database using native database functions, SQL Views can be parameterized via string substitution.

Here are some examples of SQL views::

  SELECT * FROM cities
  SELECT * FROM cities WHERE name='%param_name%' (default @ 'Tokyo')
  SELECT geom, name, %param_valfield% AS values FROM cities WHERE country='%param_country%' (defaults @ 'pop2000' and 'Japan')

SQL Views have tremendous power and flexibility. And they are always executed in the database so performance is optimized. You also have access to all functions, stored procedures, and even joins across tables.

Regarding parameters is SQL Views:

* Parameter values can be supplied in both WMS and WFS requests
* Default values can be supplied for parameters
* Input values can be validated by regular expressions to eliminate the risk of SQL injection attacks

.. note:: SQL Views are read-only, and so cannot be updated by WFS-T transactions.


Adding a SQL view as a new layer
--------------------------------

Lets start by setting up a basic SQL View. At first, there will be no parameters in the SQL statement, so it will behave like a standard layer at first.

To create a SQL view:

#. Click :guilabel:`HERE`

#. Click :guilabel:`HERE`

#. In the :guilabel:`Name` field, enter :guilabel:`cities_thin`.

#. For the :guilabel:`SQL Statement`, enter ``select name, geom from cities``.

   .. note:: There is no semi-colon after the end of the SQL expression.

#. Set the bounding boxes, publishing options (and other layers settings) to the defaults, and then save the layer.

#. Preview your work at::

     http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_thin&format=application/openlayers

Parameterized SQL view
----------------------

Now we'll create a SQL view that takes a variable string parameter and applies it to an attribute comparator. Specifically, we'll query the first letter of the city.

#. ``cities_like``

#. ``select geom, name from cities where name ilike '%param1%%'``

#. ``Default to 't'``

#. Preview this layer::

     http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_like&format=application/openlayers&viewparams=

#. Specifiy the parameter value to alter the output::

     http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_like&format=application/openlayers&viewparams=param1:s
     http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_like&format=application/openlayers&viewparams=param1:san
     http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_like&format=application/openlayers&viewparams=param1:san+d

Spatial function SQL view
-------------------------

In this example, we'll create a SQL View that incorporates PostGIS Spatial Functions.

#. ``cities_buffer``

#. ``select name, st_buffer(geom, %param2%) from cities where name ilike '%param1%%'``

#. Preview the layer::

     http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_buffer&format=application/openlayers&viewparams=

#. With parameter values::

     http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_buffer&format=application/openlayers&viewparams=param1:s
     http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_buffer&format=application/openlayers&viewparams=param1:s;param2:4
     http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_buffer&format=application/openlayers&viewparams=param1:s;param2:8

Cross layer SQL view
--------------------

This next example uses spatial joins. Because we can do cross-table joins in the database, we can do cross-layer analyses in SQL Views.

#. ``cities_within``

#. ``select c.name, c.geom from cities as c inner join (select geom from rivers where name = '%param1%') as r on st_dwithin(c.geom, r.geom, %param2%)``

#. :guilabel:`Default` ``Seine 1``

#. Preview the layer::

     http://localhost:8080/geoserver/wms/reflect?format=application/openlayers&layers=shadedrelief,rivers,cities_within&viewparams=

#. With parameter values::

     http://localhost:8080/geoserver/wms/reflect?&format=application/openlayers&layers=shadedrelief,rivers,cities_within&viewparams=param1:Thames
     http://localhost:8080/geoserver/wms/reflect?&format=application/openlayers&layers=shadedrelief,rivers,cities_within&viewparams=param1:Danube
     http://localhost:8080/geoserver/wms/reflect?&format=application/openlayers&layers=shadedrelief,rivers,cities_within&viewparams=param1:Danube;param2:5

Sample application
------------------

.. warning::

     Cross layer SQL View from NRK

     ``http://dl.dropbox.com/u/2306934/nrk.geo/examples/ut/map.html``

