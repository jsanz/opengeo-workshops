# -*- coding: utf-8 -*-
#
# OpenLayers Workshop Modules documentation build configuration file, created by
# sphinx-quickstart on Mon Sep 21 11:42:19 2009.
#
# This file is execfile()d with the current directory set to its containing dir.
#
# Note that not all possible configuration values are present in this
# autogenerated file.
#
# All configuration values have a default; values that are commented out
# serve to show the default.

import sys, os

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#sys.path.append(os.path.abspath('.'))

# -- General configuration -----------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be extensions
# coming with Sphinx (named 'sphinx.ext.*') or your custom ones.
extensions = []

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# The suffix of source filenames.
source_suffix = '.rst'

# The encoding of source files.
#source_encoding = 'utf-8'

# The master toctree document.
master_doc = 'index'

# General information about the project.
project = u'OpenLayers Workshop'
copyright = u'2014, Boundless and Prodevelop'

# The version info for the project you're documenting, acts as replacement for
# |version| and |release|, also used in various other places throughout the
# built documents.
#
# The short X.Y version.
version = '2.13'
# The full version, including alpha/beta/rc tags.
release = '2.13'

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#language = None

# There are two options for replacing |today|: either, you set today to some
# non-false value, then it is used:
#today = ''
# Else, today_fmt is used as the format for a strftime call.
#today_fmt = '%B %d, %Y'

# List of documents that shouldn't be included in the build.
#unused_docs = []

# List of directories, relative to source directory, that shouldn't be searched
# for source files.
exclude_trees = ['_build', '_theme']

# The reST default role (used for this markup: `text`) to use for all documents.
#default_role = None

# If true, '()' will be appended to :func: etc. cross-reference text.
#add_function_parentheses = True

# If true, the current module name will be prepended to all description
# unit titles (such as .. function::).
#add_module_names = True

# If true, sectionauthor and moduleauthor directives will be shown in the
# output. They are ignored by default.
#show_authors = False

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = 'sphinx'

# A list of ignored prefixes for module index sorting.
modindex_common_prefix = ['openlayers.']


# -- Options for HTML output ---------------------------------------------------

# The theme to use for HTML and HTML Help pages.  Major themes that come with
# Sphinx are currently 'default' and 'sphinxdoc'.
html_theme = 'bootstrap'
# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
#html_theme_options = {}

html_theme_options = {
    # Navigation bar title. (Default: ``project`` value)
    'navbar_title': "Open Layers",

    # Tab name for entire site. (Default: "Site")
    'navbar_site_name': "Modules",

    # A list of tuples containing pages or urls to link to.
    # Valid tuples should be in the following forms:
    #    (name, page)                 # a link to a page
    #    (name, "/aa/bb", 1)          # a link to an arbitrary relative url
    #    (name, "http://example.com", True) # arbitrary absolute url
    # Note the "1" or "True" value above as the third argument to indicate
    # an arbitrary url.
    # 'navbar_links': [
    #     ("Examples", "examples"),
    #     ("Link", "http://example.com", True),
    # ],

    # Global TOC depth for "site" navbar tab. (Default: 1)
    # Switching to -1 shows all levels.
    'globaltoc_depth': 2,

    # Include hidden TOCs in Site navbar?
    #
    # Note: If this is "false", you cannot have mixed ``:hidden:`` and
    # non-hidden ``toctree`` directives in the same page, or else the build
    # will break.
    #
    # Values: "true" (default) or "false"
    'globaltoc_includehidden': "true",

    # HTML navbar class (Default: "navbar") to attach to <div> element.
    # For black navbar, do "navbar navbar-inverse"
    'navbar_class': "navbar",

    # Fix navigation bar to top of page?
    # Values: "true" (default) or "false"
    'navbar_fixed_top': "false",

    # Location of link to source.
    # Options are "nav" (default), "footer" or anything else to exclude.
    'source_link_position': "footer",

    # Bootswatch (http://bootswatch.com/) theme.
    #
    # Options are nothing with "" (default) or the name of a valid theme such
    # as "amelia" or "cosmo".
    #
    # Themes:
    # * amelia
    # * cerulean
    # * cosmo
    # * cyborg
    # * cupid (v3 only)
    # * flatly
    # * journal
    # * lumen (v3 only)
    # * readable
    # * simplex
    # * slate
    # * spacelab
    # * spruce (v2 only)
    # * superhero
    # * united
    # * yeti (v3 only)
    #'bootswatch_theme': "cerulean",
    #'bootswatch_theme': "lumen",
    'bootswatch_theme': "readable",
    #'bootswatch_theme': "simplex",

    # Choose Bootstrap version.
    # Values: "3" (default) or "2" (in quotes)
    'bootstrap_version': "3",
}

