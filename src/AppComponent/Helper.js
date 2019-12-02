import moment from 'moment';

export function formatDate(date) {
	if (date === null) { return "" };
	// if (moment(date).format("HH:mm:ss.SSS") !== "00:00:00.000") {
	// 	return moment(date).format("DD MMM YYYY h:mm A");
	// }
	return moment(date).format("DD MMM YYYY");
}