(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\elias\b-tree-frontend\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "GwL9":
/*!********************************************************!*\
  !*** ./src/app/tree-display/tree-display.component.ts ***!
  \********************************************************/
/*! exports provided: TreeDisplayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeDisplayComponent", function() { return TreeDisplayComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ui_ui_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/ui.component */ "lxnM");




const _c0 = ["canvas"];
/**
 * This class is responsible for transforming the b-tree from the JSON-Format to a visual representation in HTML using the HTML canvas.
 */
class TreeDisplayComponent {
    constructor(data) {
        this.data = data;
        this.firstElementsInRow = [];
        this.numberNodesInRow = [];
        this.nodeXPositionLookupTable = [];
        this.nodeYPositionLookupTable = [];
    }
    /**
     * On change of the tree the tree gets transformed to a Tree-Object, the canvas gets initialized and the draw-method gets called.
     * @param changes: The changes Interface that fetches if the childTree-attribute did change.
     */
    ngOnChanges(changes) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.childTree != null) {
                this.bTree = this.childTree;
                yield this.initCanvas();
                yield this.setTreeMetrics();
                yield this.drawTree();
            }
        });
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () { });
    }
    /**
     * This method initializes the canvas based on the number of elements in the tree.
     */
    initCanvas() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.canvasHeight = this.bTree.Height * 130;
            this.canvasWidth = this.bTree.NumberLeaves * (this.bTree.Order - 1) * 40 + 100;
            this.ctx = this.canvas.nativeElement.getContext('2d');
            this.ctx.stroke();
        });
    }
    /**
     * This method draws the actual representation of the tree.
     * First, it iterates threw the arrays that describe the dimensions of the tree, and creates a rectangle for every node.
     * Into this rectangle will be written the elements of the node, additionally the positions of the rectangle get saved.
     *
     * After all rectangles have been created, the edges will be drawn, based on the position of the elements, and the nodes where
     * they are pointing to. Therefore, the method iterates over all nodes and elements of the nodes and draws a line if a left or
     * right reference is there. The positions to draw the lines to are taken out of the node position lookup tables.
     */
    drawTree() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.bTree.Nodes != null) {
                let nodeIndex = 0;
                const width = (this.bTree.Order - 1) * 32;
                for (let i = 0; i < this.bTree.Height; i++) {
                    for (let j = 0; j < this.numberNodesInRow[i]; j++) {
                        const x = (j * width) + (j + 1) * (((this.canvasWidth) - width * this.numberNodesInRow[i]) / (this.numberNodesInRow[i] + 1));
                        const y = i * 130 + 50;
                        if (this.highlighted === this.bTree.Nodes[nodeIndex].UUID) {
                            this.ctx.fillStyle = '#42d232';
                        }
                        else {
                            this.ctx.fillStyle = '#369';
                        }
                        this.ctx.fillRect(x, y, width, 30);
                        this.nodeXPositionLookupTable[nodeIndex] = x;
                        this.nodeYPositionLookupTable[nodeIndex] = y;
                        this.ctx.fillStyle = 'white';
                        this.ctx.font = '25px helvetica';
                        for (let k = 0; k < this.bTree.Nodes[nodeIndex].Elements.length; k++) {
                            this.ctx.fillText(String(this.bTree.Nodes[nodeIndex].Elements[k].Value), x + 5 + k * 30, y + 23, 25);
                        }
                        ++nodeIndex;
                    }
                }
                this.ctx.fillStyle = 'black';
                for (let i = 0; i < this.bTree.Nodes.length; i++) {
                    for (let k = 0; k < this.bTree.Nodes[i].Elements.length; k++) {
                        if (this.bTree.Nodes[i].Elements[k].Left != null) {
                            this.ctx.moveTo(this.nodeXPositionLookupTable[i] + 5 + k * 30, this.nodeYPositionLookupTable[i] + 30);
                            const endNodeIndex = this.bTree.Nodes.findIndex(n => n.UUID === this.bTree.Nodes[i].Elements[k].Left);
                            this.ctx.lineTo(this.nodeXPositionLookupTable[endNodeIndex] + width / 2, this.nodeYPositionLookupTable[endNodeIndex]);
                        }
                        if (this.bTree.Nodes[i].Elements[k].Right != null) {
                            this.ctx.moveTo(this.nodeXPositionLookupTable[i] + 35 + k * 30, this.nodeYPositionLookupTable[i] + 30);
                            const endNodeIndex = this.bTree.Nodes.findIndex(n => n.UUID === this.bTree.Nodes[i].Elements[k].Right);
                            this.ctx.lineTo(this.nodeXPositionLookupTable[endNodeIndex] + width / 2, this.nodeYPositionLookupTable[endNodeIndex]);
                        }
                    }
                }
                this.ctx.stroke();
            }
        });
    }
    /**
     * This method extracts the first element of each row and counts the elements per row, to use this metrics for drawing the tree.
     */
    setTreeMetrics() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.resetTreeMetrics();
            let i = 0; // RowIterator
            let j = 1; // NodeIterator
            let k = 1;
            if (this.bTree.Nodes != null) {
                if (this.bTree.Nodes.length > 0) {
                    // Adding the root
                    this.firstElementsInRow[0] = this.bTree.Nodes[0];
                    if (this.bTree.Nodes.length > 1) {
                        while (this.bTree.Nodes[j - 1].Elements[0].Left != null) {
                            // Start new row
                            if (this.firstElementsInRow[i].Elements[0].Left === this.bTree.Nodes[j].UUID) {
                                this.firstElementsInRow.push(this.bTree.Nodes[j]);
                                this.numberNodesInRow[i] = k;
                                ++i;
                                k = 0;
                            }
                            ++j;
                            ++k;
                        }
                        this.numberNodesInRow.push(this.bTree.NumberLeaves);
                    }
                    else {
                        this.numberNodesInRow.push(1);
                    }
                }
            }
        });
    }
    resetTreeMetrics() {
        this.numberNodesInRow = [];
        this.firstElementsInRow = [];
    }
}
TreeDisplayComponent.ɵfac = function TreeDisplayComponent_Factory(t) { return new (t || TreeDisplayComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ui_ui_component__WEBPACK_IMPORTED_MODULE_2__["UiComponent"])); };
TreeDisplayComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: TreeDisplayComponent, selectors: [["app-tree-display"]], viewQuery: function TreeDisplayComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstaticViewQuery"](_c0, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.canvas = _t.first);
    } }, inputs: { childTree: "childTree", highlighted: "highlighted" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], decls: 3, vars: 2, consts: [[2, "border", "0px solid #000000", 3, "width", "height"], ["canvas", ""]], template: function TreeDisplayComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "canvas", 0, 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("width", ctx.canvasWidth);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("height", ctx.canvasHeight);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0cmVlLWRpc3BsYXkuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](TreeDisplayComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-tree-display',
                templateUrl: './tree-display.component.html',
                styleUrls: ['./tree-display.component.css']
            }]
    }], function () { return [{ type: _ui_ui_component__WEBPACK_IMPORTED_MODULE_2__["UiComponent"] }]; }, { canvas: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: ['canvas', { static: true }]
        }], childTree: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], highlighted: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ui_ui_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/ui.component */ "lxnM");



