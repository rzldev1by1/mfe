
export const ProgressBarReset = async ({ resetConfirmation }) => {
    let i = 0;
    let id;
    if (i === 0) {
        i = 1;
        const element = await document.getElementById('progressBar');
        if (element) {
            let width = 1;
            const frame = () => {
                if (width >= 103) {
                    clearInterval(id);
                    i = 0;
                    resetConfirmation()
                } else {
                    width += 1;
                    element.style.width = `${width}%`;
                }
            }
            id = setInterval(frame, 150);
        }
    }
}
export const ProgressBar = async ({ setModal, back, exit, status, }) => {
    let i = 0;
    let id;
    if (i === 0) {
        i = 1;
        const element = await document.getElementById('progressBar');
        if (element) {
            let width = 1;
            const frame = () => {
                if (width >= 120) {
                    clearInterval(id);
                    i = 0;
                    setModal(false);
                    if (status === 'sukses') exit();
                    if (status === 'loos') back();
                } else {
                    width += 1;
                    element.style.width = `${width}%`;
                }
            }
            id = setInterval(frame, 130);
        }
    }
}