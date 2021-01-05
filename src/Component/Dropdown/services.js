export const onChangeHandler = (selected, onChangeDropdown, setIsOpen) => {
  onChangeDropdown(selected);
  setIsOpen(false);
};
