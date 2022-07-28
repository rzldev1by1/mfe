export const closeModal = ({ page, setPage }) => {
    const newPage = { ...page }
    newPage.noticePaging = false
    setPage(newPage)
}
export const showModal = ({ page, setPage }) => {
    const newPage = { ...page }
    newPage.noticePaging = true
    setPage(newPage)
}