# Add any paths that contain custom themes here, relative to this directory.
html_theme_path = ['../../../../themes']

# The name for this set of Sphinx documents.  If None, it defaults to
# "<project> v<release> documentation".
html_title = project

# A shorter title for the navigation bar.  Default is the same as html_title.
#html_short_title = None

# The name of an image file (relative to this directory) to place at the top
# of the sidebar.
#html_logo = None

# The name of an image file (within the static path) to use as favicon of the
# docs.  This file should be a Windows icon file (.ico) being 16x16 or 32x32
# pixels large.
#html_favicon = None

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
#html_static_path = ['_static']

# If not '', a 'Last updated on:' timestamp is inserted at every page bottom,
# using the given strftime format.
#html_last_updated_fmt = '%b %d, %Y'

# If true, SmartyPants will be used to convert quotes and dashes to
# typographically correct entities.
#html_use_smartypants = True

# Custom sidebar templates, maps document names to template names.
#html_sidebars = {}

# Additional templates that should be rendered to pages, maps page names to
# template names.
#html_additional_pages = {}

# If false, no module index is generated.
#html_use_modindex = True

# If false, no index is generated.
#html_use_index = True

# If true, the index is split into individual pages for each letter.
#html_split_index = False

# If true, links to the reST sources are added to the pages.
html_show_sourcelink = False

# If true, an OpenSearch description file will be output, and all pages will
# contain a <link> tag referring to it.  The value of this option must be the
# base URL from which the finished HTML is served.
#html_use_opensearch = ''

# If nonempty, this is the file name suffix for HTML files (e.g. ".xhtml").
#html_file_suffix = ''

# Output file base name for HTML help builder.
htmlhelp_basename = 'OpenLayersWorkshopdoc'

# Page subheading
html_context = {'subheading': 'A high-performance, geospatial JavaScript library for web-based maps. <a href="http://boundlessgeo.com/solutions/solutions-software/openlayers/">More info</a>'}

# -- Options for LaTeX output --------------------------------------------------

# The paper size ('letter' or 'a4').
latex_paper_size = 'a4'

# The font size ('10pt', '11pt' or '12pt').
latex_font_size = '10pt'

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title, author, documentclass [howto/manual]).
latex_documents = [
  ('index', 'OpenLayersWorkshop.tex', u'OpenLayers Workshop Documentation',
   u'Boundless and Prodevelop', 'manual'),
]

# The name of an image file (relative to this directory) to place at the top of
# the title page.
#latex_logo = None

# For "manual" documents, if this is true, then toplevel headings are parts,
# not chapters.
latex_use_parts = False

# NOTE!
#
# This LaTeX preamble overrides some Sphinx/LaTeX defaults in order to make
# better output.  This comment will try to explain what's going on here.
# These hacks were perpetrated by Mike and Jeff.
#
# 1. Resize images so that they are no wider than 4in.
#      Accomplished by renewing the \includegraphics command, and creating an
#      if/then statement saying to resize to 4in if large than 4in, otherwise
#      leave alone
# 2. Add drop shadow to images
#      Accomplished by wrapping the above imcludegraphics commands with a
#      \shadowbox.  Default border and spacing are changed in the \setlength
#      commands
# 3. Force LaTeX to place the images inline
#      For whatever reason, Sphinx automatically appends the \begin{figure}
#      command with [htbp], which means "put the figure where ever you feel
#      like it."  We replaced the command to be appended with [H], which
#      means "put the figure right here".  Unfortunately, this caused the
#      [htbp] text to become visible in the document.  Thus we added the
#      [6], to eat up the 6 characters, which, due to placement, would be
#      taken as arguments.



latex_preamble = """


\\usepackage{ifthen}
\\setlength\\fboxsep{0pt}
\\setlength\\fboxrule{1pt}

\\let\\OLDincludegraphics\\includegraphics
\\newlength{\\somewidth}
\\renewcommand{\\includegraphics}[1]{
  \\settowidth{\\somewidth}{\\OLDincludegraphics{#1}}
  \\ifthenelse{\\lengthtest{\\somewidth>4in}}{
    {\\OLDincludegraphics[width=4in]{#1}}}{
    {\\OLDincludegraphics{#1}}}
}

\\usepackage{float}

\\let\\origfigure=\\figure
\\renewenvironment{figure}[6]{
  \\origfigure[H]}
{\\endlist}


"""

latex_elements = {
  'fontpkg': '\\usepackage{palatino}',
  'fncychap': '\\usepackage[Sonny]{fncychap}',
}

# Documents to append as an appendix to all manuals.
#latex_appendices = []

# If false, no module index is generated.
latex_use_modindex = False
