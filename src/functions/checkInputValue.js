export function checkInputValue(value, name) {
  if (name === "isAdmin") return true;
  if (value.length === 0) {
    return name + " should not be empty";
  }

  if (/\s/.test(value)) {
    return name + " should not contain spaces";
  }

  if (name === "email") {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(value)) {
      return name + " should be a valid email address";
    }
  }

  const validPattern = /^[A-Za-z0-9!@#$%^&*()_+={}\\[\]:;"'<>,.?\\/|\\`~\\-]*$/;
  if (!validPattern.test(value)) {
    return (
      name +
      " should only contain Latin letters, numbers, and special characters"
    );
  }

  if (name === "password" && value.length < 8) {
    return "Password should be at least 8 characters long";
  }


  return true;
}
