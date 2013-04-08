.. _gsadv.filtering.wmsdims:

WMS dimensions
==============

What is WMS dimensions?
-----------------------

Built-in Filters for Time / Elevation

    Dimensions introduced in WMS 1.1.0

    Data natively time and elevation "aware"

    Previously achieved with complex filters


&TIME=1974-05-01T10:06:21.000Z

&ELEVATION=42

Up and down over time

Version 1.1.0 of the OGC WMS spec introduced the notion of time and elevation dimensions to WMS ...

Spatial data had long-had ...

> time/date fields (marking the occurrence of a geographic event) or 

> attributes that represented feature elevations (or Zs on the features themselves)

But WMS lacked a decent mechanism for realizing that information ...

I mention this here since these dimensions can act like built-in filters on WMS GetMap requests for data that are made aware that these dimensions exist on them as attributes ...

We could have accomplished this using ~normal~ filters on the attributes' literal values, but ...

> As we've learned, those are vendor parameters, so we might feel some some pricklyness from OGC purists

> (And rightly so, if there's a good mechanism, standardized mechanism for doing this)

> And I do think this is a good mechanism ...

> I'm not a developer, so there are probably smart ways to do this, but 

> In my experience, standardizing timestamp as strings is as much fun as sticking straight-pins under your fingernails


Enabling dimensions on a layer
------------------------------

GeoServer lets us access this feature of the WMS specification by allowing us to specify time and elevation dimensions on layers with suitable attribute types ...

You simply enable either (or both) dimensions on a layer that has timestamp (for date) and/or a numeric fields (for elevations) ...

Naturally, one of these (ie the timestamps) is more stringently ~policed~ than the other ...

You could realistically enable the elevation dimension to dynamically filter anything numeric, provided you could live with the misnomer in your GetMap's ELEVATION= parameter

(I've pre-loaded data ... Included in the workshop package as a PostGIS dump file [along with instructions for loading])

Have a look at the layer we'll be working with ...

> In GeoServer > Data > Layers > select the globe layer

> Notice in the layers editor that you now have a DIMENSION tab

> Because our data have a timestamp field we have the option to enable the time dimension

> (If we didn't have a field with a date/time format, this option would have been disabled)

> Likewise we need a numeric field to enable the elevation dimension, 

> (Most [but not all] tables will have a numeric field, so elevation is typically always enabled)

    Base attribute (the field that contains the time/elevation observations)

    End attribute (optional "width" of our date ranges)

    [[[]]] Presentation


> For our globe_temp_dailies layer ...

* Enable the time dimension

* Select the measured_at field as our Attribute

* No End Attribute

* List as our Presentation Type

* Save the layer


Query string formats
--------------------

    At single point in time

        &time=
        2010-12-30T08:00:00.000Z


    Between time-stamps

        &time=
        2010-12-25T00:00:00Z/2010-12-28T00:00:00Z


    Multiple time periods

        &time=2010-12-30T08:00:00Z,
        2010-12-25T08:00:00Z/2010-12-28T08:00:00Z


Do a layer preview on the time-enabled globe daily temperatures layer ...

http://localhost:8080/geoserver/wms/reflect?layers=globe&format=application/openlayers

Identify some points ...

Do we notice anything strange?

> The data covers an entire year, but I'm only getting points at each station for a few dates ... 

> What's the deal with that?

By default (and ordained by the WMS spec) GetMap requests on dimensioned layers that omit the dimension parameter, show the maximum value (AKA the current value) for the layer

> Knowing my data, I know that

    They span a given time period (01 Jan 2010 to 31 Dec 2010)

    The intervals they're measured at (daily), and

    Their ~resolution~ (the observations are at local solar noon)


> That's good enough for me to specify an actual time like ...

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,globe&format=application/openlayers&time=2010-12-01

And (by identifying my points) confirm that I am indeed able to filter my points by

A given day ...

> (as above)

Or period ...

> time=[[[]]]/[[[]]]

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,globe&format=application/openlayers&time=2010-12-25T00:00:00Z/2010-12-28T00:00:00Z

Or periods ...

> time=[[[]]],[[[]]]/[[[]]]

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,globe&format=application/openlayers&time=2010-12-30T08:00:00Z,2010-12-25T08:00:00Z/2010-12-28T08:00:00Z


Dimensioned capabilities
------------------------

If I don't know my data (and that's fine under many conditions [huge, ETL/live, etc] the WMS capabilities document now expresses the possible values for dimensioned layers ...

> Have a look at the 1.3.0 Capabilities document 

> Find the globe temps layer ... 

> Assess the dimensions node ... Note

> name - time (we assumed that)

> default - default is current/maximum (we looked at that)

> units ... 

It's worth noting that times are expressed in compliance with the ISO8601 standard

(Our previous examples put them in this format ...)

> 2010-12-28T00:00:00Z

> YYYY-MM-DDTHH:MM:SS[.mmm]Z

This refers to times both ...

- FROM the WMS

-- Regardless of what the format looks like underneath ...  

- And TO the WMS

-- Error if not

-- java.text.ParseException: Invalid date: sammy

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,globe&format=application/openlayers&time=sammy

http://localhost:8080/geoserver/wms/reflect?layers=shadedrelief,globe&format=application/openlayers&time=2010-12-30T


Dimension precision
-------------------

    Precise ...

&TIME=1945-05-07T02:42:00.000Z

(returns only the observations at this time)

    Imprecise ...

&TIME=1980-12-08

(returns all of the observations that match this date) (regardless of time)




A precise ISO8601 date value would be something like

    1945-05-07T02:42:00.000Z


A GetMap request specifying a date like this, would only return the observations in the underlying store that match that exact time ...

Naturally, your data would have to have the precision to match

An imprecise date value would be something like

    1980-12-08


This is thin (date the date component only), but it's still IS08601-compliant

The story goes that the WMS server should return all values that match the level of precision specified ...

So from a data-set resolved down to time, we should get all of the values that occur on the 8th of December 1980, regardless of their hour/minute/second/millisecond values ...

This is not the case in the current released version of GeoServer ...

But it does work that way in the latest / trunk version ... Coming soon with the release of Suite 3.0

(Patched JARs back-ported to GeoServer 2.1.x are available)


