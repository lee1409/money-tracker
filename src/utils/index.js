export function createUUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

/**
 * Given amount and overspent, give a list
 * @param {Number} amount 
 * @param {Boolean} isOverspent
 */
export function getRange(amount, isOverspent) {

  if (isOverspent) {
    return [
      [`$${(amount * 0.01).toFixed(2)} - $${(amount * 0.1).toFixed(2)}`, amount * 0.01 ],
      [`$${(amount * 0.11).toFixed(2)} - $${(amount * 0.2).toFixed(2)}`, amount * 0.11],
      [`> $${(amount * 0.21).toFixed(2)}`, amount * 0.11],
    ];
  }
  return [
    [`$${(amount * 0.01).toFixed(2)} - $${(amount * 0.1).toFixed(2)}`, amount * 0.01 ],
    [`$${(amount * 0.11).toFixed(2)} - $${(amount * 0.2).toFixed(2)}`, amount * 0.11],
    [`> $${(amount * 0.21).toFixed(2)}`, amount * 0.11],
  ];
};