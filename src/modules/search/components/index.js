export default class extends React.PureComponent {
    constructor() {
        super();

        this.handleSearchClick = () => {
            
        }
    }
    render() {
        return <div>
            <div className="weui-search-bar" id="search_bar">
                <form className="weui-search-bar__form">
                    <div className="weui-search-bar__box">
                        <i className="weui-icon-search"></i>
                        <input type="search" className="weui-search-bar__input" id="search_input" placeholder="搜索" />
                        <a href="javascript:" className="weui-icon-clear" id="search_clear"></a>
                    </div>
                    <label htmlFor="search_input" className="weui-search-bar__label" id="search_text" onClick={this.handleSearchClick}>
                        <i className="weui-icon-search"></i>
                        <span>搜索</span>
                    </label>
                </form>
                <a href="javascript:" className="weui-search-bar__cancel-btn" id="search_cancel">取消</a>
            </div>
            <div className="weui-cells weui-cells_access search_show" id="search_show">
                <div className="weui-cell">
                    <div className="weui-cell__bd weui-cell_primary">
                        <p>实时搜索文本</p>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__bd weui-cell_primary">
                        <p>实时搜索文本</p>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__bd weui-cell_primary">
                        <p>实时搜索文本</p>
                    </div>
                </div>
                <div className="weui-cell">
                    <div className="weui-cell__bd weui-cell_primary">
                        <p>实时搜索文本</p>
                    </div>
                </div>
            </div>
        </div>
    }
}