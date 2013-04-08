.. _gsadv.processing.wps:

Web Processing Service (WPS)
============================

What is WPS?
------------

“[WPS] provides rules for standardizing how inputs and outputs (requests and responses) for geospatial processing services ...  The standard also defines how a client can request the execution of a process, and how the output from the process is handled.”

Here is the OGC definition.

Like all OGC content, it is long and slightly unwieldy.

I love the OGC, but I would also love the many hours back that I've spent deciphering the WMS, WFS, and SLD specs.

Short form ...

As it's name suggests, a Web Processing Service is a service that allows you to do analytical processes over the web.

( Well ... Actually the processes/analyses are run on the server, but the calls to the processes are made over the web )

Processes are run on data, and naturally since we're talking about GeoServer ... a web mapping server ... we're mostly (but not necessarily) talking about spatial data.

Geo-Processing and Spatial-Analysis really aren't new topics

(GIS analysts have been doing them for decades)

What WPS is doing differently is:

    Taking these processes off of disparate desktops in silo'ed departments using potentially unmanaged versions of data


    And putting them onto centralized servers with canonical copies of data.


The aim of this approach is that it shouldn't be a matter of:

- Getting the GIS group to ~make me a map~ of that ...

- (and eventually getting it back)


It should be a matter (with the proper processes / data / etc. in place) of:

- Using a web call (through a UI or Service) yourself to perform your analyses, and

- Just getting it done ... NOW!

If you've seen our ~Spatial IT~ talk at various conferences or follow our blogs etc., you'll recognize OpenGeo's push for more web / less desktop throughout our domain.


How does it work?
-----------------


At a high level WPS works just like our other client/server offerings

When we talk about processes, just think of them as some sort of function, or aggregate of functions.

The definition of the process exists on a server, and it can take inputs from a client, which is then operated on by the server, and then output in some way.


If you are familiar with OGC services, than the spirit of WPS should also be familiar, as it is structured in much the same way.

For example, there is the same idea of the capabilities document (through a GetCapabilities request), which lists all of the processes known to the server.

DescribeProcess will detail the inputs and outputs of a given process (not unlike WFS DescribeFeatureType).

And, just like GetMap or GetFeature ... ExecuteProcess will perform the operation.


The data to be operated on can be POST'ed as part of the request, but that can be ugly and unwieldy.

It makes much more sense to store the data on the server, and then operate on it there.

I sort of take that back ... Among your instructions/inputs to the process, you can include feature sets if it's reasonable.

Very often your client will send data to a WPS, but in discrete manageable units ...

For example,

> No one is going to POST a 3GB raster file in order to clip it against another polygon.

> But a ~handful~ of features as the extents of a clip / overlay / etc. process will be just fine.

GeoServer and WPS
-----------------

GeoServer has had WPS support in various forms for over a year now.

It is currently available as an extension in the community version; however it is integrated into the core of the OpenGeo Suite GeoServer.

The functionality of either implementation is the same. If you've got it, you've got it all.

I should note that there is a difference between WPS as a standard, and WPS as it is implemented.  While WPS as an idea is neat, it’s the implementation that really allows it to become useful.  So today I’m speaking solely of GeoServer’s implementation of WPS, but there are other implementations, such as 52-North or Deegree.


WPS, like other OGC services, uses XML like we all breathe air.

We all know how much fun it is to write complex XML by hand ...

Thankfully, GeoServer includes a GUI request builder to perform basic tasks, and to learn or prototype syntax.

Even nicer is that when you build a process or task through the GUI, it can also generate the actual XML instructions for the process for you, so you can hold on to it for later use.

Way simpler than drawing it all out by hand.

WPS example
-----------

The buffer.

This is the absolute most simplest least useful in anything other than a pedagogical way possible type of demo

It’s sort of the "Hello World" of processing, so I feel compelled to do it.

DETAILS

POINT(0 0)


This is the XML that is POST'ed to the server in order to execute the process.

And here is the result.  

