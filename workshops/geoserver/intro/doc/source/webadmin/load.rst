Loading your first data set
=======================================

OpenGeo suites comes with a convenient tool to import and publish a zip file of shapes. This tools will be open source'd soon according to this `GeoServer mailing list thread <http://osgeo-org.1560.x6.nabble.com/New-old-community-module-importer-td5057469.html>`_.

In this workshop, as we use a clean official GeoServer instance we will do the minimum steps to load and publish a shapefile.

#. In the :file:`data` directory of your workshop materials, you will see a file called :file:`meteors.zip`. It is a shapefile contained inside an archive (ZIP file). If you double click on the archive, you'll see that it contains the following files:

   * :file:`meteors.shp`
   * :file:`meteors.shx`
   * :file:`meteors.dbf`
   * :file:`meteors.prj`

#. Create a folder :file:`workshop` under your GeoServer data directory (:file:`/home/user/bin/geoserver-2.3.3/data_dir`) and
uncompress the meteors zip file there.

   .. figure:: img/load_meteorsfolder.png

      Uncompress the meteors file into the GeoServer data directory

#. Go to the GeoServer admin interface and click on the :guilabel:`Stores` option on the :guilabel:`Data` section.

   .. figure:: img/load_stores.png

      The stores web page

#. Click on :guilabel:`Add new store`

#. Select :guilabel:`Shapefile` on the Vector data sources

#. Select a proper name (``meteors`` should be OK)

#. Click on the :guilabel:`Browse...` link to navigate and select the :file:`meteors.shp` file under your :file:`workshop` folder.

   .. figure:: img/load_shapefile.png

      Configure a single shapefile store

#. Save the changes

#. A new store has been created with just one layer, click on :guilabel:`Publish` link

#. On the new page (we will discuss this later) just go down and click on the :guilabel:`Compute from data` and :guilabel:`Compute from native bounds` and click on the :guilabel:`Save` button.

   .. figure:: img/load_computebbox.png

      Compute the bounding box of the shapfile data

#. Now your layer has been published and it's accesible from WMS and WFS requests

#. Go to the :guilabel:`Layer Preview` section and look for your meteors layer.

#. Click on the :guilabel:`OpenLayers` link and a web viewer will show with your data using a default gray style.

   .. figure:: img/load_ollink.png

      Access a quick preview of your layer

.. hint:: Take your time to see the capabilities of the Open Layers web preview. You can get information of the features, enlarge the view, change to a tiled map, filter the data and more.

         .. figure:: img/load_olpreview.png

            Access a quick preview of your layer