class AppComponent {
    constructor() {
        this.title = 'B-Baum';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 4, vars: 0, consts: [[1, "globalOffset"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "B-Baum");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-ui");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_ui_ui_component__WEBPACK_IMPORTED_MODULE_1__["UiComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reflect-metadata */ "mNvP");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _tree_display_tree_display_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tree-display/tree-display.component */ "GwL9");
/* harmony import */ var _ui_ui_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/ui.component */ "lxnM");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "ofXK");















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__["MatProgressSpinnerModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
        _tree_display_tree_display_component__WEBPACK_IMPORTED_MODULE_5__["TreeDisplayComponent"],
        _ui_ui_component__WEBPACK_IMPORTED_MODULE_6__["UiComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__["MatProgressSpinnerModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                    _tree_display_tree_display_component__WEBPACK_IMPORTED_MODULE_5__["TreeDisplayComponent"],
                    _ui_ui_component__WEBPACK_IMPORTED_MODULE_6__["UiComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"],
                    _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__["MatProgressSpinnerModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
            }]
    }], null, null); })();
_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetComponentScope"](_ui_ui_component__WEBPACK_IMPORTED_MODULE_6__["UiComponent"], [_angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__["MatSpinner"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], _tree_display_tree_display_component__WEBPACK_IMPORTED_MODULE_5__["TreeDisplayComponent"]], []);


/***/ }),

/***/ "Zcxu":
/*!*************************!*\
  !*** ./src/app/tree.ts ***!
  \*************************/
/*! exports provided: Tree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tree", function() { return Tree; });
class Tree {
}


/***/ }),

/***/ "lxnM":
/*!************************************!*\
  !*** ./src/app/ui/ui.component.ts ***!
  \************************************/
/*! exports provided: UiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiComponent", function() { return UiComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tree */ "Zcxu");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");






