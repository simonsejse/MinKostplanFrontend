export function calculateAgeFromBirthDate(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const truncateText = (str, max) => {
  return str.length > max ? str.substring(0, max - 3) + '...' : str;
};
