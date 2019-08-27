/* eslint-env jasmine, protractor */
// ToDo refactor 
const fs = require('fs');
// const PNG = require('pngjs').PNG;
const PNGDiff = require('png-diff');
const PNGCrop = require('png-crop');
const screenshot = require('screenshot-stream');
const BlinkDiff = require(`blink-diff`);
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const looksSame = require('looks-same');
const mkdirp = require('mkdirp');
const exec = require('child_process').exec;
const urlToScreenshot = require('url-to-screenshot');
const captureIt = require('capture-screenshot');
const snap = require('screenshot-node');

class Images {

    static storeImg(img, path) {

        exec(`mv ${img} ${path}`, (err, stdout, stderr) => {
            if (err) {
                console.log("Error occured");
                console.log(err);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }

    static looksTheSame(actualImg, expectedImg, diffImg) {
        looksSame.createDiff({
            reference: actualImg,
            current: expectedImg,
            diff: diffImg,
            highlightColor: '#ff00ff', //color to highlight the differences
            strict: false,//strict comparsion
            tolerance: 2.5
        }, function (error) {
        });
    }

    static snapIt(path) {
        snap.saveScreenshot(0, 0, 1624, 100000, path, (err) => {
            if (err) console.log(err);
        });
    }

    static makeDir(path, img) {
        mkdirp(path, function (err) {
            if (err) console.error(err)
            else console.log('pow!');
        });
        this.storeImg(img, path);q
    }

    static blinkDiff(actualImg, expectedImg, diffImg, img) {
        const diff = new BlinkDiff({
            imageAPath: actualImg, // Use file-path
            imageBPath: expectedImg,

            thresholdType: BlinkDiff.THRESHOLD_PERCENT,
            threshold: 0.1501,  //  threshold as to what min diff should the fail message should appear
                                // (we are not tolerating any minimal diff)

            imageOutputPath: diffImg
        });

        diff.run(function (error, result) {
            if (error) {
                throw error;
            } else {
                console.warn(diff.hasPassed(result.code) ? `NO DIFF` : `PROBABLE FAIL; Image Differences Captured for (${img})`);
                // console.log('Found ' + result.differences + ' differences.');
            }
        });
    }

    static writeScreenShot(data, filename) {
        const stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

    static captureScreenShot(imgPath) {
        browser.takeScreenshot().then((png) => {
            Images.writeScreenShot(png, imgPath);
        });
    }

    static takeSnapshot(path) {
        // screenshots.takeScreenshot(path);

        screenshots.browserNameJoiner = ' - '; //this is the default
        //folder of screenshots
        screenshots.screenShotDirectory = path;
    }

    static captureItAll(urlToCapture, path) {
        captureIt({url: urlToCapture})
            .then(imgs => {
                fs.writeFileSync(path, imgs.chrome);
                //fs.writeFileSync(`electron_${path}`, imgs.electron);
                //fs.writeFileSync(`phantom_${path}`, imgs.phantomjs);
            });
    }

    static urlToScreenshotIt(url, path, width, height) {
        new urlToScreenshot(url)
            .width(320)  //width: 1024
            .height(320) //height: 5500
            .capture()
            .then(img =>
                fs.writeFileSync(path, img));
        console.log(`${path}`);
    }

    static streemScreenshot(urlLink, imgPath, resolutionPixels) {
        if (!resolutionPixels) resolutionPixels = '1024x5000';
        const stream = screenshot(urlLink, resolutionPixels, {crop: true}); //change the size
        stream.pipe(fs.createWriteStream(imgPath));
    }

    static takeFullScreenshotForCurrentUrl(imgPath) {
        browser.getCurrentUrl().then((url) => {
            Images.streemScreenshot(url, imgPath);
        });
    }


    static streemScreenshotNoUrl(imgPath, resolutionPixels) {
        if (!resolutionPixels) resolutionPixels = '1024x1000';
        const stream = screenshot(resolutionPixels, {crop: true}); //change the size
        stream.pipe(fs.createWriteStream(imgPath));
    }

    static takeAndCompareSnapshots(urlToScreen, imgPath, imG1, diffImG) {
        this.atopScreenshot(urlToScreen, imgPath);
        this.compareImages(imG1, imgPath, diffImG);
    }

    static atopScreenshotMobile(urlToScreen, imgPath) {
        screenshot({
            url: urlToScreen,
            width: 1024,
            height: 3500
        })
            .then(function (img) {
                fs.writeFile(imgPath, img.data, function (err) {
                    console.log(`imgPath: ${imgPath}`);
                    browser.sleep(900);
                    screenshot.close();
                });
            });
    }

    static shrinkIt(url, path) {
        const screenshot = new shrinktheweb('your_access_key', 'your_secret_key');

        screenshot.screenshot(url, path).on('close', function (file) {
            if (file) {
                console.log('The file ' + file + ' was written correctly');
            } else {
                console.log('Error');
            }
        });
    }

    static compareImages(benchMarkImg, comparedImg, differencesImg, img) {
        const image2Stream = fs.createReadStream(comparedImg);
        PNGDiff.outputDiff(benchMarkImg, image2Stream, differencesImg, function (err, diffMetric) {
            if (err) throw err;
            // returns 0 if every pixel's the same; return 1 otherwise. Currently, these
            // are the only two possible metric values; possibility to tweak them in the
            // future
            console.warn(diffMetric === 1 ? `Difference(s) Detected. for (${img})` : 'No Difference');
            // highlights the differnce in red
        });
    }

    static diffImages(actualImg, expectedImg, diffImg) {

        imageDiff({
            actualImage: actualImg,
            expectedImage: expectedImg,
            diffImage: diffImg,
        }, function (err, imagesAreSame) {
            // error will be any errors that occurred
            // imagesAreSame is a boolean whether the images were the same or not
            // diffImage will have an image which highlights differences
        });
    }

    static cropImage(img) {
        const config1 = {width: 40000, height: 90000, top: 150, left: 20};
        PNGCrop.crop(img, img, config1, function (err) {
            if (err) throw err;
        });
    }

    static takeImage(imaGe) {
        image.writeImage(imaGe, function (err) {
            if (err) throw err;
            console.log(`Written to the file`);
        });
    }

    static takeScreen(imgPath) {
        screenshots.checkScreenshot(imgPath);
    }


    static shutterBugIt(imgPath) {
        shutterbug.snapshot(imgPath);
    }

    static doneReading(img1, img2, diffImg) {

        const numDiffPixels = pixelmatch(img1, img2, diffImg, 1024, 3500, {threshold: 0.1});

        const img11 = fs.createReadStream(img1).pipe(new PNG()).on('parsed', doneReading),
            img22 = fs.createReadStream(img2).pipe(new PNG()).on('parsed', doneReading),
            filesRead = 0;

        if (filesRead + 1 < 2) return;
        const diff = new PNG({width: img11.width, height: img11.height});

        pixelmatch(img11.data, img22.data, diff.data, img11.width, img11.height, {threshold: 0.1});
        diff.pack().pipe(fs.createWriteStream(diffImg));
    }
}

module.exports = Images;