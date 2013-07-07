<div class="slides">
    <section>
        <h2 class="absolute-element" style="position: absolute; width: 962px; height: 679px; z-index: 4; left: 0px; top: 1px;">
<img src="https://s3.amazonaws.com/media-p.slid.es/uploads/albertoromeu/images/41364/slide_first.png">
<br>
</h2>
</section>
        <section>
            <h1>
    <br>
</h1>
<h1>INTRODUCTION TO&nbsp;</h1>
<h1>
<font color="#6598cd">WEB DEVELOPMENT</font>
</h1>
<div>
    
<font color="#6598cd">
<a href="http://www.twitter.com/alrocar" target="_blank">@alrocar</a>
</font>
</div>
</section>
            <section>
                <h1>
                    <font color="#6598cd">AGENDA</font>
                </h1>
                <div>
                    <br>
                </div>
<div>
                <ol>
<li class="fragment" data-fragment-index="0">HTML (15')</li>
<li class="fragment" data-fragment-index="1">CSS (15')</li>
<li class="fragment" data-fragment-index="2">JavaScript (60')</li>
                <li class="fragment" data-fragment-index="3">Lab (30')</li>
</ol>
            </div>




</section>
            <section>
                <h1>WEB DEVELOPMENT <font color="#6598cd">TOOLS</font>
            </h1>
<div>
            <ul>
<li class="fragment" data-fragment-index="0">A text editor</li>
<li class="fragment" data-fragment-index="1">A browser</li>
<li class="fragment" data-fragment-index="2">A web server</li>
</ul>
        </div>
    </section>
    <section data-background-color="rgba( 0, 0, 0, 0.6 )">
        <h1>INTRO TO <font color="#6598cd">HTML</font>
    </h1>
<div>
    <ul>
<li class="fragment" data-fragment-index="0">Hyper Text Markup Language</li>
<li class="fragment" data-fragment-index="1">Standard for writing web pages</li>
<li class="fragment" data-fragment-index="2">HTML Tags - 1991</li>
<li class="fragment" data-fragment-index="3">HTML 2.0 - 1995</li>
<li class="fragment" data-fragment-index="4">HTML 4.0 - 1997</li>
<li class="fragment" data-fragment-index="5">HTML 5.0 - ¿2014?</li>
</ul>
</div>
</section>
<section data-background-color="rgba( 0, 0, 0, 0.6 )">
    <h1>
        <font color="#6598cd">WHAT</font> IS HTML?</h1>
<div class="fragment" data-fragment-index="0">
        <font color="#6598cd" style="font-size: 42px;">
            <b>WEB PAGES </b>
        </font>that run in a web browser (client side)</div>
<div>
        <br>
    </div>
<div class="fragment" data-fragment-index="1">
<pre><code> &lt;html&gt;</code><code>  &lt;head&gt;
    &lt;meta charset="utf-8" /&gt;
    &lt;title&gt;A tiny document&lt;/title&gt;
  &lt;/head&gt; &nbsp;</code><code>  &lt;body&gt;

    &lt;p&gt;My dog ate all the guacamole.&lt;/p&gt;

  &lt;/body&gt;
&lt;/html&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 0, 0, 0, 0.6 )">
    <h1>THE <font color="#6598cd">DOCUMENT</font> TREE</h1>
<div>
<img src="https://s3.amazonaws.com/media-p.slid.es/uploads/alrocar/images/44875/document-tree.png">
<br>
</div>
<div>
<br>
</div>
</section>
    <section data-background-color="rgba( 12, 25, 77, 0.6)">
        <h1>
            <font color="#6598cd">TAGS</font>
        </h1>
<div>&lt;tag&gt;content&lt;/tag&gt;</div>
<div>
        <br>
    </div>
<div class="fragment" data-fragment-index="0">
<pre><code><span style="font-family: monospace;">&lt;!--paragrapah--&gt;</span></code><code><span style="font-family: monospace;">&lt;p&gt;This is text within a paragraph.&lt;/p&gt;</span><br></code><code><br></code><code>&lt;!--nested tags--&gt;</code><code>&lt;p&gt;I &lt;strong&gt;really&lt;/strong&gt; mean that&lt;/p&gt;<br></code><code><br></code><code>&lt;!-- single elements --&gt;</code><code>&lt;img src="smileyface.jpg" /&gt;<br></code></pre>
</div>
</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h1>
        <font color="#6598cd">ATTRIBUTES</font>
    </h1>
<div>&lt;tag attributeName="attributeValue"&gt;content&lt;/tag&gt;</div>
<div>
    <br>
</div>
<div class="fragment" data-fragment-index="0">
<pre><code>&lt;p id="myinput"&gt;</code><code><br></code><code>&lt;p class="foo"&gt;<br></code><code><br></code><code>&lt;img src="picture.gif" width="40" height="20" alt="I am a picture" /&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">HEAD</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code>&lt;head&gt;</code><code>&lt;meta name="keywords" content="HTML, CSS, JavaScript"&gt;
&lt;meta name="description" content="Intro to web dev"&gt;
&lt;meta name="author" content="Alberto Romeu"&gt;
&lt;meta http-equiv="refresh" content="30"&gt;</code><code>
&lt;title&gt;Title of the document&lt;/title&gt;
<br></code><code>&lt;/head&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">BODY</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code> &lt;body&gt;</code><code>Write here the content of your web page</code><code> &lt;/body&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">HEADING</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code> &lt;h1&gt;I'm a very big heading&lt;/h1&gt;</code><code><br></code><code><span style="font-family: monospace; font-size: 19.662282943725586px; font-style: normal; font-variant: normal;"> &lt;h2&gt;I'm a quite big heading&lt;/h2&gt;</span><br></code><code><span style="font-family: monospace; font-size: 19.662282943725586px; font-style: normal; font-variant: normal;"><br></span></code><code><span style="font-family: monospace; font-size: 19.662282943725586px; font-style: normal; font-variant: normal;"> &lt;h3&gt;I'm a big heading&lt;/h3&gt;</span><span style="font-family: monospace; font-size: 19.662282943725586px; font-style: normal; font-variant: normal;"><br></span></code><code><span style="font-family: monospace; font-size: 19.662282943725586px; font-style: normal; font-variant: normal;"><br></span></code><code><span style="font-family: monospace; font-size: 19.662282943725586px; font-style: normal; font-variant: normal;"> &lt;h4&gt;I'm a heading&lt;/h4&gt;</span><span style="font-family: monospace; font-size: 19.662282943725586px; font-style: normal; font-variant: normal;"><br></span></code><code><span style="font-family: monospace; font-size: 19.662282943725586px; font-style: normal; font-variant: normal;"><br></span></code><code><span style="font-family: monospace; font-size: 19.662282943725586px; font-style: normal; font-variant: normal;">.</span></code><code><span style="font-family: monospace; font-size: 19.662282943725586px; font-style: normal; font-variant: normal;">.</span></code><code><span style="font-family: monospace; font-size: 19.662282943725586px; font-style: normal; font-variant: normal;">.</span></code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">PARAGRAPH</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code>&lt;p&gt;
    Here’s a paragraph.
&lt;/p&gt;
&lt;p&gt;
    And here’s a different one.
    It’s as simple as that.
&lt;/p&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">LINE BREAK</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code> I’d like to write some text&lt;br&gt;and then have the next bit on the line below.</code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">span</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code>&lt;p&gt;Here’s a paragraph of text. What I want to happen is to make &lt;span style="font-weight:bold;"&gt;some of the text bold&lt;/span&gt;&lt;/p&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">link</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code> &lt;a href="http://www.prodevelop.es" target="blank"&gt;This is a link&lt;/a&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">IMAGE</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code>&lt;img src="picture.jpg" width="104" height="142" /&gt;</code><code><br></code><code>&lt;a href="http://www.prodevelop.es" target="blank"&gt;</code><code><span style="font-family: monospace;">  &lt;img src="picture.jpg" width="104" height="142"/&gt;</span></code><code>&lt;/a&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">DIV</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code>Here’s some content…
&lt;div&gt;This is a div.&lt;/div&gt;
&lt;div&gt;And this is another one. Works pretty much like a new paragraph for now.&lt;/div&gt;
Here’s some more content…</code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">TABLE</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code>&lt;table border="1"&gt;
  &lt;tr&gt;
    &lt;th&gt;Header 1&lt;/th&gt;
    &lt;th&gt;Header 2&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;row 1, cell 1&lt;/td&gt;
    &lt;td&gt;row 1, cell 2&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;row 2, cell 1&lt;/td&gt;
    &lt;td&gt;row 2, cell 2&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">list</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code>&lt;ul&gt;
  &lt;li&gt;Coffee&lt;/li&gt;
  &lt;li&gt;Milk&lt;/li&gt;
&lt;/ul&gt;</code><code><br></code><code>&lt;ol&gt;
  &lt;li&gt;Coffee&lt;/li&gt;
  &lt;li&gt;Milk&lt;/li&gt;
&lt;/ol&gt;<br></code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>html <font color="#6598cd">layouts</font>
</h1>
<div>
<br>
</div>
<div>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;

&lt;div id="container" style="width:500px"&gt;

&lt;div id="header" style="background-color:#FFA500;"&gt;
&lt;h1 style="margin-bottom:0;"&gt;Main Title of Web Page&lt;/h1&gt;&lt;/div&gt;

&lt;div id="menu" style="background-color:#FFD700;height:200px;width:100px;float:left;"&gt;
&lt;b&gt;Menu&lt;/b&gt;&lt;br&gt;
HTML&lt;br&gt;
CSS&lt;br&gt;
JavaScript&lt;/div&gt;

&lt;div id="content" style="background-color:#EEEEEE;height:200px;width:400px;float:left;"&gt;
Content goes here&lt;/div&gt;

&lt;div id="footer" style="background-color:#FFA500;clear:both;text-align:center;"&gt;
I'm the footer&lt;/div&gt;

&lt;/div&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">FORM</font> AND <font color="#6598cd">INPUT</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code>&lt;form&gt;
First name: &lt;input type="text" name="firstname"&gt;&lt;br&gt;
Last name: &lt;input type="text" name="lastname"&gt;
&lt;/form&gt;</code><code><br></code><code>&lt;form name="input" action="html_form_action.php" method="get"&gt;
Username: &lt;input type="text" name="user"&gt;
&lt;input type="submit" value="Submit"&gt;
&lt;/form&gt;<br></code></pre>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">IFRAME</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code> &lt;iframe src="demo_iframe.htm" width="200" height="200"&gt;&lt;/iframe&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 180, 50, 140, 0.6 )">
    <h1>
    <font color="#6598cd">LEARNING</font> RESOURCES</h1>
    <div>
        <br>
    </div>
    <div>
        <ul>
            <li>
                <a href="https://developer.mozilla.org/en-US/docs/Web_Development/Introduction_to_Web_development" target="blank" style="font-size: 32px; text-align: center;">Mozilla Intro to web development&nbsp;</a>
                <br>
            </li>
            <li>
                <a href="http://www.webdesignfromscratch.com/html-css/introduction-to-html/" target="blank" style="font-size: 32px; text-align: center;">Intro to HTML&nbsp;</a>
                <br>
            </li>
            <li>
                <a href="http://www.w3schools.com/html/" target="blank" style="font-size: 32px; text-align: center;">W3Schools intro to HTML&nbsp;</a>
                <br>
            </li>
        </ul>
    </div>
<div>
    <font style="font-size: 32px;">
</font>
</div>
<div>
<font style="font-size: 32px;">
</font>
</div>
<div>
</div>
<div>
<br>
</div>

</section>
<section data-background-color="rgba( 0, 0, 0, 0.6 )">
    <h1>INTRO TO <font color="#6598cd">CSS</font>
</h1>
<div>
<ul>
<li class="fragment" data-fragment-index="0">Cascading Style Sheets</li>
<li class="fragment" data-fragment-index="1">Standard for styling HTML elements</li>
<li class="fragment" data-fragment-index="2">CSS 1 &nbsp;1996</li>
<li class="fragment" data-fragment-index="3">CSS 2 1998</li>
<li class="fragment" data-fragment-index="4">CSS3 2012</li>
<li class="fragment" data-fragment-index="5">Browser support!!&nbsp;<a href="http://caniuse.com/" target="blank">http://caniuse.com/</a>
</li>
</ul>
</div>
</section>
<section data-background-color="rgba( 200, 50, 30, 0.6 )">
    <h1>
        <font color="#6598cd">INTERNAL</font> STYLESHEET</h1>
<div>
        <br>
    </div>
<div>
<pre><code>&lt;head&gt;
&lt;title&gt;&lt;title&gt;
<br></code><code>&lt;style type=”text/css”&gt;
CSS Content Goes Here
&lt;/style&gt;
<br></code><code>&lt;/head&gt;
&lt;body&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 200, 50, 30, 0.6 )">
    <h1>
        <font color="#6598cd">EXTERNAL</font> STYLESHEET</h1>
<div>
        <br>
    </div>
<div>
<pre><code>&lt;head&gt;
&lt;title&gt;&lt;title&gt;
<br></code><code>&lt;link rel=”stylesheet” type=”text/css” href=”style.css” /&gt;
<br></code><code>&lt;/head&gt;
&lt;body&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 200, 50, 30, 0.6 )">
    <h1>
        <font color="#6598cd">INLINE</font> STYLES</h1>
<div>
        <br>
    </div>
<div>
<pre><code> &lt;p style=”color: #ff0000;”&gt;Some red text&lt;/p&gt;</code></pre>
</div>
</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h1>CSS <font color="#6598cd">SYNTAX</font>
</h1>
<div>selector { property: value }<br>
</div>
<div>
    <br>
</div>
<div class="fragment" data-fragment-index="0">
<pre><code>body {
  background: #eeeeee;
  font-family: “Trebuchet MS”, Verdana, Arial, serif;
}</code></pre>
</div>

</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h1>
        <font color="#6598cd">INHERITANCE</font>
    </h1>
<div>
    <br>
</div>
<div>
<pre><code>body {font-family: Verdana, serif;}


h1 {font-family: Georgia, sans-serif;}
p {font-family: Tahoma, serif;}</code></pre>
</div>
</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h1>TAG <font color="#6598cd">SELECTOR</font>
</h1>
<div>
<br>
</div>
<div>
<div style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;">
<pre style="width: 862.0169677734375px;">
    <code> &lt;p&gt;this is a paragraph&lt;/p&gt;</code>
</pre>
</div>
<div style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;">
<pre style="width: 862.0169677734375px;">
</pre>
</div>
</div>
<div>
<br>
</div>
<div class="fragment" data-fragment-index="0">
<pre><code><span style="font-family: monospace;"> </span><span style="font-family: monospace;">p {font-family: Tahoma, serif;}</span><br></code></pre>
</div>
</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h1>CLASS <font color="#6598cd">SELECTOR</font>
</h1>
<div>
<br>
</div>
<div>
<pre><code> <span> &lt;span class="greentext"&gt;I'm green&lt;/span&gt;</span></code></pre>
</div>
<div>
<br>
</div>
<div class="fragment" data-fragment-index="0">
<pre><code> .greentext {</code><code>  font-size: small;</code><code>  color: #008080;</code><code>}</code></pre>
</div>
<div>
</div>
</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h1>id <font color="#6598cd">selector</font>
</h1>
<div>
<br>
</div>
<div>
<pre><code>&lt;div id="container"&gt;</code><code>This is a div</code><code>&lt;/div&gt;</code></pre>
</div>
<div>
<br>
</div>
<div class="fragment" data-fragment-index="0">
<pre><code> #container {</code><code>  width: 80%;</code><code>  margin: auto;</code><code>  padding: 20px;</code><code>  background: #ffffff;</code><code>  border: 1px solid #666;</code><code>}</code></pre>
</div>
</section>
<section data-background-color="rgba( 180, 50, 140, 0.6 )">
    <h1>NESTED <font color="#6598cd">SELECTORS</font>
</h1>
<div>
<span style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;">
    <br>
</span>
</div>
<div>
<span style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;">
    <a href="http://net.tutsplus.com/tutorials/html-css-techniques/the-30-css-selectors-you-must-memorize/" target="blank">30 css selectors you must memorize</a>
</span>
<br>
</div>
</section>
<section data-background-color="rgba( 180, 50, 140, 0.6 )">
    <h1>
    <font color="#6598cd">PROPERTIES</font>
</h1>
<div>
<br>
</div>
<div>
    <a href="http://www.w3.org/TR/CSS21/propidx.html" target="blank">CSS 2.1 properties</a>
    <br>
</div>
<div>
    <a href="http://meiert.com/en/indices/css-properties/" target="blank">Comprehensive list of properties</a>
    <br>
</div>
</section>
    <section data-background-color="rgba( 180, 50, 140, 0.6 )">
        <h1>
    <font color="#6598cd">LEARNING</font> RESOURCES</h1>
        <div>
            <br>
        </div>
<div>
        <ul>
            <li>
                <a href="http://www.cssbasics.com/introduction-to-css/" target="blank" style="text-align: center;">Intro to CSS</a>
                <br>
            </li>
            <li>
                <a href="http://www.w3schools.com/css/css_syntax.asp" target="blank" style="text-align: center;">CSS syntax</a>
                <br>
            </li>
            <li>
                <a href="http://ureddit.com/files/class24073/files/03-css.pdf" target="blank" style="text-align: center;">CSS basics</a>
                <br>
            </li>
            <li>
                <a href="http://www.w3.org/TR/CSS2/selector.html" target="blank" style="text-align: center;">CSS selectors</a>
                <br>
            </li>
            <li>
                <a href="http://www.w3.org/Style/CSS/specs" target="blank" style="text-align: center;">CSS specs</a>
                <br>
            </li>
            <li>
                <a href="http://twitter.github.io/bootstrap/base-css.html" target="blank" style="text-align: center;">Twitter bootstrap</a>
                <br>
            </li>
        </ul>
</div>





<div>
    <br>
</div>
</section>
        <section data-background-color="rgba( 0, 0, 0, 0.6 )">
            <h1>INTRO TO <font color="#6598cd">JAVASCRIPT</font>
        </h1>
<div>
        <ul>
<li class="fragment" data-fragment-index="0">Scripting programming language</li>
<li class="fragment" data-fragment-index="1">Client side (also server side)</li>
<li class="fragment" data-fragment-index="2">Interpreted (runtime evaluation)</li>
<li class="fragment" data-fragment-index="3">JavaScript 1.0 - 1996</li>
<li class="fragment" data-fragment-index="4">Javascript 1.8.5 - 2010</li>
</ul>
    </div>
</section>
<section data-background-color="rgba( 200, 50, 30, 0.6 )">
    <h1>
        <font color="#6598cd">JAVASCRIPT</font> IN HTML</h1>
<div>
        <br>
    </div>
<div class="fragment" data-fragment-index="0">
<pre><code>&lt;script type="text/javascript"&gt;
//JavaScript goes here
&lt;/script&gt;</code></pre>
</div>
<div>
<br>
</div>
<div class="fragment" data-fragment-index="1">
<pre><code>&lt;script src="whatever.js" type="text/javascript"&gt;&lt;/script&gt; </code></pre>
</div>
<div>
<br>
</div>
<div>
<br>
</div>
</section>
<section data-background-color="rgba( 255, 122, 0, 0.6 )">
    <h1>
        <br>
    </h1>
    <h1>JAVASCRIPT <font color="#6598cd">LAB</font>
</h1>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>
        <font color="#6598cd">JSON</font>
    </h1>
<div>
    <ul>
<li class="fragment" data-fragment-index="0">JavaScript Object Notation</li>
<li class="fragment" data-fragment-index="1">Plain Text</li>
<li class="fragment" data-fragment-index="2">Human readable</li>
<li class="fragment" data-fragment-index="3">JSON.parse(), JSON.stringify()</li>
<li class="fragment" data-fragment-index="4">Faster, shorter, easier... than XML</li>
</ul>
</div>
</section>
<section data-background-color="rgba( 12, 25, 77, 0.6)">
    <h1>THE <font color="#6598cd">DOCUMENT</font> TREE</h1>
<div>
<img src="https://s3.amazonaws.com/media-p.slid.es/uploads/alrocar/images/44875/document-tree.png">
<br>
</div>
<div>
<br>
</div>
</section>
    <section data-background-color="rgba( 12, 25, 77, 0.6)">
        <h1 style="font-style: normal; font-variant: normal;">
            <font color="#6598cd">DOM</font>
        </h1>
        <h2>Document oBJECT MODEL</h2>
        <div>
            <br>
        </div>
<div>
        <ul>
<li class="fragment" data-fragment-index="0">Access with JavaScript</li>
<li class="fragment" data-fragment-index="1">Better with jQuery</li>
</ul>
    </div>
<div>
    <br>
</div>
<div>
    
    <br>
</div>
</section>
    <section data-background-color="rgba( 50, 200, 90, 0.4 )">
        <div style="overflow:hidden !important;">
<h1>
    <font style="font-size: 112px;" color="#6598cd">libraries</font>&nbsp;<br>
        </h1>
<h2>
            <font color="#ffffff">vs</font>
        </h2>
            <h1>
                <font style="font-size: 112px;" color="#6598cd">micro-frameworks&nbsp;
            </font>
    </h1>
            <h2>
                <font color="#ffffff">VS</font>&nbsp;</h2>
                <h1>
<font style="font-size: 112px;" color="#6598cd">TOOLKITS</font>
</h1>
</div>

</section>
    <section data-background-color="rgba( 50, 200, 90, 0.4 )">
        <h1>JAVASCRIPT <font color="#6598cd">LIBRARIES</font>
    </h1>
    <div>
        <br>
    </div>
    <div>
        <ul>
            <li style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;" class="fragment" data-fragment-index="0">A collection of functionality you can call.</li>
            <li style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;" class="fragment" data-fragment-index="1">Integrated.</li>
            <li style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;" class="fragment" data-fragment-index="2">Tested</li>
            <li style="font-style: normal; font-variant: normal;" class="fragment" data-fragment-index="3">
                <span style="font-style: normal; font-variant: normal;">
                    <font style="font-size: 72px;">
                        <b>BIG</b>
                    </font>
                </span>
                <br>
            </li>
        </ul>
    </div>
</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h2>JAVASCRIPT <font color="#6598cd">MICRO-FRAMEWORKS</font>
</h2>
<div>
    <font color="#6598cd">
        <br>
    </font>
</div>
<div>
    <ul>
        <li style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;" class="fragment" data-fragment-index="0">Solves a single problem</li>
        <li style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;" class="fragment" data-fragment-index="1">Modular</li>
        <li style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;" class="fragment" data-fragment-index="2">Not always integrated</li>
        <li style="font-style: normal; font-variant: normal;" class="fragment" data-fragment-index="3">
            <span style="font-style: normal; font-variant: normal;">
                <font style="font-size: 24px;">
                    <b>Small</b>
                </font>
            </span>
        </li>
        <li style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;" class="fragment" data-fragment-index="4">
            <span style="font-size: 36.047515869140625px; font-style: normal; font-variant: normal;">http://microjs.com/</span>
        </li>
    </ul>
</div>
</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h1>javascript <font color="#6598cd">toolkits</font>
</h1>
<div>
    <font color="#6598cd">
        <br>
    </font>
</div>
<div>
    <ul>
        <li class="fragment" data-fragment-index="0">
            <span style="text-align: center;">Several libraries together</span>
            <br>
        </li>
        <li class="fragment" data-fragment-index="1">
            <span style="text-align: center;">Set of components you can use (or not)</span>
            <br>
        </li>
        <li class="fragment" data-fragment-index="2">
            <span style="text-align: center;">Integrated</span>
            <br>
        </li>
        <li class="fragment" data-fragment-index="3">
            <b style="text-align: center;">
                <font style="font-size: 72px;">BIGGER</font>
            </b>
            <br>
        </li>
    </ul>
</div>
</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h1>
        <font color="#6598cd">widgetS</font>
    </h1>
    <div>
        <br>
    </div>
<div>
    <ul>
<li>jQuery UI</li>
<li>ExtJS</li>
<li>MochaUI</li>
<li>Dijit</li>
</ul>
</div>
</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h1>
        <font color="#6598cd">Graphical</font>
    </h1>
    <div>
        <br>
    </div>
<div>
    <ul>
<li>D3</li>
<li>Raphael</li>
<li>Kinetic</li>
<li>Three</li>
</ul>
</div>
</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h1>
        <font color="#6598cd">MAPPING</font>
    </h1>
    <div>
        <font color="#6598cd">
            <br>
        </font>
    </div>
<div>
    <ul>
<li>OpenLayers</li>
    <li>LeafletJS (MF)</li>
<li>ModestMaps (MF)</li>
<li>PolyMapS</li>
</ul>
</div>
</section>
<section data-background-color="rgba( 50, 200, 90, 0.4 )">
    <h1>MAPPING <font color="#6598cd">GUI</font>
</h1>
<div>
    <font color="#6598cd">
        <br>
    </font>
</div>
<div>
<ul>
<li>MapQuery (jQuery)</li>
<li>GeoExt (ExtJS)</li>
</ul>
</div>
</section>
<section data-background-color="rgba( 180, 50, 140, 0.6 )">
    <h1>
    <font color="#6598cd">LEARNING</font> RESOURCES</h1>
    <div>
        <br>
    </div>
<div>
    <ul>
        <li>
            <a href="http://www.w3schools.com/js/js_intro.asp" target="blank" style="text-align: center;">W3Schools JavaScript intro</a>
            <br>
        </li>
        <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript" target="blank" style="text-align: center;">Mozilla Intro to JS</a>
            <br>
        </li>
        <li>
            <a href="http://www.howtocreate.co.uk/tutorials/javascript/" target="blank" style="text-align: center;">JavaScript tutorial</a>
            <br>
        </li>
        <li>
            <a href="http://en.wikipedia.org/wiki/List_of_JavaScript_libraries" target="blank" style="text-align: center;">List of JavaScript libraries</a>
            <br>
        </li>
        <li>
            <a href="http://gis.stackexchange.com/questions/8032/how-do-various-javascript-mapping-libraries-compare" target="blank" style="text-align: center;">Mapping libraries comparison</a>
            <br>
        </li>
        <li>
            <a href="http://addyosmani.com/blog/prosconsmicroframeworks/" target="blank" style="text-align: center;">Pros and cons of Micro-frameworks</a>
            <br>
        </li>
    </ul>
</div>





<div>
    <br>
</div>
</section>
    <section>
        <h2 class="absolute-element" style="position: absolute; width: 959px; height: 680px; z-index: 4; left: 1px; top: 0px;">
    <a href="http://www.sigte.udg.edu/summerschool2013/" target="_blank">
<img src="https://s3.amazonaws.com/media-p.slid.es/uploads/albertoromeu/images/41363/slide_last.png">
</a>
</h2>
    </section>
</div>
