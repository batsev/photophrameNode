var request = require("request");
var express = require("express");
var app = express();
var path = require("path");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/get", function(req, res) {
  console.log(req.query.profile);
  request(
    {
      uri: `https://www.instagram.com/${req.query.profile}/`
    },
    function(error, response, body) {
      var re = /{"config"(.*)ry":false}/g;
      var found = body.toString().match(re);
      var myData = JSON.parse(found);
      if (myData == undefined) {
        console.log(`Error: ${error}`);
        res.status(500).send(error);
        return;
      }
      if (myData.entry_data.ProfilePage == undefined) {
        console.log(`Error: ${error}`);
        res.status(401).send(error);
        return;
      }
      var images =
        myData.entry_data.ProfilePage[0].graphql.user
          .edge_owner_to_timeline_media.edges;
      if (images.length > 0) {
        var picsFromIG = [];
        images.forEach(edge => {
          picsFromIG.push(edge.node.thumbnail_src);
        });
        res.json(picsFromIG);
      } else {
        console.log(`Error: Account is private`);
        res.status(401).send(error);
        return;
      }
    }
  );
});

app.use(express.static(path.join(__dirname, 'Front')));

app.get("/", function(req,res){
  res.render(index);
})

const PORT = process.env.PORT || 8000;

app.listen(8000, function() {
  console.log("Port 8000...");
});

// var myData = JSON.parse(body);
//       var images =
//         myData.entry_data.ProfilePage[0].graphql.user
//           .edge_owner_to_timeline_media.edges;
//       var picsFromIG = [];
//       images.forEach(edge => {
//         picsFromIG.push(edge.node.thumbnail_src);
//       });
//       console.log(picsFromIG);

// app.listen(3000, function() {
//   console.log("Port 3000...");
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

// var express = require("express");
// var app = express();
// var path = require("path");

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// fs.readFile("my.json", function(err, buf) {
//   var myData = JSON.parse(buf);
//   var images =
//     myData.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media
//       .edges;
//   var picsFromIG = [];
//   var i = 0;
//   images.forEach(edge => {
//     if (i < 8) {
//       picsFromIG.push(edge.node.thumbnail_src);
//       i++;
//     }
//   });
//   app.get("/", function(req, res) {
//     res.render("app", {
//       firstPicture: picsFromIG[0],
//       picsFromIG: picsFromIG
//     });
//   });
// });
// app.listen(3000, function() {
//   console.log("Port 3000...");
// });
