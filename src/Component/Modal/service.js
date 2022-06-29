
export const ProgressBarReset = async ({ resetConfirmation }) => {
    let i = 0;
    let id;
    if (i === 0) {
        i = 1;
        const element = document.getElementById('progressBar');
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
        const element = document.getElementById('progressBar');
        if (element) {
            let width = 1;
            const frame = () => {
                if (width >= 120) {
                    clearInterval(id);
                    i = 0;
                    setModal(false);
                    switch (status) {
                        case 'sukses':
                            exit();
                            break;
                        case 'loos':
                            back()
                            break;
                    }
                } else {
                    width += 1;
                    element.style.width = `${width}%`;
                }
            }
            id = setInterval(frame, 130);
        }
    }
}