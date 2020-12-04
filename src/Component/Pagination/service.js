export const goToPage = ({page, setPage, data}) => {
    let newPage = { ...page }
    let { last_page, active } = newPage.pagination;

    if (newPage.PagingPage === 0 || newPage.PagingPage === null || newPage.PagingPage === '' || newPage.PagingPage === undefined) {
      return false;
    }

    if (newPage.PagingPage > last_page) {
        newPage.notifPaging = true
        setPage(newPage)
    }

    if (this.props.goto) {
      this.props.goto(newPage.PagingPage);
    } else {
        newPage.pagination = {...newPage.pagination}
        active  = newPage.PagingPage
        setPage(newPage)
    }
  };

export const numberCheck = (e) => {
    var tmpChar = e.key;
    if (!/^[0-9]+$/.test(e.key)) {
      e.preventDefault()
    }
  }
