const findAlias = async (page, inAlias) => {
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
  for (let i = 0; i < aliasLength; i++) {
    let alias = aliasContainers[i];
    if (alias === inAlias) {
      await page.click(
        `#tagcloud > ul > li > div:nth-child(${i + 1}) > a > span`
      );
      await page.waitForSelector("#chart2 > h1", 1000);
      let scrapedData = {};
      scrapedData.mileage = await page.evaluate(() => {
        return document.querySelector("#chart2 > h1").innerText;
      });
      try {
        await page.click(
          "#content > header:nth-child(7) > ul > li > div.fl0 > div"
        ); // moves click
        await page.waitFor(300);
      } catch (ex) {
        await page.click(
          `#tagcloud > ul > li > div:nth-child(${i + 1}) > a > span`
        );
        await page.click(
          "#content > header:nth-child(7) > ul > li > div.fl0 > div"
        ); // moves click
        await page.waitFor(300);
      }

      scrapedData.latestMoveDate = await page.evaluate(() => {
        return document.querySelector(
          `#selected_moves>ul>li:nth-child(1)>div>div.media-text>ul>li>div:nth-child(1)`
        ).innerText;
      });

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
      return scrapedData;
    }
  }
  return "there is no pair with this alias in your rotation";
};
module.exports.findAlias = findAlias;
