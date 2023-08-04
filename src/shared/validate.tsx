interface FData {
  [k: string]: string | number | null | undefined | FData;
}
type Rule<T> = {
  key: keyof T;
  message: string;
} & ({ type: 'required' } | { type: 'pattern'; regex: RegExp });
type Rules<T> = Rule<T>[];
export type { FData, Rule, Rules };

export const validate = <T extends FData>(formDate: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[];
  };
  const errors: Errors = {};
  rules.forEach((rule) => {
    const { key, type, message } = rule;
    const value = formDate[key];
    switch (type) {
      case 'required':
        if (value === null || value === undefined || value === '') {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      case 'pattern':
        if (value && !rule.regex.test(value.toString())) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      default:
        break;
    }
  });
  return errors;
};
export function hasError(errors: Record<string, string[]>) {
  // return Object.values(errors)
  // .reduce((result, value) => result + value.length, 0) > 0
  let result = false;
  for (let key in errors) {
    if (errors[key] && errors[key].length > 0) {
      result = true;
      break;
    }
  }
  return result;
}
