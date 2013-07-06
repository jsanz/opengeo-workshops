var me = {
    name: "Alberto",
    githubProfile: "http://github.com/alrocar"
}

function getMyNameElement() {
    return $('#myname');
}

function setName() {
    var $myNameElement = getMyNameElement();
    var html = $myNameElement.text();
    html += me.name;
    $myNameElement.text(html);
}

function setGithubProfile() {
    $('a').attr('href', me.githubProfile);
}

function registerClickOnMyName() {
    $('#myname')
        .click(function() {
            alert('clicked');
            $(this).css('color', 'blue');
        })
        .mouseover(function() {
            $(this).css('color', 'red');
        })
        .mouseout(function() {
            $(this).css('color', 'black');
        });
}

$(document).ready(function() {
    setName();
    setGithubProfile();
    registerClickOnMyName();
});