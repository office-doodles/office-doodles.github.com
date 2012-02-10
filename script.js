if ($('ul.images').length == 1) {
    $.each(images, function() {
        var data = this;
        var li = '<li id="' + this.slug + '"><h1><a href="#' + this.slug + '">' + this.title + '</a></h1><span class="date">' + data.date + '</span>';
        if (data.office) {
            li += '<span class="location">, taken at ' + data.office + '</span>';
        }
        if (data.by) {
            li += '<span class="by">&nbsp;by ' + data.by + '</span>';
        }
        li += '<img src="images/' + this.slug + '.jpg" alt="' + this.title + '" /><a class="share"></a><div class="clear"></div></li>';
        li = $(li);

        addthis.button(li.find('a.share')[0], {}, {url: window.location + '#' + this.slug, title: this.title + ' at ' + document.title});

        $('.images').append(li);

        li.waypoint(
            function() {
                $('.nav-title').text(data.title);
            },
            {
                offset: 59
            }
        );
    });
}
