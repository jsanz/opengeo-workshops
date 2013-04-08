.. _gsadv.filtering:

Data filtering
==============

Data filtering (subsetting, doesn’t change the data) (needs an intro)



Filtering in GeoServer (like other data-based applications), is used to limit data from a data-source

These limits can be based on things like:

    Prescribed relevancy to the map or data context

        From a map layer of factories in the USA

        Of these US factories, I only want to display cheese producers

    Dynamic, user-expressed interest, or

        In my cheese producers map,

        My user only wants to display for producers in Wisconsin

    Scale (~Environmental~ as far as your application is concerned)

        Only show these data at this zoom level

    Cartographic Design

        Filters in SLD are what drive cartographic classifications etc


These are only some examples ...

Many other filtering scenarios, all of which can be applied simultaneously

For me, the overarching advantage to filtering is that it ...

    Allows us to separate data into multiple representations from source (where that source is single/fewer), and


    Saves us the management headaches of separating data at source. (I.e. Loading, preparing and maintaining more files/tables than we need to)


    Used to limit data from a data-source

    Interest, Relevancy, Scale, Cartography

    Applied in combinations


    Filtering's BIG WIN ...


Allows us to separate data into multiple representations from source, not at source.


.. toctree::
   :maxdepth: 2

   cqlogc
   sqlviews
   wmsdims
