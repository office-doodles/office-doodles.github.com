---
---
var disqus_shortname = 'officedoodles';
var disqus_developer = 0;
var disqus_identifier = '';
var disqus_url = '';

$('.images').append('<div id="disqus_thread"></div>');

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
        // disqus_identifier
        // disqus_title

        var comments_link = $('<a href="{{ site.production_url }}/#disqus_thread" data-disqus-identifier="post-' + data.slug + '">Comments</a>');
        console.log('Adding link for ' + data.slug);

        comments_link.click(function(ev) {
            console.log('Loading comments for ' + data.slug);
            ev.preventDefault();

            disqus_identifier = 'post-' + data.slug;
            disqus_url = "{{ site.production_url }}/#!" + data.slug;

            DISQUS.reset({
              reload: true,
              config: function () {
                this.page.identifier = disqus_identifier;
                this.page.url = disqus_url;
              }
            });

            $('#disqus_thread').insertAfter(comments_link).fadeIn();
        });
        $(li).append(comments_link);

        // (function() {
        //     var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        //     dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        //     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        // })();


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