POLYGON ((2 0, 1.9753766811902755 -0.3128689300804617, 1.902113032590307 -0.6180339887498948, 1.7820130483767358 -0.9079809994790935, 1.618033988749895 -1.1755705045849463, 1.4142135623730951 -1.414213562373095, 1.1755705045849463 -1.618033988749895, 0.9079809994790937 -1.7820130483767356, 0.6180339887498949 -1.902113032590307, 0.3128689300804618 -1.9753766811902755, 0.0000000000000001 -2, -0.3128689300804616 -1.9753766811902755, -0.6180339887498947 -1.9021130325903073, -0.9079809994790935 -1.7820130483767358, -1.175570504584946 -1.618033988749895, -1.414213562373095 -1.4142135623730951, -1.6180339887498947 -1.1755705045849465, -1.7820130483767356 -0.9079809994790937, -1.902113032590307 -0.618033988749895, -1.9753766811902753 -0.312868930080462, -2 -0.0000000000000002, -1.9753766811902755 0.3128689300804615, -1.9021130325903073 0.6180339887498946, -1.7820130483767358 0.9079809994790934, -1.618033988749895 1.175570504584946, -1.4142135623730954 1.414213562373095, -1.1755705045849465 1.6180339887498947, -0.9079809994790938 1.7820130483767356, -0.6180339887498951 1.902113032590307, -0.3128689300804621 1.9753766811902753, -0.0000000000000004 2, 0.3128689300804614 1.9753766811902755, 0.6180339887498945 1.9021130325903073, 0.9079809994790933 1.782013048376736, 1.1755705045849458 1.6180339887498951, 1.4142135623730947 1.4142135623730954, 1.6180339887498947 1.1755705045849467, 1.7820130483767356 0.9079809994790939, 1.902113032590307 0.6180339887498952, 1.9753766811902753 0.3128689300804622, 2 0))


Chaining processes
------------------

WPS is not a one trick pony

We can chain existing processes together so the output of one becomes the inputs to another.

And so forth and so on.

EXAMPLES

How about chaining a viewshed with a simplification and then a smoothing process on the resulting polygon?

Or overlay a land use polygon coverage against a county coverage, then union all the resultant polygons of a certain type.

Or how about take cell towers, buffer them by a radius depending on their signal strength and elevation, then union all the buffer polygons to determine a total area of coverage. 

Types of processes
------------------

     JTS Topology Suite

        Buffer, centroid, contains, touches, etc.


    Internal GeoTools/GeoServer processes

        Bounds, Clip, Snap, Import, Query, Reproject, etc.


( Rendering Transforms - Nudge, nudge ... )

    And user-defined …

What processes will GeoServer perform through WPS?

The short answer is that processes can be anything ...

The WPS spec defines:

> How server-side processes exist 

> What a process' inputs need to look like

> Or should look like (optional and/or defaulted)

> What the response is going to look like

> (And in what formats ...)

Importantly, the WPS spec does not define what processes any vendor needs to include in it's offerings ...

By default, GeoServer ships with two sets of processes.

There was a list in that Demo UI ... But I glossed over where that list came from ...

    The JTS Topology Suite operations...

        The great list of standard processes

        Authored by Martin Davis

        (previously my colleague at OpenGeo)

    As well as a set of processes that are internal to GeoServer / GeoTools


The benefit to these GeoServer-specific processes is that the data can already be on the server.

In this way we can be set things up such that

> The large things are on the server, and 

> The inputs and outputs passed to/from the client can be very small

Build your own process
----------------------

What if the built-in processes alone or even chained together aren't sufficient?

Recall, WPS is just a framework for processes, not a definitive list of processes that your server must or can offer.

Within the bounds of the framework you can define whatever processes you want ...

There are a few options through which you can build your own processes to operate on whatever and however you need ...

Option One ...

If you’re a Java developer, you’re in luck, as you can build your classes right into GeoServer

I'm not a Java developer ... 

Another option is to use something like GeoScript!

GeoScript allows you to interact with GeoTools and all of its rich Java goodness within the context of your preferred scripting language.

You can think of GeoScript as an interpretation layer to GeoServer:Java.

GeoScript is another topic entirely ...

... but it should be enough to point out that if you’re comfortable in Python, JavaScript (and I think Groovy and Scala), you can use GeoScript comfortably.
