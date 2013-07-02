.. _geoserver.install:

Installing GeoServer
====================

In this section, we will install GeoServer. For the purposes of this workshop. OSGeo Live comes with a GeoServer instance that we will use over all the exercises. Thus, the GeoServer instance installed on this exercise won't be used afterwards.

.. note:: OpenGeo provides a complete stack of software that includes a GeoServer instance as well as PostGIS, etc. The OpenGeo Suite is free and open source, and is `available for download from OpenGeo <http://opengeo.org/products/suite/>`_.


GeoServer download flavours
----------------------------------

GeoServer is a Java Enterprise Edition application (formerly J2EE). That is, a Java application that runs inside a Servlet Container and is packaged using the Web ARchive format (``war``). This ``war`` file is meant to be deployed on those JEE servers easily.

The download page of GeoServer offers several versions:

- *Source Code*: are the files written in Java, HTML and other programming languages that developers can inspect, modify and adapt to build the official or custom versions of GeoServer.
- *Mac OSX and Windows installers*: platform specific installers, usually the easiest way to install GeoServer for testing and development purposes.
- *Binary (OS independent)*: a cross-platform distribution of GeoServer with a servlet container included, so there aren't any dependencies, apart of a working Java Virtual Machine.
- *Web Archive*: the ``.war`` file ready to be deployed on a servlet container. This is usually the version of GeoServer to download for production servers.


Installing the OS independent binary version
----------------------------------------------------

We will use the OS independent version as it's the easiest to run and works in a similar way on OSGeo Live but also on Windows or Mac OSX.

- Download or locate your ``geoserver-2.3.3-bin.zip`` file
- Unzip this file into your ``bin`` folder at ``/home/user``

  .. figure:: img/zip-bin.png

     GeoServer uncompressed at ``/home/user/bin/`` folder

- Open a terminal and go to the ``/home/user/bin/geoserver-2.3.3/bin`` using the ``cd`` command or
  navigate with the file browser to the folder and use the context menu option *Open Terminal Here*.

- Stop a running servlet container to free the 8080 port with the command::

  $ sudo service tomcat6 stop

- Set up the ``JAVA_HOME`` environment variable with the command::

  $ export JAVA_HOME=/usr/lib/jvm/default-java

- Start GeoServer with::

  $ ./startup.sh

- After some seconds of output on the console you will see something like the image below

  .. figure:: img/geoserver-started.png

     GeoServer is ready!!

- Open a web browser and navigate to http://localhost:8080/geoserver/web

  .. figure:: img/geoserver-gui.png

     GeoServer web user interface

- You can log in using the default admin/geoserver user and password

- To stop the server return to the terminal and press :kbd:`Control+C`


That's it, this distribution of GeoServer is easiest and fastest way to test the product on any machine, you can even put in into an USB dongle and run it anywhere (if they have a Java Virtual Machine installed).

