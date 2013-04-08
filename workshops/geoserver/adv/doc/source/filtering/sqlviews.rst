.. _gsadv.filtering.sqlviews:

SQL views
=========

SQL Views (filtering again)

What are SQL views?
-------------------

    Database stores were traditionally static
    SQL Views allow custom SQL queries
    Parameterized throughout their syntax
    Spatial or logical joins


A more traditional way to access database data is is to configure layers against either tables or database views.

We might see some ~active~ ETL or data preparation into tables, and database views will often include joins across tables and functions to change a data's state, but as far as GeoServer (or other applications accessing the data) is concerned these as somewhat ~static~.

In versions of GeoServer at and after 2.1.0, layers can be defined as SQL Views.

SQL Views allow us to execute custom SQL queries each time GeoServer requests the layer, so data access aren't quite as static as they may have seemed before.

We were able to do this in part with filters, but ...

    CQL and OGC filters are really just the WHERE part of a SQL expression,

    They apply to one layer / feature class at a time.

    Somewhat limited set of functions / predicates, and

    (At least to me) There is an ambiguous (and possibly sub-optimal) execution plan ... 


SQL Views tend not to suffer any of these limits.

Perhaps most usefully,

... as well as being arbitrary SQL executed consistently in the database using any native database functions/logic,

... SQL View queries can be parameterized via string substitution, throughout their syntax.

While planned proactively, they're not completely prescribed!

select * from cities

(no params)

select * from cities where name='%param_name%' ... (default @ 'Tokyo')

select geom, name, %param_valfield% as values from cities where country='%param_country%' ...

(defaults @ 'pop2000' and 'Japan')

Etc etc etc ... It's virtually limitless.

AND ... This is _all_ executed in the database so not only

* Can I do here virtually any select, I can do in my database

* I do so with the optimized, indexed performance of the DB engine

* I have access to all functions, stored procedures, joins ...

* Yeah joins ... I can go across tables spatially or otherwise

Re: parameters in SQL Views ...

* Parameter values can be supplied in both WMS and WFS requests

* Default values can be supplied for parameters

* Inputted values can be validated by Regular Expressions to eliminate the risk of SQL injection attacks

(SQL Views are read-only, and thus cannot be updated by WFS-T transactions.)


Adding a SQL view as a new layer
--------------------------------

A more traditional way to access database data is is to configure layers against either tables or database views.

We might see some ~active~ ETL or data preparation into tables, and database views will often include joins across tables and functions to change a data's state, but as far as GeoServer (or other applications accessing the data) is concerned these as somewhat ~static~.

In versions of GeoServer at and after 2.1.0, layers can be defined as SQL Views.

SQL Views allow us to execute custom SQL queries each time GeoServer requests the layer, so data access aren't quite as static as they may have seemed before.

We were able to do this in part with filters, but ...

    CQL and OGC filters are really just the WHERE part of a SQL expression,

    They apply to one layer / feature class at a time.

    Somewhat limited set of functions / predicates, and

    (At least to me) There is an ambiguous (and possibly sub-optimal) execution plan ... 


SQL Views tend not to suffer any of these limits.

Perhaps most usefully,

... as well as being arbitrary SQL executed consistently in the database using any native database functions/logic,

... SQL View queries can be parameterized via string substitution, throughout their syntax.

While planned proactively, they're not completely prescribed!

select * from cities

(no params)

select * from cities where name='%param_name%' ... (default @ 'Tokyo')

select geom, name, %param_valfield% as values from cities where country='%param_country%' ...

(defaults @ 'pop2000' and 'Japan')

Etc etc etc ... It's virtually limitless.

AND ... This is _all_ executed in the database so not only

* Can I do here virtually any select, I can do in my database

* I do so with the optimized, indexed performance of the DB engine

* I have access to all functions, stored procedures, joins ...

* Yeah joins ... I can go across tables spatially or otherwise

Re: parameters in SQL Views ...

* Parameter values can be supplied in both WMS and WFS requests

* Default values can be supplied for parameters

* Inputted values can be validated by Regular Expressions to eliminate the risk of SQL injection attacks

(SQL Views are read-only, and thus cannot be updated by WFS-T transactions.)


Set up a basic SQL View ... This will really look and behave like a layer at first, but it's the foundation for something greater!

> Name

cities_thin

> SQL Statement

select name, geom from cities

Note that I had to loose the habit to add ";" at the end of my SQL ...

There are no parameters in this SQL statement, so no need to refresh and/or configure those ...

But we will refresh the attributes, and take a guess at geometry type and SRID ...

It mostly get's them ... Sometimes if there's a function / conversion in the spatial sql, it misses them, but we can just them manually.

Save this ...

Set the bounding boxes, publishing options (and other layers settings)

Then don't forget to save the layer ...

Preview your work at ...

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_thin&format=application/openlayers

NOTE the WMS reflector ...


Parameterized SQL view
----------------------

In this next example we'll create a SQL view that takes a variable string parameter and applies it to an attribute comparator.

We want to query the first letter of the city (~Starts with~).

    cities_like

    select geom, name from cities where name ilike '%param1%%'

    Default to 't' ...


http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_like&format=application/openlayers&viewparams=

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_like&format=application/openlayers&viewparams=param1:s

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_like&format=application/openlayers&viewparams=param1:san

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_like&format=application/openlayers&viewparams=param1:san+d

Spatial function SQL view
-------------------------

In this example we'll create a SQL View that incorporates PostGIS Spatial Functions ...

> cities_buffer

> select name, st_buffer(geom, %param2%) from cities where name ilike '%param1%%'

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_buffer&format=application/openlayers&viewparams=

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_buffer&format=application/openlayers&viewparams=param1:s

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_buffer&format=application/openlayers&viewparams=param1:s;param2:4

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,cities_buffer&format=application/openlayers&viewparams=param1:s;param2:8


Cross layer SQL view
--------------------

My favorite SQL view application leverages the holy grail of geospatial queries ... Spatial Joins

Because we can do cross-table joins in the database, we can do cross-layer analyses in SQL Views ...

> cities_within

> select c.name, c.geom from cities as c inner join (select geom from rivers where name = '%param1%') as r on st_dwithin(c.geom, r.geom, %param2%)

> defaults Seine 1

http://localhost:8080/geoserver/wms/reflect?format=application/openlayers&layers=shadedrelief,rivers,cities_within&viewparams=

http://localhost:8080/geoserver/wms/reflect?&format=application/openlayers&layers=shadedrelief,rivers,cities_within&viewparams=param1:Thames

http://localhost:8080/geoserver/wms/reflect?&format=application/openlayers&layers=shadedrelief,rivers,cities_within&viewparams=param1:Danube

http://localhost:8080/geoserver/wms/reflect?&format=application/openlayers&layers=shadedrelief,rivers,cities_within&viewparams=param1:Danube;param2:5


Sample application
------------------

[[[ Cross layer SQL View from NRK ]]]

http://dl.dropbox.com/u/2306934/nrk.geo/examples/ut/map.html

