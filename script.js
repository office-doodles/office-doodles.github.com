$.each(images, function() {
    var data = this;
    var li = $('<li id="' + this.slug + '"><h1><a href="#' + this.slug + '">' + this.title + '</a></h1><img src="images/' + this.slug + '.jpg" alt="' + this.title + '" /></li>');
    console.log('inserting: ' + data.title);

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

