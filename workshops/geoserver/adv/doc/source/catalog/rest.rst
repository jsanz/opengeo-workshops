.. _gsadv.catalog.rest:

REST configuration
==================

GeoServer includes a RESTful API for interacting with the catalog without the need to go through the web-based interface.

.. warning:: WHERE IS THE DATA?

What is REST?
-------------

REST stands for **REpresentational State Transfer**. You can take this to mean the transfer (to and from a server) of representations of an object's state. GeoServer has a RESTful API to and from which you can send and receive (respectively) state representations of GeoServers resource types.

.. warning:: REST VS RESTful

The capabilities of the REST API are basically a cross-product of:

* The configurable resources in GeoServer
* The actions (verbs) we can use to make HTTP requests.

So, for each of the resources in GeoServer (workspaces, stores, layers, styles, layer groups, etc.) we can perform the following operations:

* **GET** to read an existing resource
* **POST** to add a new resource
* **PUT** to update an existing resource
* **DELETE** to remove a resource

.. figure:: img/rest_theory.png

   Diagram of the RESTful interface

.. note:: The full capacity of GeoServer's REST capabilities are described at http://docs.geoserver.org/stable/en/user/rest/api.html


REST endpoints
--------------

The top of the REST hierarchy starts here::

  http://GEOSERVER/rest/

GRAPHIC

When navigating to this endpoint through your browser, you see a number of links that match GeoServer's resource hierarchy.

Click on the following links to traverse the hierarchy::

  ``/rest/workspaces``
  ``/rest/workspaces/earth.html``
  ``/rest/workspaces/earth/datastores/earth.html``
  ``/rest/workspaces/earth/datastores/earth/featuretypes/cities.html``

SHOW OUTPUT?

Every time we click on one of these links, we are making a GET request. Notice the format for the content we are receiving is HTML. Unless otherwise specified this is the default format for GET requests.

GET requests are intended for navigation and discovery. However, when looking at the HTML output, few details are shown. More details can be retrieved by requesting information in a format other than HTML, such as JSON or XML. These can be specified by appending the appropriate extension to the request:

JSON by appending ".JSON"::

    /rest/workspaces/earth/datastores/earth/featuretypes/cities.json

XML by appending ".XML"::

    /rest/workspaces/earth/datastores/earth/featuretypes/cities.xml

SHOW OUTPUT

Both JSON and XML output show more detailed information about the given resource, such as attribute names values. XML will be used in the upcoming examples.

Now navigate back up to the XML hierarchy to the root endpoint::

  http://localhost:8080/geoserver/rest/workspaces/earth/datastores/earth/featuretypes.xml
  http://localhost:8080/geoserver/rest/workspaces/earth/datastores/cities.xml
  http://localhost:8080/geoserver/rest/workspaces/earth/datastores.xml
  http://localhost:8080/geoserver/rest/workspaces/earth.xml
  http://localhost:8080/geoserver/rest/workspaces.xml
  http://localhost:8080/geoserver/rest


These GET requests are "read-only", so to leverage the bi-directional nature of REST, we can use other actions:

We can transfer new state representations to a collection using POST, update existing state representations to an object using PUT, or send DELETE requests to an object to remove it.

Examples
--------

We will be using the `cURL <curl.haxx.se>`_ utility in this section for POST/PUT/DELETE requests, though there are other utilities that will work just as well.

Create a new workspace
~~~~~~~~~~~~~~~~~~~~~~

First, let's create a new workspace called "advanced". We want to POST the following resource information:

.. code-block:: xml

   <workspace>
     <name>advanced</name>
   </workspace>

to the ``/rest/workspaces`` endpoint. The cURL command to do this is (wrapped over multiple lines)::

  curl -u admin:geoserver -v -X POST -H 'Content-Type:text/xml'
    -d '<workspace><name>advanced</name></workspace>'
    http://localhost:8080/geoserver/rest/workspaces

Execute this command.

While a deep discussion of cURL is beyond the scope of this workshop, some of the details of this request will be helpful. The command line flags are as follows::

  -u/--user[:password]
  -v/--verbose
  -X/--request (the action to use)
  -H/--header <header> parameters

SHOW OUTPUT

Check the REST response. Looks good! You can also check the response through the GeoServer UI.

UI OUTPUT

Add a new store
~~~~~~~~~~~~~~~

Now that we've created a workspace, let's add a store. This will be a connection to a local PostGIS store. We'll do it in the same way as before, with a POST request done through cURL. This time, though, we're going to embed the XML payload in a file. Here is the content:

.. code-block:: xml

   <dataStore>
     <name>advanced</name>
     <connectionParameters>
       <host>localhost</host>
       <port>54321</port>
       <database>advanced</database>
       <user>postgres</user>
       <password>postgres</password>
       <dbtype>postgis</dbtype>
     </connectionParameters>
   </dataStore>

