import React from 'react';
import moment from 'moment';

import tab1Blue from 'assets/img/tab_1_blue@2x.png';
import tab1Grey from 'assets/img/tab_1_grey@2x.png';
import tab2Blue from 'assets/img/tab_2_blue@2x.png';
import tab2Grey from 'assets/img/tab_2_grey@2x.png';

function formatDate(date) {
	if (date === null) { return "" };
	// if (moment(date).format("HH:mm:ss.SSS") !== "00:00:00.000") {
	// 	return moment(date).format("DD MMM YYYY h:mm A");
	// }
	return moment(date).format("DD MMM YYYY");
}

function tab1() {
    return <img src={tab1Blue} width="26px" style={{ marginRight: "5px" }} alt="tab1Blue" />;
};

function tab1Inactive() {
    return <img src={tab1Grey} width="26px" style={{ marginRight: "5px" }} alt="tab1Grey" />;
}

function tab2() {
    return <img src={tab2Blue} width="26px" style={{ marginRight: "5px" }} alt="tab2Blue" />;
}

function tab2Inactive() {
    return <img src={tab2Grey} width="26px" style={{ marginRight: "5px" }} alt="tab2Grey" />;
}


export { formatDate, tab1, tab1Inactive, tab2, tab2Inactive };