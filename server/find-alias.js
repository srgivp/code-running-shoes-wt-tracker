const findAlias = async (page, inAlias) => {
  //console.log("find alias started");
  await page.waitForSelector("#tagcloud > ul > li", 1000);
  let aliasContainers = await page.evaluate(() => {
    const aliasList = document.querySelectorAll(
      "#tagcloud > ul > li>div>a>span"
    );
    const aliasArr = [...aliasList];
    aliasText = aliasArr.map(item => item.innerText.toLowerCase());
    return aliasText;
  });
  const aliasLength = aliasContainers.length;
  //console.log(aliasLength, inAlias, aliasContainers);
  for (let i = 0; i < aliasLength; i++) {
    let alias = aliasContainers[i];
    //console.log("evaluated alias", alias);
    /*console.log(
      alias == inAlias,
      typeof alias,
      typeof inAlias,
      alias.length,
      inAlias.length
    );*/
    if (alias === inAlias) {
      await page.click(
        `#tagcloud > ul > li > div:nth-child(${i + 1}) > a > span`
      );
      await page.waitForSelector("#chart2 > h1", 1000);
      let scrapedData = {};
      scrapedData.mileage = await page.evaluate(() => {
        return document.querySelector("#chart2 > h1").innerText;
      });
      //console.log(scrapedData.mileage);
      try {
        await page.click(
          "#content > header:nth-child(7) > ul > li > div.fl0 > div"
        ); // moves click
        await page.waitFor(300);
        //console.log("moves pushed");
      } catch (ex) {
        await page.click(
          `#tagcloud > ul > li > div:nth-child(${i + 1}) > a > span`
        );
        await page.click(
          "#content > header:nth-child(7) > ul > li > div.fl0 > div"
        ); // moves click
        await page.waitFor(300);
        //console.log("moves pushed second");
      }

      //define if latest move is running
      /*const activityKind = async i => {
          let selector = `#selected_moves > ul > li:nth-child(${i}) > div > div.media-img.size-36 > i`;
          //await page.waitForSelector(selector, 10000);
          //console.log(selector);
          const activity = await page.evaluate(selector => {
            let move = document.querySelector(selector).title.toLowerCase();
            return move;
          }, selector);
          await page.waitFor(300);
          //console.log(activity);
          return activity;
        };*/

      //console.log("before moves list");
      /*let movesOnPage = async () => {
          await page.waitForSelector("#selected_moves > ul", 10000);
          //console.log("moves list started");
          const movesArr = await page.evaluate(() => {
            let movesList = document.querySelectorAll(
              "#selected_moves > ul > li"
            );
            const arr = [...movesList];
            return arr;
          });
          //console.log("movesOnPage", movesArr.length);
          return movesArr.length;
        };*/

      /*let pagesOfMoves;
        try {
          pagesOfMoves = await page.evaluate(() => {
            return parseInt(
              document.querySelector(
                "#selected_moves > div.paging > div > a:last-child"
              ).innerText
            );
          });
        } catch {
          pagesOfMoves = 1;
        }*/
      //console.log("pagesOfMoves", pagesOfMoves);

      scrapedData.latestMoveDate = await page.evaluate(() => {
        return document.querySelector(
          `#selected_moves>ul>li:nth-child(1)>div>div.media-text>ul>li>div:nth-child(1)`
        ).innerText;
      });
      //console.log("movedate", scrapedData.latestMoveDate);

      //scraps latest running date parsing move by move
      /*const latestRunningIdentifier = async () => {
          for (let i = 1; i < pagesOfMoves + 1; i++) {
            if (pagesOfMoves > 1) {
              await page.click(
                `#selected_moves > div.paging > div > a:nth-child(${i})`
              );
            }
            let moves = await movesOnPage();
            console.log("moves", moves);
            for (let j = 1; j < moves + 1; j++) {
              let activity = await activityKind(j);
              if (activity === "running") {
                await page.waitForSelector(
                  `#selected_moves>ul>li:nth-child(${j})>div>div.media-text>ul>li>div:nth-child(1)`,
                  10000
                );
                scrapedData.latestDate = await page.evaluate(j => {
                  return document.querySelector(
                    `#selected_moves>ul>li:nth-child(${j})>div>div.media-text>ul>li>div:nth-child(1)`
                  ).innerText;
                }, j);
                console.log(scrapedData.latestDate);
                return;
              }
            }
          }
        };*/

      const latestRunningIdentifier = async () => {
        await page.click("#calendarTools > ul > li > a > i");
        await page.click(
          "#calendarTools > ul > li > ul > li.row-flex.row-flex--middle > div:nth-child(2) > a"
        );
        await page.click(
          "#calendarTools > ul > li > ul > li.row-margin > ul > li > div:nth-child(1) > a > i"
        );
        scrapedData.latestDate = await page.evaluate(() => {
          return document.querySelector(
            `#selected_moves>ul>li:nth-child(1)>div>div.media-text>ul>li>div:nth-child(1)`
          ).innerText;
        });
        return;
      };
      await latestRunningIdentifier();
      //latest running move date defined

      /*(await page.waitFor(300);
        await page.waitForSelector(
          "#selected_moves > div.paging > div > a:last-child",
          1000
        );*/
      try {
        await page.click("#selected_moves > div.paging > div > a:last-child");
      } catch {
        scrapedData.startingDate = await page.evaluate(() => {
          return document.querySelector(
            "#selected_moves>ul>li:last-child>div>div.media-text>ul>li>div:nth-child(1)"
          ).innerText;
        });

        return scrapedData;
      }

      await page.waitFor(300);
      await page.waitForSelector(
        "#selected_moves>ul>li:last-child>div>div.media-text>ul>li>div:nth-child(1)",
        1000
      );
      scrapedData.startingDate = await page.evaluate(() => {
        return document.querySelector(
          "#selected_moves>ul>li:last-child>div>div.media-text>ul>li>div:nth-child(1)"
        ).innerText;
      });
      //console.log(scrapedData.startingDate);
      return scrapedData;
    }
  }
  //console.log("oops");
  return "there is no pair with this alias in your rotation";
};
module.exports.findAlias = findAlias;