Save this as the file datastore_advanced.xml. Now execute the following command::

  curl -v -u admin:geoserver -X POST \
    -H 'content-type:text/xml' \
    -T datastore.advanced.xml \
    http://localhost:8080/geoserver/rest/workspaces/advanced/datastores

Note the use of ``-T`` here, which specifies a file. This was used instead of the ``-d`` flag from the previous example, which specifies that content will be contained in the command. This is advantageous when the size of the payload is large. It also allows for reusable content.

Add layers
~~~~~~~~~~

Now that a store has been created, From a store, the next logical step is to add a layer.

.. note::

   To find out what tables (layers) live in the store, you can execute the following command using psql, the command-line PostgreSQL utility::

     psql --tuples-only -c "select f_table_name from geometry_columns" advanced

   NEED TO VERIFY THIS

In this case, we have five layers: parks, rails, roads, urban, temps

Let's add them explicitly. The payload for this request is::

  <featureType>
    <name>name_of_layer</name>
  </featureType>

So the cURL request will be::

  curl -v -u admin:geoserver -X POST -H "Content-type: text/xml"
    -d "<featureType><name>parks</name></featureType>" 
    http://localhost:8080/geoserver/rest/workspaces/advanced/datastores/advanced/featuretypes

Repeat this process.

USE A SCRIPT?

Note REST responses. Now not only can we view the catalog information about the layer, if all went well we can now preview the layer itself. We'll use the WMS Reflector for simplicity:

OUTPUT, UI OUTPUT

http://localhost:8080/geoserver/wms/reflect?layers=advanced:parks

Upload styles
~~~~~~~~~~~~~

The layers have been uploaded, but they are being served using a default style. The next step is to alter the style.

The cURL command for uploading a style with filename of :file:`stylefile.sld` is::

  curl -u admin:geoserver -X POST -H "Content-type: application/vnd.ogc.sld+xml"
    -d @stylefile.sld http://localhost:8080/geoserver/rest/styles

WHY -d AND NOT -T?

We could repeat this for each style (just like we added each layer), but the advantages to the REST interface lie in the ability to script operations, so let's do that now.

BATCH EXAMPLE AS WELL


::

  for f in *sld; do

  curl -v -u admin:geoserver -X POST -H "Content-Type:application/vnd.ogc.sld+xml"
    -d @$f
    http://localhost:8080/geoserver/rest/styles;

  echo "All good? ..."; read;

  done

READ!?

.. note:: The echo/read commands are just  there to poll our response status.

SHOW OUTPUT

Add layers to a layer group
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now let's put our layers together in a layer group. More accurately, we we alter (think PUT instead of POST) an existing layer group called "earth". The payload is:

WILL THIS LAYERGROUP EXIST?

-d or -T?

.. code-block:: xml

   <layerGroup>
     <name>earth</name>
     <layers>
       <!-- existing -->
       <layer>shadedrelief</layer>
       <layer>ocean</layer>
       <layer>countries</layer>
       <layer>coastline</layer>
       <layer>rivers</layer>
       <layer>cities</layer>
       <!-- new -->
       <layer>urban</layer>
       <layer>parks</layer>
       <layer>rails</layer>
       <layer>roads</layer>
       <layer>states</layer>
       <layer>globe</layer>
     </layers>
     <styles>
       <!-- existing -->
       <style>Raster</style>
       <style>Ocean</style>
       <style>Countries</style>
       <style>Coastline</style>
       <style>Rivers</style>
       <style>Cities</style>
       <!-- new -->
       <style>Urban</style>
       <style>Parks</style>
       <style>Rails</style>
       <style>Roads</style>
       <style>States</style>
       <style>Globe</style>
     </styles>
   </layerGroup>


And the command is:

::

  curl -v -u admin:geoserver -X PUT -H "Content-type: text/xml"
    -d @layergroup.earth.xml
    http://localhost:8080/geoserver/rest/layergroups/earth

SHOW OUTPUT, PREVIEW


Deleting a resource
~~~~~~~~~~~~~~~~~~~

We've created new resources and updated existing resources, so now let's DELETE a resource. Let's create a nonsensical workspace object::

  curl -v -u admin:geoserver -X POST -H "content-type:text/xml"
    -d "<workspace><name>WhoompThereItIs</name></workspace>"
    http://localhost:8080/geoserver/rest/workspaces

SHOW OUTPUT

Indeed. We can delete it with a DELETE action directly to the resource's endpoint::

  curl -v -u admin:geoserver -X DELETE
    http://localhost:8080/geoserver/rest/workspaces/WhoompThereItIs.xml

Beware, though, that there was **no confirmation dialog** in this process. The resource was immediately deleted.
