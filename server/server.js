const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const cors = require("cors");
//const fs = require("fs");

const searcher = require("./find-alias");

const app = express({});
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(function (req, res, next) {
  /*const permittedOrigins = [
    "http://localhost:8080",
    "https://srgivp.github.io"
  ];
  const origin = req.headers.origin;
  console.log(origin);
  if (permittedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }*/
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
/*const loggingIn = async (email, password, res) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--shm-size=1gb"]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 1024,
    deviceScaleFactor: 1
  });
  const link = "http://www.movescount.com/";
  await page.goto(link);
  await page.waitForSelector("a[data-reactid='25']");
  await page.click("a[data-reactid='25']");
  await page.waitForSelector("#splEmail");
  await page.type("#splEmail", email);
  await page.type("#splPassword", password);
  await page.click("#splLoginButton");
  await page.waitForSelector("a[data-reactid='99']");
  await page.goto("http://www.movescount.com/summary#navigation=tagcloud");
  await page.waitForSelector("a[data-reactid='99']");
  res.send("You are logged in now. Continue with setting the pair to rotation");
  const cookiesObject = await page.cookies();
  fs.writeFileSync(
    "./server/login-cookies.txt",
    JSON.stringify(cookiesObject),
    { spaces: 2 },
    function(err) {
      if (err) {
        console.log("cookies file can not be written", err);
      }
      console.log("Session has been successfully saved");
    }
  );
  browser.close;
};*/

//with cookies in state
const loggingIn = async (email, password, res) => {
  const browser = await puppeteer.launch({
    //headless: false,
    args: ["--shm-size=1gb"]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 1024,
    deviceScaleFactor: 1
  });
  const link = "http://www.movescount.com/";
  await page.goto(link);
  await page.waitForSelector("a[data-reactid='25']");
  await page.click("a[data-reactid='25']");
  await page.waitForSelector("#splEmail");
  await page.type("#splEmail", email);
  await page.type("#splPassword", password);
  await page.click("#splLoginButton");
  await page.waitForSelector("a[data-reactid='99']");
  await page.goto("http://www.movescount.com/summary#navigation=tagcloud");
  await page.waitForSelector("a[data-reactid='99']");
  //res.send("You are logged in now. Continue with setting the pair to rotation");
  const cookiesObject = await page.cookies();
  /*fs.writeFileSync(
    "./server/login-cookies.txt",
    JSON.stringify(cookiesObject),
    { spaces: 2 },
    function(err) {
      if (err) {
        console.log("cookies file can not be written", err);
      }
      console.log("Session has been successfully saved");
    }
  );*/
  const cookies = JSON.stringify(cookiesObject);
  //res.set("Content-Type", "text/html");
  res.send(cookies);
  browser.close;
};

/*const initialInfoCollecting = async inAlias => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--shm-size=1gb"]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 1024,
    deviceScaleFactor: 1
  });
  const previousSession = fs.existsSync("./server/login-cookies.txt");
  if (previousSession) {
    const content = fs.readFileSync("./server/login-cookies.txt");
    const cookiesArr = JSON.parse(content);
    if (cookiesArr.length !== 0) {
      for (let cookie of cookiesArr) {
        await page.setCookie({ ...cookie, SameSite: "none", Secure: true });
      }
      console.log("Session has been loaded in the browser");
    }
  }
  const link = "http://www.movescount.com/summary#navigation=tagcloud";
  await page.goto(link);
  try {
    const scrapedInfo = await searcher.findAlias(page, inAlias);
    browser.close();
    return scrapedInfo;
  } catch (ex) {
    await page.waitForSelector("#splLoginButton");
    await browser.close();
    return "login";
  }
};*/

//with cookies in state
const initialInfoCollecting = async (inAlias, cookies) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--shm-size=1gb"]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 1024,
    deviceScaleFactor: 1
  });
  //const previousSession = fs.existsSync("./server/login-cookies.txt");
  if (cookies !== "no cookies") {
    //const content = fs.readFileSync("./server/login-cookies.txt");
    const cookiesArr = JSON.parse(cookies);
    if (cookiesArr.length !== 0) {
      for (let cookie of cookiesArr) {
        let correctedCookie = {
          ...cookie,
          ...{ sameSite: "none" /*, secure: true */ }
        };
        console.log("corrCookie: ", correctedCookie);
        await page.setCookie(correctedCookie);
      }
      console.log("Session has been loaded in the browser");
    }
  }
  const link = "http://www.movescount.com/summary#navigation=tagcloud";
  await page.goto(link);
  try {
    const scrapedInfo = await searcher.findAlias(page, inAlias);
    browser.close();
    return scrapedInfo;
  } catch (ex) {
    await page.waitForSelector("#splLoginButton");
    await browser.close();
    return "login";
  }
};

app.get("/initialCollecting", async (req, res) => {
  const inAlias = req.query.alias.toLowerCase();
  const cookies = req.query.cookies;
  const infoFromApp = await initialInfoCollecting(inAlias, cookies);
  if (infoFromApp === "login") {
    res.json({ answer: "login" });
  } else if (
    infoFromApp === "there is no pair with this alias in your rotation"
  ) {
    res.json({ answer: "there is no pair with this alias in your rotation" });
  } else {
    res.json(infoFromApp);
  }
});

/*app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    loggingIn(email, password, res);
  } catch (err) {
    next(err);
  }
});*/
//with cookies in state
//logging in at get request

app.get("/login", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  try {
    loggingIn(email, password, res);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
