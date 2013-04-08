.. _gsadv.background:

Background
==========

Background / Quick Review  (review can be thinned)

Web mapping Servers
-------------------

In a nutshell ...

A web-mapping server is a specific subset of a web-server designed to transfer mapping data (or spatial, or geographic, or geometric data).

Being a web-server at heart, a web-mapping server adheres to the same concept of requests from (distributed) clients and responses (from the server) to those client requests.

Requests ... In this context, can be thought of as very structured questions spelled out so something like a computer can understand them. They involve things like:

    Headers (authentication, content-type), and
    Methods / Verbs by which to make the request
        GET, POST, PUT, DELETE
        Approximately equivalent to READ, INSERT, UPDATE and DELETE
    URL / endpoint, and
    Querystring with parameter and value pairs (in the case of a GET), or
    Content / Payload (in the case of a POST for example)

Responses ... Are similarly structured so something like a computer can understand / handle them

    Headers
        Content-Type
            [[[]]]
        Response Codes
            [[[]]]

    Content
        Data formatted, structured and/or built from files, data and logic on the server (according to the request specifications).

GeoServer 101
-------------

It should go without saying that GeoServer, the focus of today's workshop, is a web-mapping server.

And ... As a web-mapping server ...

GeoServer hosts content in the form of the data types it can read, of which there are many.

These formats are both proprietary (SHP, Oracle, SQL Server, etc.) and open (GML), but that doesn't really matter ...

GeoServer acts as a format-agnostic gateway to spatial information ...

It standardizes it's responses to the conventions of the OGC service specifications for WMS, WFS (and WCS, and WPS)

Each of these service types has it's own endpoint in GeoServer

and we get data in the formats prescribed by those services, by making requests to those endpoints using the same standards ...

[[[]]] benefits of standardization

WMS/WFS
-------

.. note:: Lots of details about WMS/WFS, but might be too basic here.