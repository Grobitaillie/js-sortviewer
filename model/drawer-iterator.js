class DrawerIterator {

    constructor(arrayToSort, pixiApp, retainAndRedraw = false) {
        this.currentIteration = [];
        this.iterations = [];
        this.timeouts = [];

        this.pixiApp = pixiApp;
        this.iterationTime = 5;
        this.arrayAccessCount = 0;
        this.comparisonCount = 0;
        this.counterText = undefined;

        this.arrayToSort = arrayToSort;
        this.untouchedArray = [];
        this.arrayToSort.forEach(item => {
            this.untouchedArray.push(item);
        });
        this.pixiItemArray = [];
        this.readIndexes = [];
        this.affectedIndexes = [];

        this.retainAndRedraw = false;
        this.started = false;
    }

    start() {
        if (this.retainAndRedraw) {
            // ????
        } else {
            this.constructCounters();
            this.constructGraphic();
        }

        this.started = true;
    }

    mustRetainAndRedraw() {
        this.retainAndRedraw = true;
    }

    compareInferior(indexFrom, indexTo) {
        this.currentIteration.push(() => {
            this.compareInferior(indexFrom, indexTo);
        });
        this.comparisonCounterPP();
        return this.arrayValue(indexFrom) < this.arrayValue(indexTo);
    }

    compareSuperior(indexFrom, indexTo) {
        this.currentIteration.push(() => {
            this.compareSuperior(indexFrom, indexTo);
        });
        this.comparisonCounterPP();
        return this.arrayValue(indexFrom) > this.arrayValue(indexTo);
    }

    compareInferiorTo(index, value) {
        this.currentIteration.push(() => {
            this.compareSuperior(index, value);
        });
        this.comparisonCounterPP();
        return this.arrayValue(index) < value;
    }

    arrayValue(index) {
        if (!this.started) {
            this.start();
        }

        if (this.retainAndRedraw) {
            this.currentIteration.push(() => {
                this.arrayValue(index);
            });
        }

        let pixiItem = this.pixiItemArray[index];
        if (pixiItem) {
            pixiItem.changeColor(0xFF0000);

            setTimeout(() => {
                pixiItem.changeColor(0xFFFFFF);
            }, 20);
        }

        this.arrayAccessCounterPP();
        return this.arrayToSort[index];
    }

    arrayAffect(index, value) {
        if (!this.started) {
            this.start();
        }

        if (this.retainAndRedraw) {
            this.currentIteration.push(() => {
                this.arrayAffect(index, value)
            });
        }

        let pixiItem = this.pixiItemArray[index];
        if (pixiItem) {
            pixiItem.changeValue(value);
        }

        this.arrayToSort[index] = value;
    }

    endIteration() {
        if (this.retainAndRedraw) {
            this.iterations.push(this.currentIteration);
            this.currentIteration = [];
        } else {
            console.log("sleep", this.iterationTime);
            return new Promise(resolve => setTimeout(resolve, this.iterationTime));
        }
    }

    constructGraphic() {
        let maxValue = Math.max.apply(null, this.arrayToSort);
        let countValue = this.arrayToSort.length;

        let width = this.pixiApp.renderer.view.width;
        let height = this.pixiApp.renderer.view.height;

        let itemMaxHeight = maxValue / height;
        let itemWidth = this.pixiApp.renderer.view.width / countValue;

        for (var i = 0; i < this.arrayToSort.length; i++) {
            let pixiItem = new PixiGraphicItem(itemWidth, itemMaxHeight, height, itemWidth * i, this.arrayToSort[i]);

            this.pixiItemArray.push(pixiItem);
            this.pixiApp.stage.addChild(pixiItem.graphics);
            pixiItem.draw();
        }
    }

    end() {

        if (this.retainAndRedraw) {
            this.arrayToSort = this.untouchedArray;
            this.arrayAccessCount = 0;
            this.comparisonCount = 0;

            this.constructGraphic();
            this.constructCounters();

            console.log("========== INITIAL ============");
            console.log(this.arrayToSort);

            let timeout = 0;
            this.iterations.forEach((methodArray) => {
                methodArray.forEach((method, index2) => {
                    this.timeouts.push(setTimeout(() => {
                        method();
                    }, timeout));
                });

                timeout += this.iterationTime;
            })

            this.timeouts.push(setTimeout(() => {

                console.log("========== SORTED ============");
                console.log(this.arrayToSort);
            }, timeout));
        }
    }

    clear() {
        this.timeouts.forEach(item => {
            clearTimeout(item);
        })
    }

    constructCounters() {

        var style = new PIXI.TextStyle({ fill: '#FFFFFF', fontSize: 12 });
        this.counterText = new PIXI.Text('', style);
        this.counterText.x = 2;
        this.counterText.y = 2;

        this.pixiApp.stage.addChild(this.counterText);
    }

    arrayAccessCounterPP() {
        this.arrayAccessCount++;
        this.drawCounters();
    }

    comparisonCounterPP() {
        this.comparisonCount++;
        this.drawCounters();
    }

    drawCounters() {
        if (this.counterText) {
            this.counterText.text = ('[Accesses: ' + this.arrayAccessCount + ']  [Comparisons: ' + this.comparisonCount + ']');
        }
    }
}
