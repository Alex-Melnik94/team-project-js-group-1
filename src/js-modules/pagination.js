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


export default class Pages {
  constructor (containerClass) {
    this._currentPage = 1;
    this._totalPages = 5;

    this._mapping = {};
    this.refreshMap();

    // this._container = document.querySelector(containerClass);
    this._container = document.body; // change when markup is done
    this._markup = this.makePaginationMarkup();
    this._refs = this.getPaginationRefs();

    // this._container.addEventListener('click', this.onPaginationClick.bind(this));
    this._markup.addEventListener('click', this.onPaginationClick.bind(this)); // change to this._container when markup is done

    console.log(this);
  }

  getPaginationRefs() {  // change all this stuff immediately when markup is completed. 
    return {
      leftFastButton: this._markup.querySelector('div:nth-child(1)'),
      leftButton: this._markup.querySelector('div:nth-child(2)'),
      firstPage: this._markup.querySelector('div:nth-child(3)'),
      leftEllipsis: this._markup.querySelector('div:nth-child(4)'),

      pages: [this._markup.querySelector('div:nth-child(5)'),
      this._markup.querySelector('div:nth-child(6)'),
      this._markup.querySelector('div:nth-child(7)'),
      this._markup.querySelector('div:nth-child(8)'),
      this._markup.querySelector('div:nth-child(9)'),],
      
      rightEllipsis: this._markup.querySelector('div:nth-child(10)'),
      lastPage: this._markup.querySelector('div:nth-child(11)'),
      rightButton : this._markup.querySelector('div:nth-child(12)'),
      rightFastButton: this._markup.querySelector('div:nth-child(13)'),
    }
  }

  onPaginationClick(evt) {
    const target = evt.target.closest('.pagination-nav'); // closest used for the case if some deeper structure implemented
    if (!target) return;
    if (target.dataset.active === 'false') return;

    let role = target.textContent;
    if (role === '...') return;

    switch (role) {
      case '<<': this.shiftPageLeftFast();
      break;
    
      case '>>': this.shiftPageRightFast();
      break;
      
      case '<': this.shiftPageLeft();
      break;
      
      case '>': this.shiftPageRight();
      break;
      
      default:
        role = Number(role);
        if (role - role === 0 && role !== this._currentPage) {
          this.moveToPage(role);
        } else return;
    }

    let pageEvent = new Event('pagechanged');
    this._container.dispatchEvent(pageEvent);

  }

  refreshMap() {
    this._mapping = {
      leftFastButton: true,
      leftButton: true,
      leftMost: 1,
      leftEllipsis: true,

      pages: Array.from({ length: 5 }, () => 0),
      
      rightEllipsis: true,
      rightMost: this._totalPages,
      rightButton: true,
      rightFastButton: true,
    };

    let offset = 0;

    if (this._currentPage <= 3) {
      this._mapping.leftFastButton = false;
      this._mapping.leftButton = false;
      this._mapping.leftMost = 0;
      this._mapping.leftEllipsis = false;
      offset = 3 - this._currentPage;
    }

    if (this._currentPage >= this._totalPages - 2) {
      this._mapping.rightEllipsis = false;
      this._mapping.rightMost = 0;
      this._mapping.rightButton = false;
      this._mapping.rightFastButton = false;
      offset = this._totalPages - this._currentPage - 2;
    }

    // console.log('in refreshMap');
    // console.log('Current page', this._currentPage);
    // console.log('offset', offset);
    // console.log('this', this);

    this._mapping.pages = this._mapping.pages.map((page, idx) => {
      return this._currentPage - 2 + idx + offset;
    });

  }

  makePaginationMarkup() {

    // use hbs template instead when markup is ready;
    const ulRef = document.createElement('div');
    ulRef.classList.add('pagination');
    const liRef = Array.from({ length: 13, }, () => document.createElement('div'))
    liRef.forEach(li => li.classList.add('pagination-nav'));
 
    liRef[0].textContent = '<<';
    liRef[1].textContent = '<';
    liRef[2].textContent = '1';
    liRef[3].textContent = '...';
    liRef[9].textContent = '...';
    liRef[10].textContent = this._totalPages;
    liRef[11].textContent = '>';
    liRef[12].textContent = '>>';

    ulRef.append(...liRef);
    return ulRef;
  }

  refreshPaginationMarkup() {
    this._refs.leftFastButton.dataset.active = this._mapping.leftFastButton;
    this._refs.leftButton.dataset.active = this._mapping.leftButton;
    this._refs.firstPage.dataset.active = Boolean(this._mapping.leftMost);
    this._refs.leftEllipsis.dataset.active = this._mapping.leftEllipsis;

    this._refs.pages.forEach((page, idx) => {
      page.textContent = this._mapping.pages[idx];
      page.classList.remove('pagination-page-active');
      page.dataset.active = true;
    });

    this._refs.rightEllipsis.dataset.active = this._mapping.rightEllipsis;
    this._refs.lastPage.dataset.active = Boolean(this._mapping.rightMost);
    this._refs.rightButton.dataset.active = this._mapping.rightButton;
    this._refs.rightFastButton.dataset.active = this._mapping.rightFastButton;

    this._refs.lastPage.textContent = this._totalPages;

    this._refs.pages.find(page => page.textContent === '' + this._currentPage).classList.add('pagination-page-active');

    this._container.dataset.page = this._currentPage;
    
    // console.log('in refreshPaginationMarkup');
    // console.log('Current page', this._currentPage);
    // console.log('this', this);
  }

  renderPagination() {
    const _container = document.body; // remove when markup ready;
    _container.append(this._markup);
  }

  moveToPage(newPage, _totalPages = this._totalPages) {
    this._currentPage = newPage;
    this._totalPages = _totalPages;
    this.refreshMap();
    this.refreshPaginationMarkup();
    this.renderPagination();

    // console.log('in moveToPage')
    // console.log(this);
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