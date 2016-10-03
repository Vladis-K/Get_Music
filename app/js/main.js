jQuery(document).ready(function(){


    function timeWell(duration){
        var min = Math.floor(duration/60);
        var sec = (duration % 60);
        var mod = sec<=9 ? sec = "0" + sec : sec;
        var timesong = ( min + ":"+ mod );
        return timesong;
    };


    function compression(title) {
        var short = title.substr(0, 37);
        return short + '...';
    };


    $('#searchForm').on( "submit", function(event){

        $("span").html("");
        event.preventDefault();
        var $textInput = $('input:text');
        var getText = $textInput.serialize();
        console.log(getText);
        var access_token = "9df7c1ea8a5ad47721281a36563dc437e678fd9ff3bd16f1c6877c3d3b8c3eef7e036227cd5d9617fa4ef";

        var searchLink = "https://api.vk.com/method/video.search?sort=2&" + getText +"&access_token="
            + access_token + "&v=V";


        // <iframe src="//vk.com/video_ext.php?oid=-51189706&id=456240311&hash=8f75ee9011417e53&hd=3" width="300"
        // height="200" frameborder="0" allowfullscreen></iframe>


        $.ajax({
            method: "GET",
            url: searchLink,
            data: null,
            dataType: "jsonp",
            beforeSend: function(){
                $('#videoframes').append('<div id="loading">Loading</div>');

            },
            complete: function() {
                $('#loading').remove();
                $('#videoCard').html('');
            },
            success: function(data){

                var catalog = data.response;
                // var step = catalog.length;
                var newContent = '';

                var showinfo = function() {

                    for (var i = 0; i<5; i++) {
                        console.log(catalog[i]);
                        newContent += "<div class='videoCard'>";
                        newContent += " <iframe src=' "+ catalog[i].player +"' frameborder='0' allowfullscreen></iframe>";
                        newContent += "<div>" + "<span>" + timeWell(catalog[i].duration) + "</span>";
                        newContent += "<div class='timemovie'>" +  compression(catalog[i].title) + "</div>";
                        newContent += "</div>";
                    }

                    $('#videoframes').after(newContent);
                    $('#showElse').removeClass('showAfterSearch');
                    return false;
                };

                $('#newSubmit').on('click', showinfo());

                // $('#showElse').on('click', function() {
                // 	var initial = 2;
                // 	function checkIteration(initial) {
                // 		return initial = initial+2 ;
                // 	};
                // 	for (i = checkIteration(initial); i<(initial+2); i++) {
                // 		console.log(catalog[i]);
                // 		newContent += "<div class='videoCard'>";
                // 		newContent += " <iframe src=' "+ catalog[i].player +"' frameborder='0' allowfullscreen></iframe>";
                // 		newContent += "<div>" + "<span>" + timeWell(catalog[i].duration) + "</span>";
                // 		newContent += "<div class='timemovie'>" +  compression(catalog[i].title) + "</div>";
                // 		newContent += "</div>";
                // 	};
                // 	$('#videoframes').after(newContent);
                // 	return false;
                // });


                // 1st variant
                // var items = [];
                // data.response.shift();
                // $.each(data.response, function(){
                // items.push(  "<iframe src='" + this.player +"' frameborder='0' allowfullscreen></iframe>" + "<div>"
                // + this.title +  "<span class='timemovie'>" + timeWell(this.duration) + "</span>" +  "</div>");
                // 	});
                // 	$( "<div>", {
                // 		html: items.join( "" )
                // 		}).appendTo( "span#videoframes" );


            },
            error: function(){
                $('#videoframes').append('<div id="loading">Try again.</div>');
            }
        });
    });

});