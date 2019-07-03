

export abstract class Page {

    // ----- 分页变量  ------
    public totalItems: number = 0;   //总条数
    /**
     * 当前页
     */
    public _currentPage: number = 1;
    public _pageSize: number = 20; //每页显示条数
    public loadingImg: boolean = true; // 加载中图片

    // 以下为后台分页配置
    set currentPage(value: number) {
        if (value != this._currentPage) {
            this._currentPage = value;
            this.init();
        }
    }

    get currentPage() {
        return this._currentPage;
    }

    set pageSize(value: number) {
        this._pageSize = value;
        this.init();
    }

    get pageSize() {
        return this._pageSize;
    }

    protected abstract init();

}
