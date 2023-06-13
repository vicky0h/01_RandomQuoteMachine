let jsonObj, currQuote,currAuthor;
// TO SET DEFAULT COLORS   
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

// TO SET UP INITIAL QUOTE AND THE QUOTE WHEN CLICKING ON NEW QUOTE BUTTON
$(function() {
    getQuotes();
    $("#new-quote").click(function() {           
        getQuotes();
    })
})

// GET QUOTE FUNCTION
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

// GET RANDOM COLOR FUNCTION
function getRandomColor() {
    // TO GET RANDOM COLOR BASED ON LENGTH OF THE DEFAULT COLORS AVAILABLE
    let colorIdx = Math.floor(Math.random() * colors.length);
    let color = colors[colorIdx];
    // TO SET THE BACKGROUND AND COLOR OF THE BODY, BUTTON, #NEW QUOTE EQUAL TO THE RANDOM COLOR GENERATED
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
    // TO GET RANDOM QUOTE BASED ON LENGTH OF THE QUOTES AVAILABLE IN THE DATABASE
    let quoteIdx = Math.floor(Math.random() * jsonObj.quotes.length);
    // TO GET THE QUOTE CONTENT AND AUTHOR NAME
    currQuote = jsonObject.quotes[quoteIdx].quote;
    currAuthor = jsonObject.quotes[quoteIdx].author;
    // TO SET THE #TEXT AND #AUTHOR BASED ON QUOTE CONTENT AND AUTHOR NAME OBTAINED IN THE ABOVE STEP
    $("#text").text(currQuote);
    $("#author").text(currAuthor);
}


// TO SHARE THE QUOTE ON TWITTER AND TUMBLR
function addShareLink(currQuote, currAuthor) {
    let hmtlTwitter = "https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"' + currQuote + '"' + currAuthor);
    $(".twitter").attr("href", hmtlTwitter);
    // https://twitter.com/share?url=[post-url]&text=[post-title]&via=[via]&hashtags=[hashtags]

    let htmlTumblr = "https://www.tumblr.com/widgets/share/tool?tags=quotes&caption=" + encodeURIComponent(currAuthor) + "&content=" + encodeURIComponent(currQuote);
    $(".tumblr").attr("href", htmlTumblr);
    // https://www.tumblr.com/widgets/share/tool?canonicalUrl=blog.shahednasser.com&caption=Awesome%20blog!&tags=test%2Chello
}   
