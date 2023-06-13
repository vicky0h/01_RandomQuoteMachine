let jsonObj, currQuote,currAuthor;
    
let colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

$(function() {
    getQuotes();
    $("#new-quote").click(function() {           
        getQuotes();
    })
})


function getQuotes() {
    return $.ajax({
        type: 'GET',
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        dataType: "JSON",
        async: true,
        success: function(json) {
            if (typeof json == 'string') {
                jsonObj = JSON.parse(json);
            } else {
                jsonObj = json;
            }
            getRandomColor();
            getRandomQuote(jsonObj);
            addShareLink(currQuote, currAuthor);
        }
    })
}


function getRandomColor() {
    let colorIdx = Math.floor(Math.random() * colors.length);
    let color = colors[colorIdx];
    $("body").css({
    "background-color": color,
    "color": color
    });
    $(".btn").css({
    "color": color
    });
    $("#new-quote").css({
    "background-color": color,
    "color": "white"
    });
}

function getRandomQuote(jsonObject) {
    let quoteIdx = Math.floor(Math.random() * jsonObj.quotes.length);
    currQuote = jsonObject.quotes[quoteIdx].quote;
    currAuthor = jsonObject.quotes[quoteIdx].author;
    $("#text").text(currQuote);
    $("#author").text(currAuthor);
}

function addShareLink(currQuote, currAuthor) {
    let hmtlTwitter = "https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"' + currQuote + '"' + currAuthor);
    $(".twitter").attr("href", hmtlTwitter);
    // https://twitter.com/share?url=[post-url]&text=[post-title]&via=[via]&hashtags=[hashtags]

    let htmlTumblr = "https://www.tumblr.com/widgets/share/tool?tags=quotes&caption=" + encodeURIComponent(currAuthor) + "&content=" + encodeURIComponent(currQuote);
    $(".tumblr").attr("href", htmlTumblr);
    // https://www.tumblr.com/widgets/share/tool?canonicalUrl=blog.shahednasser.com&caption=Awesome%20blog!&tags=test%2Chello
}   
