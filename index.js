// var request = require("request");
var fs = require("fs");

// request({
//   uri: "https://www.instagram.com/pewdiepie/",
// }, function(error, response, body) {
//     fs.writeFile("iglog.data", body, function(err, body) {
//         if (err) console.log(err);
//         console.log("Successfully Written to File.");
//       });
// });

// fs.readFile("iglog.data", function(err, buf) {
//     //console.log(buf.toString());
//     // fs.writeFile("test.html", buf, function(err, buf) {
//     //     if (err) console.log(err);
//     //     console.log("Successfully Written to File.");
//     //   });

//     var re = /{"config"(.*)ry":false}/g;
//     var found = buf.toString().match(re);
//     fs.writeFile("my.json", found, function(err, found) {
//             if (err) console.log(err);
//             console.log("Successfully Written to File.");
//           });


//   });

fs.readFile("my.json", function(err, buf) {
    var myData = JSON.parse(buf);
    var images = myData.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
    images.forEach((edge)=>{
        var node = edge.node.thumbnail_src;
        console.log(node);
    })


  });

