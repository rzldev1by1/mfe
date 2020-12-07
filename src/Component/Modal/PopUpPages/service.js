export const closeModal = ({page, setPage}) => {
    const newPage = {...page}
    newPage.notifPaging = false
    setPage(newPage)
}
export const showModal = ({page, setPage}) => {
    const newPage = {...page}
    newPage.notifPaging = true
    setPage(newPage)
}