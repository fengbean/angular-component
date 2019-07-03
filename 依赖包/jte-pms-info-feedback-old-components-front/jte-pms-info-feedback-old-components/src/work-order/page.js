"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Page = (function () {
    function Page() {
        // ----- 分页变量  ------
        this.totalItems = 0; //总条数
        /**
         * 当前页
         */
        this._currentPage = 1;
        this._pageSize = 20; //每页显示条数
        this.loadingImg = true; // 加载中图片
    }
    Object.defineProperty(Page.prototype, "currentPage", {
        get: function () {
            return this._currentPage;
        },
        // 以下为后台分页配置
        set: function (value) {
            if (value != this._currentPage) {
                this._currentPage = value;
                this.init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (value) {
            this._pageSize = value;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    return Page;
}());
exports.Page = Page;
//# sourceMappingURL=page.js.map