---
---
var disqus_shortname = 'officedoodles';
var disqus_developer = 1;

$('.images').append('<div id="disqus_thread"></div>');

if ($('ul.images').length == 1) {
    $.each(images, function() {
        var data = this;
        var li = '<li id="' + data.slug + '"><h1><a href="#' + data.slug + '">' + data.title + '</a></h1><span class="date">' + data.date + '</span>';
        if (data.office) {
            li += '<span class="location">, taken at ' + data.office + '</span>';
        }
        if (data.by) {
            li += '<span class="by">&nbsp;by ' + data.by + '</span>';
        }
        li += '<img src="images/' + data.slug + '.jpg" alt="' + data.title + '" /><a class="share"></a><div class="clear"></div></li>';
        li = $(li);

        addthis.button(li.find('a.share')[0], {}, {url: window.location + '#' + data.slug, title: data.title + ' at ' + document.title});

        var comments_link = $('<a href="{{ site.production_url }}/#disqus_thread" data-disqus-identifier="post-' + data.slug + '">Comments</a>');
        console.log('Adding link for ' + data.slug);

        comments_link.click(function(ev) {
            console.log('Loading comments for ' + data.slug);
            ev.preventDefault();

            var identifier = 'post-' + data.slug;
            var url = "{{ site.production_url }}/#!" + data.slug;

            DISQUS.reset({
              reload: true,
              config: function () {
                this.page.identifier = identifier;
                this.page.url = url;
                this.page.title = data.title + ' at ' + document.title;
              }
            });

            $('#disqus_thread').insertAfter(comments_link).fadeIn();
        });
        $(li).append(comments_link);

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

