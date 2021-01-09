export const setExportData = async ({ dispatch, data }) => {
  await dispatch({ type: 'EXPORT_DATA', data: data });
};
