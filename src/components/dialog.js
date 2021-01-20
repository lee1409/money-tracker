import React from "react";
import { Dialog, Portal, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateToday } from "../redux/actions";
import { getRange } from "../utils/index";

export default ({ visible, hideDialog, amount, isOverspent, ...item }) => {
  const range = getRange(amount, isOverspent);
  const dispatch = useDispatch();

  const handleButton = (index) => {
    let spentPercent = range[index][1];
    let result = Object.assign({}, item, {
      isOverspent,
      range: index,
      isCompleted: true,
      spentPercent,
      amount
    });
    dispatch(updateToday(result));
    hideDialog();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>How much you vary?</Dialog.Title>
        <Dialog.Actions
          style={{ justifyContent: "space-between", flexDirection: "column" }}
        >
          {range.map((text, index) => (
            <Button key={index} onPress={() => handleButton(index)}>
              {text[0]}
            </Button>
          ))}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
