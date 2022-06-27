
export const ProgressBarReset = async ({ resetConfirmation }) => {
    let i = 0;
    if (i === 0) {
        i = 1;
        const element = await document.getElementById('progressBar');
        if (element) {
            let width = 1;
            const id = setInterval(frame, 150);
            function frame() {
                if (width >= 103) {
                    clearInterval(id);
                    i = 0;
                    resetConfirmation()
                } else {
                    width += 1;
                    element.style.width = `${width}%`;
                }
            }
        }
    }
}
export const ProgressBar = async ({ setModal, back, exit, status, }) => {
    let i = 0;
    if (i === 0) {
        i = 1;
        const element = await document.getElementById('progressBar');
        if (element) {
            let width = 1;
            const id = setInterval(frame, 130);
            function frame() {
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
        }
    }
}