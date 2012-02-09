$('.images li').each(function() {
    var $this = $(this);
    var link = $this.find('a');
    console.log();
    var item = '<li><a href="' + link[0].hash + '">' + link.text() + '</a></li>';

    $('.navbar ul.nav').append(item);
});

$('.navbar').scrollspy()
