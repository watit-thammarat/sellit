import _ from 'lodash';

export default (name, form) => {
  let valid = true;
  const input = form[name];
  const { value, rules } = input;
  for (const rule in rules) {
    valid = valid && validateRule(rule, value, rules[rule], form);
  }
  input.valid = valid;
};

const validateRule = (rule, value, ruleValue, form) => {
  switch (rule) {
    case 'isRequired':
      return validateRequired(value);
    case 'isEmail':
      return validateEmail(value);
    case 'minLength':
      return validateMinLength(value, ruleValue);
    case 'confirmPass':
      return validateConfirmPass(value, form[ruleValue].value);
  }
};

const validateRequired = value => !_.isEmpty(value);

const validateEmail = value => {
  const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test(value);
};

const validateMinLength = (value, minLength) =>
  value.trim().length >= minLength;

const validateConfirmPass = (value, passwordValue) => value === passwordValue;
