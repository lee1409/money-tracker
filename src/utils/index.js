export function createUUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

/**
 * Given amount and overspent, give a list
 * @param {Number} amount
 * @param {Boolean} isOverspent
 * @returns {[[String, Number]*]} array
 */
export function getRange(amount, isOverspent) {
  amount = Number(amount);
  if (isOverspent) {
    const arr = [0.1, 0.2, 0.4];
    return [
      [
        `$${amount.toFixed(2)} - $${(amount + amount * arr[0]).toFixed(2)}`,
        arr[0],
      ],
      [
        `$${(amount + amount * arr[0]).toFixed(2)} - $${(
          amount +
          amount * arr[1]
        ).toFixed(2)}`,
        arr[1],
      ],
      [
        `${isOverspent ? ">" : "<"} $${(amount + amount * arr[2]).toFixed(2)}`,
        arr[2],
      ],
    ];
  } else {
    const arr = [-0.1, -0.2, -0.4];
    return [
      [
        `$${(amount + amount * arr[0]).toFixed(2)} - $${amount.toFixed(2)}`,
        arr[0],
      ],
      [
        `$${(amount + amount * arr[1]).toFixed(2)} - $${(
          amount +
          amount * arr[0]
        ).toFixed(2)}`,
        arr[1],
      ],
      [
        `${isOverspent ? ">" : "<"} $${(amount + amount * arr[2]).toFixed(2)}`,
        arr[2],
      ],
    ];
  }
}
