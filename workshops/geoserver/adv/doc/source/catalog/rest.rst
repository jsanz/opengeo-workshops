.. _gsadv.catalog.rest:

REST configuration
==================

REST'ful Configuration (this is where data is set up)

What is REST?
-------------

- I understand REST pretty much through a visualization of it's namesake:
- REpresentational State Transfer ... Which I take to mean
- the transfer (to and from a server) of representations (of an object's) State
- GeoServer has a REST API to and from which you can send and receive (respectively) state representations of GeoServers resource types ...

The capabilities of the REST API are basically a cross-product of

> the configurable resources in GeoServer, and 
> the VERBS or actions we can use to make HTTP requests.

So, for each of the resources in GeoServer (eg Workspaces, Data-Stores, Layers, Styles, Groups etc.)

We can:

-- GET something and read it (GET)
-- POST something to add it anew (POST)
-- PUT to update something that exists (PUT), and
-- DELETE something to remove it (DELETE)

Mike note: The online URL has changed, and is much better. Removed the link to the local docs.

The full capacity of GeoServer's REST capabilities are described here

    http://docs.geoserver.org/stable/en/user/rest/api.html

and here

    http://localhost:8080/opengeo-docs/geoserver/rest/api.html

> Describe / Explain.

These definitions are followed-up up by examples and tutorials for a variety of tasks, some of which I'll demonstrate now.

REST endpoints
--------------

REST'fully it all starts here ...

http://localhost:8080/geoserver/rest/

Notice the links? They're clickable ...

Without coincidence, these match GeoServer's resource hierarchy.

> General navigation through the REST structure ...

    http://localhost:8080/geoserver/rest/workspaces
    http://localhost:8080/geoserver/rest/workspaces/earth.html
    http://localhost:8080/geoserver/rest/workspaces/earth/datastores/earth.html
    http://localhost:8080/geoserver/rest/workspaces/earth/datastores/earth/featuretypes/cities.html

What do we notice about the format? ...

It's HTML ...

Unless otherwise specified this is the default format for GET requests ...

Nice, but it's lacking details (intended more for ~navigation/discovery~)



For any given resource in the GeoServer REST hierarchy ...

I can request the details of it's state, by specifying a format ...

JSON for example by appending ".JSON" ...

    http://localhost:8080/geoserver/rest/workspaces/earth/datastores/earth/featuretypes/cities.json


(Partially recognizable, but hard to read)

XML for example by appending ".XML"

    http://localhost:8080/geoserver/rest/workspaces/earth/datastores/earth/featuretypes/cities.xml


(I think the XML is better formatted and slightly easier to read and work with, especially in the upcoming ~manual~ examples)

(However; other approaches (scripted) and mindsets (more programmery) might disagree)

You can use these representations to navigate too ... Sort of ...

They're not clickable, but they're very descriptive ...

Contain online resources to their child elements that you can grab and go to ... 

For fun, and because electrons are mostly free ...

Walk back up the tree in XML ...

    http://localhost:8080/geoserver/rest/workspaces/earth/datastores/earth/featuretypes.xml
    http://localhost:8080/geoserver/rest/workspaces/earth/datastores/cities.xml
    http://localhost:8080/geoserver/rest/workspaces/earth/datastores.xml
    http://localhost:8080/geoserver/rest/workspaces/earth.xml
    http://localhost:8080/geoserver/rest/workspaces.xml
    http://localhost:8080/geoserver/rest(.html)


You've probably noticed, that thus far, these have all been "GETs" ...

We can do more than just ~READ-ONLY~ GET requests through REST ...

The transfer part of representational state transfer is bi-directional ...

We can also ...

    Transfer state representations to a collection using POST to add things

    Transfer state representations to an object using PUT to update things

    Send DELETE requests to an object to remove it

CREATE A NEW WORKSPACE

For example, Let's do a POST request to create a new workspace ...

    curl -u admin:geoserver -v -X POST -H 'Content-Type:text/xml' \
    -d '<workspace><name>advanced</name></workspace>' \
    http://localhost:8080/geoserver/rest/workspaces


cURL ... (and other tools)

Break down the request ...

    -u/--user[:password]

    -v/--verbose

    -X/--request (command to use)

    -H/--header <header> parameters


Re: verbose …

This is a canned example and things ~just~ work

But there was still a learning curve … Despite really good documentation and even better mentors

I learned that I had to pay attention to the signs! (verbose output)

Execute.

Check REST response. Looks good!

Check UI. Even better than the real thing.


ADD A NEW DATASTORE


Now, what goes in workspaces?

Data-stores! (and also)

> coverage-stores [[[]]]

> wms-stores [[[]]]

Let's do another POST request to add a data-store to our new workspace ...

curl -v -u admin:geoserver -X POST \
-H 'content-type:text/xml' \
-T datastore.advanced.xml \
http://localhost:8080/geoserver/rest/workspaces/advanced/datastores

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

Note the use of -T here ...

-T lets us (transfer) / -d (data) … We had an external file on-hand for this … Often easier when size and complexity of your payload increases

** For manual "hits" you simply have the option of editing a longer schema/string in a better tool than the command line

** For automated stuff it lets you work off of a template / saved configuration, if that's what you want to do ... You can build dynamically in response to your data (and business rules, etc.) if needed.

** If not on-hand we could have GET’ed this from an existing resource and edited it, but ... That's a little murky ...


ADD FEATURETYPE/LAYERS


What comes from datastores? (Specifically PostGIS data-stores?)

Tables / FeatureTypes / Layers

But which tables / feature types live in the store?

There are at least two ways to get this ...

a) Know your data …

