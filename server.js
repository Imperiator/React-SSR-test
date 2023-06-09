//server

  
  const express = require("express");
  const morgan = require("morgan");
  const path = require("path");
  const fs = require("fs");
  const seo = require("./seo");
  const app = express();
  app.disable("x-powered-by");

app.use(morgan("dev"));
 

app.use("/static", express.static(path.join(__dirname, "./client/build/static")));

    //Routes
app.all('/api', (req, res) => {
  res.send('API is running');
})

app.all("*", (req, res) => {
  let pathname = req.path || req.originalUrl;
  console.log(pathname);
  let page = seo.find((page) => page.path === pathname);
  if (!page) {
    page = {
      title: "Page not found | 404",
      description: "404",
    }
  }
  console.log(page);

  let html = fs.readFileSync(
    path.join(__dirname, "./client/build/index.html"))
  let htmlWithMeta = html
    .toString()
    .replace("__SEO_TITLE__", page.title)
    .replace("__SEO_DESCRIPTION__", page.description);
  return res.send(htmlWithMeta);

});





  app.listen(process.env.PORT || 2589, () => {
    console.log("Server Started on port " + process.env.NODE_ENV);
  });