const _c0 = ["csvReader"];
function UiComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-spinner", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function UiComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div");
} }
class UiComponent {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.port = '8080';
        this.url = 'http://localhost:' + this.port + '/api';
        this.timeoutInterval = 6000;
        this.numberListInput = '';
        this.minRandomInput = '';
        this.maxRandomInput = '';
        this.numberRandomInput = '';
        this.sleepTimeInput = '';
        this.orderInput = '';
        this.consoleOutput = '';
        this.verbString = '';
        this.csvValues = [];
        this.values = [];
        this.load = false;
        this.currentTree = new _tree__WEBPACK_IMPORTED_MODULE_2__["Tree"]();
        this.treeArray = [];
        this.arrayIterator = 0;
    }
    ngOnInit() {
        this.resetTreeInBackend();
        this.initUi();
        this.currentTree.Order = 5;
    }
    /**
     * The following methods create the http-calls against the REST-Api and will be getting
     * called by the UI-Elements in the ui.component.html-file.
     */
    /**
     * This method gets called when new Elements should be added. It consumes them from the getNumberListInput()-method and resolves
     * the http-request with calling resolveAddDeleteHttpRequest() method.
     */
    addElements() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.consoleOutput = '';
            this.highlighted = null;
            const numberArray = this.getNumberListInput();
            if (numberArray.length < 1) {
                return;
            }
            const answer = this.httpClient.post(this.url + '', numberArray);
            this.resolveAddDeleteHttpRequest(answer);
        });
    }
    /**
     * This method gets called when Elements should be removed. It consumes them from the getNumberListInput()-method and resolves
     * the http-request with calling resolveAddDeleteHttpRequest() method.
     */
    deleteElements() {
        this.consoleOutput = '';
        this.highlighted = null;
        const numberArray = this.getNumberListInput();
        if (numberArray.length < 1) {
            return;
        }
        const answer = this.httpClient.request('delete', this.url + '', { body: numberArray });
        this.resolveAddDeleteHttpRequest(answer, true);
    }
    /**
     * This method gets called when a httpRequest for adding or deleting elements to/from the tree is pending.
     * It either times out or saves the array of trees which represent the single adding / removing steps.
     * After that it replaces this.currentTree with the first element of the treeArray, which triggers a UI reload
     * in tree-display.component.ts class that will draw the tree.
     * If the treeArray contains more than one element, this method calls the disableAllButtonsButNextStep()-method,
     * which disables all UI-Elements but the next step button to iterate over the single adding / removing steps.
     *
     * @param answer: The Observable<any> observing the http request.
     * @param deleted: Boolean, whether delete or add method calls this method.
     * @param changedOrder: Boolean, wheter changeOrder called this method.
     */
    resolveAddDeleteHttpRequest(answer, deleted = false, changedOrder = false) {
        this.load = true;
        answer.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["timeout"])(this.timeoutInterval), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(() => {
            this.consoleOutput = 'Verbindung fehlgeschlagen';
            this.load = false;
            return answer;
        })).subscribe(data => {
            this.load = false;
            this.enableAllButtonsButNextStep();
            this.treeArray = JSON.parse(data.Trees);
            this.values = JSON.parse(data.Values);
            this.verbString = deleted ? 'gelöscht.' : 'eingefügt.';
            /* true, when more than one element got added/removed */
            if (this.treeArray.length > 1) {
                if (this.consoleOutput !== '') {
                    this.consoleOutput = this.consoleOutput + '\n' + this.values[this.arrayIterator] + ' wird ' + this.verbString;
                }
                else {
                    this.consoleOutput = this.values[this.arrayIterator] + ' wird ' + this.verbString;
                }
                this.disableAllButtonsButNextStep();
            }
            /* true when one element gets added/removed */
            else if (this.treeArray.length === 1 && !changedOrder) {
                this.currentTree = this.treeArray[0];
                if (this.currentTree.Nodes.length < 1) {
                    this.initUi();
                }
            }
            /* true when changeOrder called this method */
            else if (changedOrder) {
                this.currentTree = this.treeArray[0];
                if (this.currentTree.Nodes.length < 1) {
                    this.initUi();
                }
                this.consoleOutput = this.consoleOutput + 'Die Ordnung wurde zu ' + this.currentTree.Order + ' verändert.';
            }
            /* true when no element could be added/removed */
            else {
                this.consoleOutput = this.consoleOutput + 'Es wurden keine Elemente ' + this.verbString;
            }
        });
    }
    /**
     * This method gets called when an element is searched. It consumes them from the getNumberListInput()-method to get the element
     * to search after. This cannot be more than one element. It resolves the http-Request itself and prints out if the element has
     * been found, or not and at which search cost. Further, it changes the highlighted-attribute, which is injected in the
     * tree-display-component.ts class. This will trigger a UI-Reload in this class and highlights the node containing the searched element.
     */
    searchElement() {
        this.consoleOutput = '';
        this.highlighted = null;
        const numberArray = this.getNumberListInput();
        if (numberArray.length < 1 || numberArray.length > 1) {
            if (numberArray.length > 1) {
                this.consoleOutput = 'Es kann nur nach einer Zahl gesucht werden.';
            }
            return;
        }
        const answer = this.httpClient.post(this.url + '/search', numberArray[0]);
        this.load = true;
        answer.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["timeout"])(this.timeoutInterval), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(() => {
            this.consoleOutput = 'Verbindung fehlgeschlagen.';
            this.load = false;
            return answer;
        })).subscribe((data) => {
            this.load = false;
            // @ts-ignore
            if (data.Highlighted === null) {
                // @ts-ignore
                this.consoleOutput = 'Nicht gefunden.\nKosten:' + data.Costs;
            }
            else {
                // @ts-ignore
                this.consoleOutput = 'Gefunden.\nKosten:' + data.Costs;
                // @ts-ignore
                this.highlighted = data.Highlighted;
            }
        });
    }
    /**
     * This method gets called when Elements should be added randomly. It consumes min, max and number of random values from
     * the getRandomInputs()-method. The http-request will be resolved with calling resolveAddDeleteHttpRequest() method.
     */
    addRandomElements() {
        this.consoleOutput = '';
        this.highlighted = null;
        const randomValues = this.getRandomInputs();
        if (randomValues.length < 3) {
            return;
        }
        if (randomValues[0] == null || randomValues[1] == null || randomValues[2] == null) {
            return;
        }
        if (randomValues[2] < randomValues[0]) {
            this.consoleOutput = 'Das Maximum muss größer als das Minimum sein';
            return;
        }
        if (randomValues[2] - randomValues[0] + 1 < randomValues[1]) {
            this.consoleOutput = 'Da Duplikate verboten sind, können für diese Min-Max-Range nur '
                + (randomValues[2] - randomValues[0] + 1) + ' Zufallswerte generiert werden.\n';
        }
        const answer = this.httpClient.post(this.url + '/random', randomValues);
        this.resolveAddDeleteHttpRequest(answer);
    }
    /**
     * This method gets called when the order of the b-tree should be changed. It consumes the order-value and trims it itself.
     * The http-request will be resolved with calling resolveAddDeleteHttpRequest() method.
     */
    changeOrder() {
        this.consoleOutput = '';
        this.highlighted = null;
        this.orderInput = this.orderInput.replace(/ /g, '');
        const temp = this.orderInput.match(/\d+/g);
        const orderValue = this.matchInput(temp);
        if (orderValue === null) {
            return;
        }
        else if (orderValue < 3) {
            this.consoleOutput = 'Die Ordnung muss mindestens 3 betragen!';
        }
        else {
            const answer = this.httpClient.post(this.url + '/changeOrder', orderValue);
            this.resolveAddDeleteHttpRequest(answer, false, true);
        }
    }
    /**
     * This method gets called when the nextStep-UI-Button is pressed or through the nextStepAutomation-Function.
     * It iterates over the treeArray and sets the currentTree-Attribute
     * to the value of the treeArray, the iterator is on, what calls a refresh of the visual tree-representation in the
     * tree-display.component.ts-class, where the currentTree is injected into.
     * This method has to be called as many times as the treeArrays length, to call the
     * enableAllButtonsButNextStep()-method and enable the UI-Elements again.
     *
     * @param calledFromAuto: Boolean that represents if method was called manually or from automation
     */
    nextStep(calledFromAuto = false) {
        this.consoleOutput = '';
        this.highlighted = null;
        this.currentTree = this.treeArray[this.arrayIterator];
        this.arrayIterator++;
        if (this.arrayIterator >= this.treeArray.length) {
            this.enableAllButtonsButNextStep();
            this.consoleOutput = this.treeArray.length + ' Werte wurden ' + this.verbString;
            if (!calledFromAuto) {
                this.arrayIterator = 0;
            }
            if (this.currentTree.Nodes.length < 1) {
                this.initUi();
            }
            return;
        }
        this.consoleOutput = this.values[this.arrayIterator] + ' wird ' + this.verbString;
    }
    /**
     * This method calls the nextStep()-Method automatically and periodically to add all new elements automated.
     * Global sleepTimeInput-Variable defines how long the UI waits between adding a new element.
     * If sleepTimeInput is 0, it just skips the iterative adding and sets the currentTree to the last element of the treeArray.
     */
    nextStepAutomation() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let sleepTime;
            if (this.sleepTimeInput !== '') {
                this.sleepTimeInput = this.sleepTimeInput.replace(/ /g, '');
                const temp = this.sleepTimeInput.match(/\d+/g);
                sleepTime = this.matchInput(temp);
            }
            else {
                sleepTime = 0;
            }
            if (sleepTime > 0) {
                while (this.arrayIterator < this.treeArray.length) {
                    this.nextStep(true);
                    yield this.delay(sleepTime);
                }
                this.arrayIterator = 0;
            }
            else {
                this.currentTree = this.treeArray[this.treeArray.length - 1];
                this.consoleOutput = this.treeArray.length + ' Werte wurden ' + this.verbString;
                this.enableAllButtonsButNextStep();
                this.arrayIterator = 0;
            }
        });
    }
    /**
     * Works as a asynchronous wait method
     * @param ms: the time to wait
     */
    delay(ms) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, ms));
        });
    }
    /**
     * This method gets called when CSV already has been read and creates the http-request to add the csv-files values to the tree.
     * The http-request will be resolved by calling resolveAddDeleteHttpRequest()-method.
     */
    readCSV() {
        this.consoleOutput = '';
        this.highlighted = null;
        if (this.csvValues[0] == null) {
            this.consoleOutput = 'Keine korrekten Daten aus einer CSV eingelesen.';
            return;
        }
        const answer = this.httpClient.post(this.url + '', this.csvValues);
        this.resolveAddDeleteHttpRequest(answer);
    }
    /**
     * This method gets called when the user uploads a CSV-file. It calls isValidCSVFile() to validate the file is a CSV file.
     * If it's a valid file, the method trims the elements of the CSV-file into an Array of numbers, called this.csvValues.
     * If it's not a valid file, it calls fileReset to reset the input-buffer for CSV-Files.
     *
     * @param $event: the UI-event triggering this method.
     */
    uploadListener($event) {
        this.consoleOutput = '';
        this.highlighted = null;
        const files = $event.target.files;
        if (this.isValidCSVFile(files[0])) {
            const input = $event.target;
            const reader = new FileReader();
            reader.readAsText(input.files[0]);
            reader.onload = () => {
                const csvData = reader.result;
                const csvRecordsArray = csvData.split(/\r\n|\n/);
                const tempString = csvRecordsArray[0].replace(/ /g, '');
                const temp = tempString.match(/\d+/g);
                if (temp != null) {
                    this.csvValues = temp.map(Number);
                }
                else {
                    this.consoleOutput = 'Die CSV enthält keine gültigen Zahlen.';
                    return;
                }
                this.consoleOutput = 'Die Werte der CSV lauten: \n' + tempString + '\nBestätige mit CSV Bestätigen.';
            };
        }
        else {
            alert('Please import valid .csv file.');
            this.fileReset();
        }
    }
    /**
     * Validates it the file is a CSV-File.
     *
     * @param file: The file to validate.
     */
    isValidCSVFile(file) {
        return file.name.endsWith('.csv');
    }
    /**
     * Resets the CSV-Readers buffer.
     */
    fileReset() {
        this.csvReader.nativeElement.value = '';
    }
    resetTreeInBackend() {
        this.consoleOutput = '';
        this.highlighted = null;
        const answer = this.httpClient.get(this.url + '/reset');
        answer.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["timeout"])(this.timeoutInterval), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(() => {
            this.consoleOutput = 'Verbindung fehlgeschlagen.';
            this.load = false;
            return answer;
        })).subscribe((data) => {
            this.load = false;
            this.consoleOutput = 'Verbindung hergestellt.';
        });
    }
    /**
     * Reads the input field for adding, removing or searching numbers and converts to number-array.
     * @return An array of input numbers.
     */
    getNumberListInput() {
        this.numberListInput = this.numberListInput.replace(/ /g, '');
        const temp = this.numberListInput.match(/\d+/g);
        this.numberListInput = '';
        if (temp != null) {
            return temp.map(Number);
        }
        else {
            this.consoleOutput = 'Die Eingabe enthält kein gültigen Zahlen.';
            return [];
        }
    }
    /**
     * Transforms the random input parameters (min, max, number) and trims them to numbers.
     * @return: The array containing the trimmed input parameters.
     */
    getRandomInputs() {
        const inputValues = [];
        this.minRandomInput = this.minRandomInput.replace(/ /g, '');
        let temp = this.minRandomInput.match(/\d+/g);
        inputValues[0] = this.matchInput(temp);
        this.maxRandomInput = this.maxRandomInput.replace(/ /g, '');
        temp = this.maxRandomInput.match(/\d+/g);
        inputValues[2] = this.matchInput(temp);
        this.numberRandomInput = this.numberRandomInput.replace(/ /g, '');
        temp = this.numberRandomInput.match(/\d+/g);
        inputValues[1] = this.matchInput(temp);
        this.numberRandomInput = '';
        this.minRandomInput = '';
        this.maxRandomInput = '';
        return inputValues;
    }
    /**
     * Matches the RegularExpression against a number value, if possible maps it to a number.
     * @param temp: The RegExpMatchArray to get the first number value from.
     */
    matchInput(temp) {
        if (temp != null) {
            return temp.map(Number)[0];
        }
        else {
            this.consoleOutput = 'Die Eingabe enthält keine gültigen Zahlen.';
            return null;
        }
    }
    /**
     * Disables all UI-Elements but the NextStepButton, The Auto-Step-Button and the sleepTimeInputButton.
     */
    disableAllButtonsButNextStep() {
        const button = document.querySelectorAll('button');
        for (let i = 0; i < button.length; i++) {
            button[i].disabled = true;
        }
        const input = document.querySelectorAll('input');
        for (let i = 0; i < input.length; i++) {
            input[i].disabled = true;
        }
        button[button.length - 2].disabled = false;
        button[button.length - 3].disabled = false;
        input[input.length - 2].disabled = false;
    }
    /**
     * Enables all UI-Element but the NextStepButton, The Auto-Step-Button and the sleepTimeInputButton.
     */
    enableAllButtonsButNextStep() {
        const button = document.querySelectorAll('button');
        for (let i = 0; i < button.length; i++) {
            button[i].disabled = false;
        }
        const input = document.querySelectorAll('input');
        for (let i = 0; i < input.length; i++) {
            input[i].disabled = false;
        }
        button[button.length - 2].disabled = true;
        button[button.length - 3].disabled = true;
        input[input.length - 2].disabled = true;
    }
    /**
     * Disables Search and Remove button, called on init or if the tree is empty.
     */
    initUi() {
        const button = document.querySelectorAll('button');
        button[1].disabled = true;
        button[2].disabled = true;
    }
}
UiComponent.ɵfac = function UiComponent_Factory(t) { return new (t || UiComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"])); };
UiComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UiComponent, selectors: [["app-ui"]], viewQuery: function UiComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.csvReader = _t.first);
    } }, decls: 48, vars: 12, consts: [["blur", ""], [4, "ngIf", "ngIfElse"], ["xmlns", "http://www.w3.org/1999/html", 1, "left"], ["id", "numberInput", "type", "text", "value", "", "placeholder", "1, 2, ...", 1, "bigInput", 3, "ngModel", "ngModelChange"], ["id", "addButton", 1, "addButton", 3, "click"], ["id", "removeButton", 1, "addButton", 3, "click"], ["id", "searchButton", 1, "searchButton", 3, "click"], ["id", "minRandom", "type", "text", "value", "", "placeholder", "Min", 1, "smallInput", 3, "ngModel", "ngModelChange"], ["id", "maxRandom", "type", "text", "value", "", "placeholder", "Max", 1, "smallInput", 3, "ngModel", "ngModelChange"], ["id", "numberRandom", "type", "text", "value", "", "placeholder", "Anz", 1, "smallInput", 3, "ngModel", "ngModelChange"], ["id", "addRandomButton", 1, "randomButton", 3, "click"], ["type", "text", "id", "orderInput", "value", "", 1, "smallInput", 3, "ngModel", "placeholder", "ngModelChange"], ["id", "changeOrderButton", 3, "click"], ["value", "", "rows", "5", "placeholder", "> Ausgabe", 1, "outPut", 3, "ngModel", "ngModelChange"], ["disabled", "", 1, "nextStepButton", 3, "click"], ["disabled", "", 1, "searchButton", 3, "click"], ["type", "text", "id", "sleepTimeInput", "value", "", "placeholder", "0ms", "disabled", "", 1, "sleepInput", 3, "ngModel", "ngModelChange"], ["type", "file", "id", "csvInput", "name", "csvInput", "accept", ".csv", 1, "inputFile", 3, "change"], ["for", "csvInput", 1, "label"], [1, "nextStepButton", 3, "click"], [1, "outer"], [1, "right"], [3, "childTree", "highlighted"], [1, "fadeMe"], ["color", "accent", 1, "activityIndicator"]], template: function UiComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, UiComponent_ng_template_0_Template, 2, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, UiComponent_div_2_Template, 1, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function UiComponent_Template_input_ngModelChange_5_listener($event) { return ctx.numberListInput = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UiComponent_Template_button_click_7_listener() { return ctx.addElements(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UiComponent_Template_button_click_9_listener() { return ctx.deleteElements(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "-");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UiComponent_Template_button_click_11_listener() { return ctx.searchElement(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Suchen");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function UiComponent_Template_input_ngModelChange_15_listener($event) { return ctx.minRandomInput = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function UiComponent_Template_input_ngModelChange_16_listener($event) { return ctx.maxRandomInput = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function UiComponent_Template_input_ngModelChange_17_listener($event) { return ctx.numberRandomInput = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UiComponent_Template_button_click_18_listener() { return ctx.addRandomElements(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "+ Zfll.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function UiComponent_Template_input_ngModelChange_22_listener($event) { return ctx.orderInput = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UiComponent_Template_button_click_23_listener() { return ctx.changeOrder(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Ordnung Ver\u00E4ndern");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](25, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "textarea", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function UiComponent_Template_textarea_ngModelChange_27_listener($event) { return ctx.consoleOutput = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](28, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UiComponent_Template_button_click_30_listener() { return ctx.nextStep(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "N\u00E4chster Schritt");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UiComponent_Template_button_click_33_listener() { return ctx.nextStepAutomation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "Auto-Step");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function UiComponent_Template_input_ngModelChange_35_listener($event) { return ctx.sleepTimeInput = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](36, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UiComponent_Template_input_change_38_listener($event) { return ctx.uploadListener($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, "CSV Ausw\u00E4hlen ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UiComponent_Template_button_click_42_listener() { return ctx.readCSV(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "CSV Best\u00E4tigen");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](44, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](47, "app-tree-display", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.load == false)("ngIfElse", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.numberListInput);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.minRandomInput);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.maxRandomInput);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.numberRandomInput);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("placeholder", ctx.currentTree.Order);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.orderInput);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.consoleOutput);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.sleepTimeInput);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("childTree", ctx.currentTree)("highlighted", ctx.highlighted);
    } }, styles: [".bigInput[_ngcontent-%COMP%] {\r\n  width: 180px;\r\n}\r\n.smallInput[_ngcontent-%COMP%] {\r\n  width: 25px;\r\n}\r\n.addButton[_ngcontent-%COMP%] {\r\n  height: 20px;\r\n  width: 30px;\r\n  padding: 2px 2px;\r\n}\r\n.randomButton[_ngcontent-%COMP%] {\r\n  height: 47px;\r\n  width: 48px;\r\n  padding: 2px 2px;\r\n}\r\n.searchButton[_ngcontent-%COMP%] {\r\n  height: 20px;\r\n  width: 133px;\r\n  padding: 2px 2px;\r\n}\r\n.nextStepButton[_ngcontent-%COMP%]{\r\n  height: 20px;\r\n  width: 202px;\r\n  padding: 2px 2px;\r\n}\r\n.sleepInput[_ngcontent-%COMP%]{\r\n  height: 14px;\r\n  width: 59px;\r\n  padding: 2px 2px;\r\n}\r\n.left[_ngcontent-%COMP%] {\r\n  min-width: 250px;\r\n  position: fixed;\r\n}\r\n.right[_ngcontent-%COMP%] {\r\n    height: 100%;\r\n    right: 0;\r\n    top: 0%;\r\n    left: 250px;\r\n    position: fixed;\r\n    overflow-x: scroll;\r\n    overflow-y: scroll;\r\n    text-align: center;\r\n}\r\n.fadeMe[_ngcontent-%COMP%] {\r\n  opacity:    0.5;\r\n  background: #000000;\r\n  width:      100%;\r\n  height:     100%;\r\n  z-index:    10;\r\n  top:        0;\r\n  left:       0;\r\n  position:   fixed;\r\n}\r\n.activityIndicator[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 55%;\r\n  top: 30%;\r\n}\r\n.inputFile[_ngcontent-%COMP%] {\r\n  width: 0.1px;\r\n  height: 0.1px;\r\n  opacity: 0;\r\n  overflow: hidden;\r\n  position: absolute;\r\n  z-index: -1;\r\n}\r\n.inputFile[_ngcontent-%COMP%]    + .label[_ngcontent-%COMP%] {\r\n  font-family: Cambria, Georgia;\r\n  background-color: #4CAF50; \r\n  border: none;\r\n  color: white;\r\n  padding: 2px 2px;\r\n  margin: 4px 2px ;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  display: inline-block;\r\n  font-size: 14px;\r\n  width: 198px;\r\n  height: 18px;\r\n  transition-duration: 0.4s;\r\n}\r\n.inputFile[_ngcontent-%COMP%]    + .label[_ngcontent-%COMP%]:hover {\r\n  background: #2b6f2b;\r\n}\r\n.inputFile[_ngcontent-%COMP%]:focus    + .label[_ngcontent-%COMP%] {\r\n  background: #091809;\r\n}\r\n.inputFile[_ngcontent-%COMP%]:disabled    + .label[_ngcontent-%COMP%] {\r\n  background: rgba(0, 0, 0, 0.16);\r\n  cursor: default;\r\n}\r\n.inputFile[_ngcontent-%COMP%]    + .label[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLFdBQVc7QUFDYjtBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZTtBQUNqQjtBQUVBO0lBQ0ksWUFBWTtJQUNaLFFBQVE7SUFDUixPQUFPO0lBQ1AsV0FBVztJQUNYLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtBQUN0QjtBQUNBO0VBQ0UsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxhQUFhO0VBQ2IsYUFBYTtFQUNiLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxRQUFRO0FBQ1Y7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsV0FBVztBQUNiO0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IseUJBQXlCLEVBQUUsVUFBVTtFQUNyQyxZQUFZO0VBQ1osWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsZUFBZTtFQUNmLFlBQVk7RUFDWixZQUFZO0VBQ1oseUJBQXlCO0FBQzNCO0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjtBQUVBO0VBQ0UsK0JBQStCO0VBQy9CLGVBQWU7QUFDakI7QUFFQTtFQUNFLGVBQWU7QUFDakIiLCJmaWxlIjoidWkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5iaWdJbnB1dCB7XHJcbiAgd2lkdGg6IDE4MHB4O1xyXG59XHJcbi5zbWFsbElucHV0IHtcclxuICB3aWR0aDogMjVweDtcclxufVxyXG5cclxuLmFkZEJ1dHRvbiB7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIHdpZHRoOiAzMHB4O1xyXG4gIHBhZGRpbmc6IDJweCAycHg7XHJcbn1cclxuLnJhbmRvbUJ1dHRvbiB7XHJcbiAgaGVpZ2h0OiA0N3B4O1xyXG4gIHdpZHRoOiA0OHB4O1xyXG4gIHBhZGRpbmc6IDJweCAycHg7XHJcbn1cclxuLnNlYXJjaEJ1dHRvbiB7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIHdpZHRoOiAxMzNweDtcclxuICBwYWRkaW5nOiAycHggMnB4O1xyXG59XHJcbi5uZXh0U3RlcEJ1dHRvbntcclxuICBoZWlnaHQ6IDIwcHg7XHJcbiAgd2lkdGg6IDIwMnB4O1xyXG4gIHBhZGRpbmc6IDJweCAycHg7XHJcbn1cclxuLnNsZWVwSW5wdXR7XHJcbiAgaGVpZ2h0OiAxNHB4O1xyXG4gIHdpZHRoOiA1OXB4O1xyXG4gIHBhZGRpbmc6IDJweCAycHg7XHJcbn1cclxuLmxlZnQge1xyXG4gIG1pbi13aWR0aDogMjUwcHg7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG59XHJcblxyXG4ucmlnaHQge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICB0b3A6IDAlO1xyXG4gICAgbGVmdDogMjUwcHg7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBvdmVyZmxvdy14OiBzY3JvbGw7XHJcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmZhZGVNZSB7XHJcbiAgb3BhY2l0eTogICAgMC41O1xyXG4gIGJhY2tncm91bmQ6ICMwMDAwMDA7XHJcbiAgd2lkdGg6ICAgICAgMTAwJTtcclxuICBoZWlnaHQ6ICAgICAxMDAlO1xyXG4gIHotaW5kZXg6ICAgIDEwO1xyXG4gIHRvcDogICAgICAgIDA7XHJcbiAgbGVmdDogICAgICAgMDtcclxuICBwb3NpdGlvbjogICBmaXhlZDtcclxufVxyXG5cclxuLmFjdGl2aXR5SW5kaWNhdG9yIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogNTUlO1xyXG4gIHRvcDogMzAlO1xyXG59XHJcblxyXG4uaW5wdXRGaWxlIHtcclxuICB3aWR0aDogMC4xcHg7XHJcbiAgaGVpZ2h0OiAwLjFweDtcclxuICBvcGFjaXR5OiAwO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHotaW5kZXg6IC0xO1xyXG59XHJcblxyXG4uaW5wdXRGaWxlICsgLmxhYmVsIHtcclxuICBmb250LWZhbWlseTogQ2FtYnJpYSwgR2VvcmdpYTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwOyAvKiBHcmVlbiAqL1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogMnB4IDJweDtcclxuICBtYXJnaW46IDRweCAycHggO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICB3aWR0aDogMTk4cHg7XHJcbiAgaGVpZ2h0OiAxOHB4O1xyXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDAuNHM7XHJcbn1cclxuXHJcbi5pbnB1dEZpbGUgKyAubGFiZWw6aG92ZXIge1xyXG4gIGJhY2tncm91bmQ6ICMyYjZmMmI7XHJcbn1cclxuXHJcbi5pbnB1dEZpbGU6Zm9jdXMgKyAubGFiZWwge1xyXG4gIGJhY2tncm91bmQ6ICMwOTE4MDk7XHJcbn1cclxuXHJcbi5pbnB1dEZpbGU6ZGlzYWJsZWQgKyAubGFiZWwge1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4xNik7XHJcbiAgY3Vyc29yOiBkZWZhdWx0O1xyXG59XHJcblxyXG4uaW5wdXRGaWxlICsgLmxhYmVsIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuIl19 */"] });
UiComponent.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: UiComponent, factory: UiComponent.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](UiComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-ui',
                templateUrl: './ui.component.html',
                styleUrls: ['./ui.component.css']
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] }]; }, { csvReader: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: ['csvReader']
        }] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map