const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const cors = require("cors");
//const qs = require("qs");
//const querystring = require("querystring");

const searcher = require("./find-alias");

const app = express({});
const port = process.env.PORT || 3000;

/*app.set("query parser", str => {
  return qs.parse(str, {
    decoder: str => {
      return querystring.unescape(str);
    }
  });
});*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(function (req, res, next) {
  const permittedOrigins = [
    "http://localhost:8080",
    "https://srgivp.github.io"
  ];
  const origin = req.headers.origin;
  if (permittedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//with cookies in state
const loggingIn = async (email, password, res) => {
  const browser = await puppeteer.launch({
    //headless: false,
    args: ["--shm-size=1gb", "--no-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 1024,
    deviceScaleFactor: 1
  });
  const link = "http://www.movescount.com/";
  try {
    await page.goto(link);
    await page.waitForSelector("a[data-reactid='25']", 1000);
    await page.click("a[data-reactid='25']");
    await page.waitForSelector("#splEmail", 1000);
    await page.type("#splEmail", email);
    await page.type("#splPassword", password);
    await page.click("#splLoginButton");
    try {
      await page.waitForSelector("a[data-reactid='99']", 1000);
    } catch {
      res.send(
        "Login failed. Check out whether login and/or password are correct"
      );
      browser.close;
    }
    await page.goto("http://www.movescount.com/summary#navigation=tagcloud");
    await page.waitForSelector("a[data-reactid='99']", 1000);
    const cookiesObject = await page.cookies();
    const cookies = JSON.stringify(cookiesObject);
    res.send(cookies);
    browser.close;
  } catch (err) {
    return {
      answer: "can't load",
      errorName: err.name,
      errorMessage: err.message
    };
  }
};

//with cookies in state
const initialInfoCollecting = async (inAlias, cookies) => {
  const browser = await puppeteer.launch({
    //headless: false,
    args: ["--shm-size=1gb", "--no-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 1024,
    deviceScaleFactor: 1
  });
  if (cookies !== "no cookies") {
    try {
      const cookiesArr = await JSON.parse(cookies);
      if (cookiesArr.length !== 0) {
        for (let cookie of cookiesArr) {
          let correctedCookie = {
            ...cookie,
            ...{ sameSite: "none" /*, secure: true */ }
          };
          await page.setCookie(correctedCookie);
        }
        console.log("Session has been loaded in the browser");
        const link = "http://www.movescount.com/summary#navigation=tagcloud";
        await page.goto(link);
        const scrapedInfo = await searcher.findAlias(page, inAlias);
        browser.close();
        return scrapedInfo;
      } else {
        try {
          await page.waitForSelector("#splLoginButton", 1000);
          await browser.close();
          return "login";
        } catch (err) {
          return {
            answer: "can't load",
            errorName: err.name,
            errorMessage: err.message
          };
        }
      }
    } catch (err) {
      return {
        answer: "error",
        errorMessage: err.message,
        errorName: err.name
      };
    }
  } else {
    try {
      await page.waitForSelector("#splLoginButton", 1000);
      await browser.close();
      return "login";
    } catch (err) {
      return {
        message: "Can't load",
        errorName: err.name,
        errorMessage: err.message
      };
    }
  }
  /*const link = "http://www.movescount.com/summary#navigation=tagcloud";
  await page.goto(link);
  try {
    const scrapedInfo = await searcher.findAlias(page, inAlias);
    browser.close();
    return scrapedInfo;
  } catch {
    await page.waitForSelector("#splLoginButton", 1000);
    await browser.close();
    return "login";
  }*/
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
  } /*else if (infoFromApp.answer === "error") {
    res.json(infoFromApp);
  }*/ else {
    res.json(infoFromApp);
  }
});

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
