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

const deleteObjectItemByValue = (Obj, val) => {
  for (var key in Obj) {
    if (Obj[`${key}`] == val) {
      delete Obj[`${key}`];
      return Obj;
    }
  }
};

export const deleteSelectedRelationship = (itemId, selectedItemsDict) => {
  const newSelectedItemsDict = deleteObjectItemByValue(selectedItemsDict, itemId);
  localStorage.setItem("selectedItems", JSON.stringify(newSelectedItemsDict));
};

export const filterListItems = (itemsList, filterType, filterValue) => {
  if (filterValue == undefined) {
    return [];
  }
  switch (filterType) {
    case "parentId":
      return itemsList.filter((i) => [filterValue].includes(i.parentId));
    case "listType":
      return itemsList.filter((i) => [filterValue].includes(i.itemType));
    case "id":
      return itemsList.filter((i) => [filterValue].includes(i.id));
  }
};
