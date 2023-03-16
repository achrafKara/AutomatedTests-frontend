import Xregexp from 'xregexp';

const patterns = {
  url: '^[http[s]?:\\/\\/|(www\\.)]{0,1}([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])(\\.([a-zA-Z]{2,6})+)(\\/(.)*)?(\\?(.)*)?$',
};

const Validator = (field, val) => {
  let vld = true;

  switch (field) {
    case 'email':
      vld = Xregexp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$').test(val)
        && val.length > 4
        && val.length < 101;
      break;

    case 'code':
      vld = Xregexp('^[0-9]{6}$').test(val);
      break;

    case 'url':
      vld = Xregexp(patterns.url).test(val);
      break;

    case 'username':
      vld = Xregexp('^[\\p{L}]+[\\p{L}\\p{N}_-]+$').test(val)
        && val.length > 4
        && val.length < 21;
      break;

    case 'name':
      vld = Xregexp('^[\\p{L}]+[\\p{L} ]+$').test(val)
        && val.length > 4
        && val.length < 51;
      break;

    case 'pw':
      vld = val.length > 7 && val.length < 31;
      break;

    default:
      break;
  }

  if (!val) vld = true;

  return vld;
};

export default Validator;
