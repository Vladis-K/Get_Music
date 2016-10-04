
function myFunction() {
    var x = document.getElementById("mySearch").value;
    document.getElementById("demo").innerHTML = x;
};


// jQuery(document).ready(function(){



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
        var access_token = "ce6578f806212552e674a43dc6865bce79aa9bde1fc087e9dfc3e6f67e0fe133552b22a47e32bcbcac3c5";

        // <iframe src="//vk.com/video_ext.php?oid=-51189706&id=456240311&hash=8f75ee9011417e53&hd=3" width="300"
        // height="200" frameborder="0" allowfullscreen></iframe>


        var getlink =  function(){
            var searchLink;
            var selectVideo = $('option#audio');

            console.log($('option#audio'));

            if ( selectVideo) {
                searchLink = "https://api.vk.com/method/video.search?sort=2&" + getText +"&access_token="
                    + access_token + "&v=V";
            }
            else  {
                searchLink = "https://api.vk.com/method/audio.search?sort=2&" + getText
                 + "&access_token=cc53279a3101d2ea2c3fa76e33053f9ba9c08b813a3bb689adaa89871dc03b13fd238fc03b101374a214c&v=V";
            }
            return searchLink;
        };

        console.log( getlink() );

        $.ajax({
            method: "GET",
            url: getlink(),
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

                var showVideo = function() {

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

                var showAudio = function() {
                    for (var i = 0; i<5; i++) {
                        console.log(catalog[i]);
                        newContent += "<div class='videoCard'>";
                        newContent += " <div src=' "+ catalog[i].artist +"'</div>";
                        newContent += "<div>" + "<span>" + timeWell(catalog[i].duration) + "</span>";
                        newContent += "<div class='timemovie'>" +  compression(catalog[i].title) + "</div>";
                        newContent += "</div>";
                    }

                    $('#videoframes').after(newContent);
                    $('#showElse').removeClass('showAfterSearch');
                    return false;
                };


                // $('#newSubmit').on('click', showinfo());

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

// });