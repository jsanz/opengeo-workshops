.. _gsadv.background:

Background
==========

Before we get started with topics, let's review what we know about GeoServer.

Web mapping Servers
-------------------

.. warning:: WHAT TO DO WITH THIS SECTION?

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

You should be familiar with GeoServer, but as a quick refresher:

GeoServer is a web-mapping server. As such, it operates as middleware between geospatial data formats and web services.

GeoServer can read many different data formats, both vector and raster, proprietary and open.

What's perhaps most important is that GeoServer acts as a **format-agnostic gateway** to spatial information. It standardizes its responses to the conventions of the OGC service specifications. While there are many services, the most frequently accessed are the Web Map Service (for map images) and Web Feature Service (for map data).

Each of these service types has it's own endpoint in GeoServer and we retrieve data in the formats prescribed by those services by making requests to those endpoints.

.. warning:: [[[]]] benefits of standardization

