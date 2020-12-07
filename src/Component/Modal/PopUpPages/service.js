export const closeModal = ({page, setPage}) => {
    let newPage = {...page}
    newPage.notifPaging = false
    setPage(newPage)
}
export const showModal = ({page, setPage}) => {
    let newPage = {...page}
    newPage.notifPaging = true
    setPage(newPage)
}