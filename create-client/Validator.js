const validate = (body) => {
    let isValid = true;
    let message;
    
    if (!body.dni || !body.name || !body.lastName || !body.birthday) {
        isValid = false;
        message = 'Please, complete all required properties.';
    }

    else if (isValidAge(body.birthday) === false) {
        isValid = false;
        message = 'Sorry, birthday or age is invalid.';
    }
    
    return {
        isValid,
        message
    }
}

function isValidAge(birthday) {
  const birthdayObj = new Date(birthday);
  
  if(isNaN(birthdayObj)) return false;
  
  const dateDiffInMs = Date.now() - birthdayObj.getTime();
  const dateDiffObj = new Date(dateDiffInMs);
  const age = Math.abs(dateDiffObj.getUTCFullYear() - 1970);
  
  if(age > 65) return false;
  
  return true;
}

module.exports = { validate };