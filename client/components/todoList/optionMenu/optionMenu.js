import React, {Component} from 'react';
import './optionMenu.css';

class OptionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      optionsSort: 'ASC',
      optionsFilter: {
        query: '',
        propName: 'name',
        matchCase: false,
        exactMatch: false,
      }
    };
  }

  handleClickOnMenu = () => {
    if (this.container) {
      if (!this.state.showMenu) {
        document.addEventListener('click', this.handleOutsideClick, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
      }

      this.setState({
        showMenu: !this.state.showMenu,
      });
    }
  };

  handleOutsideClick = (e) => {
    if (e.target.closest(".options__optionList") === null) {
      if (this.node && this.node.contains(e.target)) {
        return;
      }
      this.handleClickOnMenu();
    }
  };

  changeSort = (e) => {
    this.setState({optionsSort: e.target.value})
  };

  changeFilterQuery = (e) => {
    if (e.key === 'Enter') {
      this.handleApplyOptions();
      return;
    }
    const opt = {...this.state.optionsFilter};
    opt.query = e.target.value;
    this.setState({optionsFilter: opt})
  };

  handleMatchCase = () => {
    const opt = {...this.state.optionsFilter};
    opt.matchCase = !opt.matchCase;
    this.setState({optionsFilter: opt})
  };

  handleExactMatch = () => {
    const opt = {...this.state.optionsFilter};
    opt.exactMatch = !opt.exactMatch;
    this.setState({optionsFilter: opt})
  };

  handleApplyOptions = () => {
    this.handleClickOnMenu();
    const options = {...this.state.optionsFilter, order: this.state.optionsSort};
    this.props.applyOptions(options)
  };

  handleClearOptions = () => {
    this.handleClickOnMenu();
    this.filterInput.value = '';
    this.props.clearOptions();
  };

  render() {
    return (
      <div className='container__options' ref={(container) => this.container = container}>
          <span className={`fa ${this.state.showMenu ? 'fa-caret-down' : 'fa-caret-right'} options__caret`}
                onClick={(e) => this.handleClickOnMenu(e)}
                ref={(node) => this.node = node}>
            Options
          </span>
        <div className={this.state.showMenu ? 'options__optionList' : 'hidden'}>
          <div className='optionList__item'>
            <span className='item__optionLabel'>Sort</span>
            <select className='item__sortSelector' onChange={(e) => this.changeSort(e)}>
              <option value='ASC'>A -> Z</option>
              <option value='DESC'>Z -> A</option>
            </select>
          </div>
          <div className='optionList__item'>
            <span className='item__optionLabel'>Filter</span>
            <div className='item__filterQuery'>
              <input
                ref={(node) => this.filterInput = node}
                onChange={(e) => this.changeFilterQuery(e)}
                onKeyPress={(e) => this.changeFilterQuery(e)}
              />
              <div className='filterQuery__matchCase'>
                <i className=
                     {
                       `filterQuery__button
                        ${this.state.optionsFilter.matchCase ?
                         'fa fa-check-circle-o' :
                         'fa fa-circle-o'}`
                     }
                   onClick={() => this.handleMatchCase()}
                />
                <span>match case</span>
              </div>
              <div>
                <i className=
                     {
                       `filterQuery__button
                        ${this.state.optionsFilter.exactMatch ?
                         'fa fa-check-circle-o' :
                         'fa fa-circle-o'}`
                     }
                   onClick={() => this.handleExactMatch()}
                />
                <span>exact match</span>
              </div>
            </div>
          </div>
          <div className='item__wrapApply'>
            <div className='optionList__item isActiveSelector__item scaleSmaller'>
              <span className='item__apply' onClick={() => this.handleClearOptions()}>Clear</span>
            </div>
            <div className='optionList__item isActiveSelector__item scaleSmaller'>
              <span className='item__apply' onClick={() => this.handleApplyOptions()}>Apply</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OptionMenu
