var me = {
    name: "Alberto",
    githubProfile: "http://github.com/alrocar"
}

function getMyNameElement() {
    return document.getElementById('myname');
}

function setName() {
    var myNameElement = getMyNameElement();
    var html = myNameElement.innerHTML;
    html += me.name;
    myNameElement.innerHTML = html;
}

function setGithubProfile() {
    document.getElementsByTagName('a')[0].setAttribute('href', me.githubProfile);
}

function registerClickOnMyName() {
    var myNameElement = getMyNameElement();
    myNameElement.onclick = function() {
        alert('clicked');
        this.style.color = 'blue';
    }
}

document.onreadystatechange = function() {
    if (document.readyState == 'complete') {
        setName();
        setGithubProfile();
        registerClickOnMyName();
    }
}