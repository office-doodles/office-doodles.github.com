$.each(images, function() {
    var data = this;
    var li = '<li id="' + this.slug + '"><h1><a href="#' + this.slug + '">' + this.title + '</a></h1><span class="date">' + data.date + '</span>';
    if (data.location) {
        li += '<span class="location">' + data.location + '</span>';
    }
    li += '<img src="images/' + this.slug + '.jpg" alt="' + this.title + '" /><a class="share"></a><div class="clear"></div></li>';
    li = $(li);

    addthis.button(li.find('a.share')[0], {}, {url: window.location + '#' + this.slug, title: this.title + ' at ' + document.title});

    $('.images').append(li);

    li.waypoint(
        function() {
            console.log(data.title);
            $('.nav-title').text(data.title);
        },
        {
            offset: 59
        }
    );
});

