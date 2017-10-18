import React, {Component} from 'react';
import './optionMenu.css';

class OptionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      optionsSort: '',
      optionsFilter: {
        query: '',
        propName: 'name',
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
      if (this.node) {
        if (this.node.contains(e.target)) {
          return;
        }
      }
      this.handleClickOnMenu();
    }
  };

  changeSort = (e) => {
    this.setState({optionsSort: e.target.value})
  };

  changeFilterQuery = (e) => {
    const opt = {...this.state.optionsFilter};
    opt.query = e.target.value;
    this.setState({optionsFilter: opt})
  };

  applyOptions = () => {
    this.handleClickOnMenu();
  };

  render() {
    console.log(this.state);
    return (
      <div className='container__options' ref={(container) => this.container = container}>
          <span className={`fa ${this.state.showMenu ? 'fa-caret-down' : 'fa-caret-right'} options__caret`}
                onClick={(e) => this.handleClickOnMenu(e)}
                ref={(node) => this.node = node }>
            Options
          </span>
        <div className={this.state.showMenu ? 'options__optionList' : 'hidden'}>
          <div className='optionList__item'>
            <span className='item__optionLabel'>Sort</span>
            <select onChange={(e) => this.changeSort(e)}>
              <option value='acs'>Asc</option>
              <option value='desc'>Desc</option>
            </select>
          </div>
          <div className='optionList__item'>
            <span className='item__optionLabel'>Filter</span>
            <input onChange={(e) => this.changeFilterQuery(e)}/>
          </div>
          <div className='item__wrapApply'>
            <div className={`optionList__item isActiveSelector__item scaleSmaller`}>
              <span className='item__apply' onClick={() => this.applyOptions()}>Apply</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OptionMenu
