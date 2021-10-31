export const getLocalStorageList = (listType) => {
  return JSON.parse(localStorage.getItem(listType)) || [];
};

export const getLocalStorageDict = (listType) => {
  return JSON.parse(localStorage.getItem(listType)) || {};
};

export const saveLocalStorageList = (listType, newList) => {
  localStorage.setItem(listType, JSON.stringify(newList));
};

export const updateSelectedRelationship = (parentId, childId, selectedItemsDict) => {
  selectedItemsDict[`${parentId}`] = childId;
  localStorage.setItem("selectedItems", JSON.stringify(selectedItemsDict));
};

export const filterListItems = (itemsList, filterType, filterValue) => {
  switch (filterType) {
    case "parentId":
      return itemsList.filter((i) => [filterValue].includes(i.parentId));
    case "listType":
      return itemsList.filter((i) => [filterValue].includes(i.itemType));
    case "id":
      return itemsList.filter((i) => [filterValue].includes(i.id));
  }
};
