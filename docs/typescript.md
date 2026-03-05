Type-Aware Linting: Rules that check for type errors or advanced TypeScript features require parserOptions.project to point to your tsconfig.json to function correctly.
Project Structure: It tells the parser which files are included in your project.
Performance: It allows the parser to understand the project structure once, rather than parsing files individually

rules for typescript config
https://www.typescriptlang.org/tsconfig/

- [allowUnreachableCode](https://www.typescriptlang.org/tsconfig/#allowUnreachableCode)
  function fn(n: number) {
  if (n > 5) {
  return true;
  } else {
  return false;
  }
  return true; // so code never reaches at this place so the continue does not make sence
  Unreachable code detected.
  }

- [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig/#exactOptionalPropertyTypes)
  interface UserDefaults {
  // The absence of a value represents 'system'
  colorThemeOverride?: "dark" | "light";
  }
  with one look colorThemeOverride? can be undefined as well since it is optional property
  so theme.colorThemeOverride may not exists on the theme object but with that type rule we are saying that if it exists it must be "dark" or "light" so when you are accessing you first must have checked that it exists in the theme
  if (theme.hasOwnProperty(colorThemeOverride )){
  then you know it is one of the option and you can not assign theme.colorThemeOverride = undefined
  }

- [noImplicitAny](https://www.typescriptlang.org/tsconfig/#noImplicitAny)
  in the code every variable must have type and it should not be any

- [strict](https://www.typescriptlang.org/tsconfig/#strict)