> In this case I have:

> parks, rails, roads, urban, temps

> and add them explicitly ... 

curl -v -u admin:geoserver -X POST -H 'Content-type: text/xml' \

-d '<featureType><name>parks</name></featureType>' \
http://localhost:8080/geoserver/rest/workspaces/advanced/datastores/advanced/featuretypes

parks

rails

roads

states

urban

globe

b) Learn from your data …

> psql --tuples-only -c "select f_table_name from geometry_columns" advanced

    > Then do something with that knowledge …

I don't want to prescribe your approaches too much ... Those are just two of many

- One more interactive, maybe if I didn't want to add all my layers carte blanche?

- One tends towards automation, but might over-add things?

- Script foo is your friend ... Find your zen.

Fire off the command(s) ...

Note REST response(s) ...

Preview in UI …

http://localhost:8080/geoserver/wms/reflect?layers=advanced:parks

<etc...>

These layers are "Up There on the server", but generally they're un-styled, and lonely …

... I wonder what our next example will do?



UPLOAD STYLES

Upload styles …

Generally the command is:

curl -u admin:geoserver -X POST -H 'Content-type: application/vnd.ogc.sld+xml' -d @<stylefile>.sld http://localhost:8080/geoserver/rest/styles

We could repeat this for each style (just like we added each layer), but at this point we’re starting to see the same ~one-by-one~ limitations/headaches of the UI, in the command line calls to the REST API …

We’re not really programming to the application programming interface, we're just hitting it with less clicking and more typing.

So, how about doing some of them there iterations … ???

for f in *sld; do

curl -v -u admin:geoserver -X POST -H 'Content-Type:application/vnd.ogc.sld+xml' -d @$f http://localhost:8080/geoserver/rest/styles;

echo "All good? ..."; read;

done

Mmmm ... that's good bash foo.

Note: echo/read are just in there to pole our response status

Now we've got style(s) ... 



ADD LAYERS TO LAYER GROUP

We have added styles to make our layers look pretty, but they're still a bit lonely …

Add layers to a layer group …

(Or more aptly modify the our existing earth layergroup to include the new layers and the associated the styling information with them).

curl -v -u admin:geoserver -X PUT -H 'Content-type: text/xml' -d @layergroup.earth.xml http://localhost:8080/geoserver/rest/layergroups/earth

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



REST DELETE

One last trick …

For the sake of example, lets add a nonsensical workspace object ...

curl -v -u admin:geoserver -X POST -H 'content-type:text/xml' \
-d '<workspace><name>WhoompThereItIs</name></workspace>' \
http://localhost:8080/geoserver/rest/workspaces

Preview ...

Indeed, "Whoomp! There it is."

No one deserves to live with a workspace named after the mid-90s Miami bass duo "Tag Team"?

… So we can delete it with something like

curl -v -u admin:geoserver -X DELETE \
http://localhost:8080/geoserver/rest/workspaces/WhoompThereItIs.xml

Basher Beware ...

There was no confirmation dialog in this ... no nothin' ... Just gone ... 