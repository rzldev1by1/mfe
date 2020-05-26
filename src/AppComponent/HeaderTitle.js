import React from 'react';
const HeaderTitle = (props) => {
    return (
        <React.Fragment>
            <div className="header-title fixed-top">
                <div className="container-fluid">
                    <div className="card">
                        <h2 className="mt-1 float-left">{props.title}</h2>
                        {props.button || null}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default HeaderTitle;