---
---
var disqus_shortname = 'officedoodles';
var disqus_developer = 0;

$('.images li').each(function() {
    var li = $(this);
    var title = li.find('h1 a').text();
    var url = li.find('h1 a')[0].href;

    // Share Button
    addthis.button(li.find('a.share')[0], {}, {url: url, title: title + ' at ' + document.title});

    li.waypoint(
        function() {
            $('.nav-title').text(title);
        },
        {offset: 59}
    );
});
