[ESLint Official DOcs](https://eslint.org/#:~:text=in%20your%20JavaScript%20code.%20ESLint%20statically%20analyzes,as%20part%20of%20your%20continuous%20integration%20pipeline.)

Why Use ESLint?

- Detects Potential Bugs: Identifies syntax errors, unused variables, improper variable usage, and logic issues early in the development cycle, reducing runtime errors.
- Enforces Coding Standards: Ensures a consistent coding style across a team (e.g., indentation, semicolon usage, spacing), which improves readability and maintainability.
- Improves Best Practices: Encourages the use of modern JavaScript syntax and safer coding patterns (e.g., suggesting === over ==).
- Pluggable and Customizable: Every rule is a plugin, allowing developers to define their own rules or use existing community configurations, such as for React or TypeScript.
- Automated Fixes: Many issues identified, particularly stylistic ones, can be automatically fixed by running ESLint with the --fix option.

რა განსხვავებაა typescript კონფიგურაციასა და eslint კონფიგურაციას შორის?
რატომ მჭირდება ორივე? typescript-ით ხომ შემიძლია ვუთხრა ჩემ typescript-ის კოდს რა წესებს მიყვეს? მაგალითად არ შეიძლებოდეს გამოვიყენო any, eslint რაღაში მჭირდება?

პასუხი:
typescript-ის კონფიგურაციით შეგიძლია მხოლოდ typescript-ის ტიპებთან დაკავშირებული რაღაცეების კონფიგურაცია მაგრამ eslint-ით შეგიძლია კოდი გააწითლო თუ ცვლადი შექმენი და არსად იყენებ. წესი -> [no-unused-vars](https://eslint.org/docs/latest/rules/no-unused-vars)
მაგალითად:
const name = "jora";

და თუ ამ ცვლადს არარსად იყენებ შეგიძლია eslint-ის კონფიგურაცაში გეწეროს წესი რომელიც ამას გამცნობს. "ჰეი აქ ცვლადი გაქ შექმნილი რომელსაც არსად იყენებ და ჯობია წაშალო"

javascript-ისთვის რეკომენდირებული წესები: [წესები](https://eslint.org/docs/latest/rules)

ზოგადი სტანდარტები რომელიც გინდა რომ დაცული იყოს შეგიძლია უთხრა eslint-ით.

eslint-ის კონფიგურაცია გამოიყურება ასე:
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },

    {
    	rules: {
    		"no-unused-vars": "warn",
    		"no-undef": "warn",
    	},
    },

]);

- files: ["**/*.js"] --> ეს ნიშნავს შეამოწმე ყველა ფილე რომელიც მთავრდება .js-ით ანყ ყველა ჯს ფაილი.

- plugins: { js } --> ეს არის package (import js from "@eslint/js";) სადაცგაწერილია რეკომენდირებული წესები. უამრავი წესი რომელიც ზოგადად მიჩნელია რეკომენდირებულად ჯავასკრიპტის კოდის წერისდროს პროექტში.

- extends: ["js/recommended"] ეს ნიშნავს რომ ვიყენებ ამ რეკომენდაციებს რომლებიც ჯს პაკიჯშია.

- rules: {
  "no-unused-vars": "warn",
  "no-undef": "warn",
  },
  ეს ნიშნავს რომ რეკომედნირებულ წესებში კი არის რო error თუ ცვლადს ქმნი და არ იყენებ მარა მე ეგ წესი არ მომწონს და ჩვენ კოდშ მინდა რომ warning იყოს და არა error. ანუ მაჩვენებს warning-ს რომ შენ ცვლადს არ იყენებ მარა პროექტს გამაბილდინებს

ახლა ჩვენ პროექტს რაც შეეხება.
ჩვენი პროექტი იქნება Typescript-ზე დაწერილი და გვჭირდება არა javascript-ის არამედ Typscript-ის წესები. ეს წესები ჩვენით რომარ შევქმნათ არსებობს უკვე დაწერილი რეკომენდირებული წესები, რომელიც არსებობს typescript-eslint package-ში და ჩვენ უბრალოდ დაგვჭირდება დავაინსტალიროთ. აგრამ აგრეთვე დაგვჭირდება შემდეგი package-ები რომ eslint გავუშვათ გამოვიყენოთ და მან თავისი საქმე გააკეთოს.

- eslint
- @eslint/js (ჯავასცრიპტის რეცომენდაციები როგორებიცაა მაგალითად გამოიყენენ arrow ფუნქცია მუშაობს typescript-ისთვისაც)
- typescript
- typescript-eslint (აქ უკვე typescript-ისთვის შესაფერისი წესებია)

[Official Documentation of Typescript ESLint Config](https://typescript-eslint.io/getting-started/)

1.  STEP
    `pnpm init`
    `pnpm add --save-dev eslint @eslint/js typescript typescript-eslint`

2.  STEP
    create eslint.config.mjs
    // @ts-check

        import eslint from '@eslint/js';
        import { defineConfig } from 'eslint/config'; -->ეს არის ფუნქცია რომელიც პარამეტრად იღებს წესებს რომლებიც გინდა eslint-მა შეამოწმოს შენ კოდში თუ იცავ.
        import tseslint from 'typescript-eslint'; // აქედან ვიღებთ typescript-ისთვის რეკომენდირებულ წესებს

        export default defineConfig(
            eslint.configs.recommended,
            tseslint.configs.recommended,
            {
        files: ['**/*.ts'], //მითითებული წესებით შეამოწმოს ყველა typescript ფაილი
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json', // გამოიყენოს typescript-ის კონფიგურაციაც რომ ამ წესებითაც შეამოწმოს კოდი.
            },
        },

    }
    );
