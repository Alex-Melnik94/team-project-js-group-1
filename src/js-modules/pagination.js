// Pagination plugin. See API below >>>>

// Exports: class "Pages"

// Usage: 
//          'let pagination = new Pages(selector);'
//   [selector] is CSS selector to find pagination container in html
//   Since markup not completed, this feature is frozen. Markup currently appended to the end of document body.
//   When created, pagination is not rendered to container immediately.

// Can receive:
//          current page => in case of current page change,
//          total pages => necessary in case of new query made;
// Interaction and primary physical render: 
//          'pagination.moveToPage(currPage, [tllPages]);'
//   `currPage` sets new current page
//   `tllPages` (optional) - sets new total pages number; if omitted, current total pages kept

// Can provide: 
//   current page: 
//        'const currentPage = pagination.page;'
//   ref to pagination container:
//        'const paginationContainerRef = pagination.container;'
//   current page saved in container data-property:
//        'const currentPage = pagination.container.dataset.page;'
//  custom event "pagechanged" dispatched on pagination container when user selects new page.
//  It can be then caught in outer code, smth like:
//        'pagination.container.addEventListener('pagechanged', *callback*);'  

// Visual interface:
//   `boxes with figures` - allow to change current page within +/- 1-2 offset range
//   `ellipsis (...)` - visual separators, no interaction
//   `<` / `>` - shift current page f'wd and b'wd by one
//   `<<` / `>>` - shift current page f'wd and b'wd by 10


const camelToKebabCase = (word) => {
  return word.replace(/([A-Z])/g, ch => '-' + ch.toLowerCase());
}

const pageControls = ['leftFastButton', 'leftButton', 'firstPage', 'leftEllipsis',
  'rightEllipsis', 'lastPage', 'rightButton', 'rightFastButton'];

export default class Pages {

  constructor (containerClass) {
    this._currentPage = 1;
    this._totalPages = 5;

    this._mapping = this.initMap();

    this._container = document.querySelector('.pagination')
    this._refs = this.getPaginationRefs();

    this.container.addEventListener('click', this.onPaginationClick.bind(this));
  }

  getPaginationRefs() {
    const controlRefs = pageControls.reduce((acc, controlItem) => {
      const controlItemRef = this.container.querySelector(`[data-action="${camelToKebabCase(controlItem)}"]`);
      return {...acc, [controlItem]: controlItemRef}
    }, {});

    const pageRefs = [...this.container.querySelectorAll('[data-action="page"]')];
      
    return {...controlRefs, pages: pageRefs};
  }

  onPaginationClick(evt) {
    const target = evt.target.closest('.pagination-nav'); // closest used for the case if some deeper structure implemented
    
    if (!target) return;
    if (target.dataset.active === 'false') return;
    if (target.dataset.action.includes('ellipsis')) return;

    let page = target.textContent;

    switch (target.dataset.action) {
      case 'left-fast-button': this.shiftPageLeftFast();
      break;
    
      case 'right-fast-button': this.shiftPageRightFast();
      break;
      
      case 'left-button': this.shiftPageLeft();
      break;
      
      case 'right-button': this.shiftPageRight();
      break;
      
      default:
        page = Number(page);
        if (page !== this._currentPage) {
          this.moveToPage(page);
        } else return;
    }

    let pageEvent = new Event('pagechanged');
    this._container.dispatchEvent(pageEvent);
  }

  initMap() {
    return {
      ...pageControls.reduce((acc, controlItem) => {
        return /left|right/.test(controlItem) ? {...acc, [controlItem]: true} : acc
      }, {}),
 
      pages: Array.from({ length: 5 }, () => 0),
      
      firstPage: 1,
      lastPage: this._totalPages,     
    };
  }

  refreshMap() {
    this._mapping = this.initMap();

    let offset = 0;

    if (this._currentPage <= 3) {
      this._mapping.leftFastButton = false;
      this._mapping.leftButton = false;
      this._mapping.firstPage = 0;
      this._mapping.leftEllipsis = false;
      offset = 3 - this._currentPage;
    }

    if (this._currentPage >= this._totalPages - 2) {
      this._mapping.rightEllipsis = false;
      this._mapping.lastPage = 0;
      this._mapping.rightButton = false;
      this._mapping.rightFastButton = false;
      offset = this._totalPages - this._currentPage - 2;
    }

    this._mapping.pages = this._mapping.pages.map((page, idx) => {
      return this._currentPage - 2 + idx + offset;
    });

  }

  refreshPaginationMarkup() {
    pageControls.forEach(controlItem => {
      this._refs.[controlItem].dataset.active = Boolean(this._mapping.[controlItem]);
    })

    this._refs.pages.forEach((page, idx) => {
      page.textContent = this._mapping.pages[idx];
      page.classList.remove('pagination-page-active');
      page.dataset.active = true;
    });

    this._refs.lastPage.textContent = this._totalPages;
    this._refs.pages.find(page => page.textContent === '' + this._currentPage).classList.add('pagination-page-active');
    this._container.dataset.page = this._currentPage;
  }

  moveToPage(newPage, _totalPages = this._totalPages) {
    this._currentPage = newPage;
    this._totalPages = _totalPages;
    this.refreshMap();
    this.refreshPaginationMarkup();
  }

  shiftPage(offset) {
    let newPage = this._currentPage + offset;
    if (newPage < 1) {
      newPage = 1;
    }
      
    if (newPage > this._totalPages) {
      newPage = this._totalPages;
    }
    
    this.moveToPage(newPage);
  }

  shiftPageRight() {
    this.shiftPage(1);
  }

  shiftPageLeft() {
    this.shiftPage(-1);
  }

  shiftPageRightFast() {
    this.shiftPage(10);
  }

  shiftPageLeftFast() {
    this.shiftPage(-10);
  }
  
  get page() {
    return this._currentPage;
  }

  get container() {
    return this._container;
  }
}