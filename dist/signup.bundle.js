/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./pages/sign-up/styles.css"
/*!**********************************!*\
  !*** ./pages/sign-up/styles.css ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://online-zoo/./pages/sign-up/styles.css?\n}");

/***/ },

/***/ "./config/configuration.ts"
/*!*********************************!*\
  !*** ./config/configuration.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   configuration: () => (/* binding */ configuration)\n/* harmony export */ });\nconst configuration = {\n    apiUrl: 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod',\n};\n\n\n//# sourceURL=webpack://online-zoo/./config/configuration.ts?\n}");

/***/ },

/***/ "./pages/sign-up/data-access/sing-up-api-service.ts"
/*!**********************************************************!*\
  !*** ./pages/sign-up/data-access/sing-up-api-service.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SignUpApiService: () => (/* binding */ SignUpApiService)\n/* harmony export */ });\nclass SignUpApiService {\n    constructor(configuration) {\n        this.configuration = configuration;\n    }\n    async signUp(registerRequestBody) {\n        try {\n            const response = await fetch(`${this.configuration.apiUrl}/auth/register`, {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json',\n                },\n                body: JSON.stringify(registerRequestBody),\n            });\n            if (!response.ok) {\n                const failure = (await response.json());\n                return { error: failure.error };\n            }\n            const success = (await response.json());\n            return success.data;\n        }\n        catch (error) {\n            console.log(error);\n            return { error: 'Internal server error' };\n        }\n    }\n}\n\n\n//# sourceURL=webpack://online-zoo/./pages/sign-up/data-access/sing-up-api-service.ts?\n}");

/***/ },

/***/ "./pages/sign-up/display-services/sign-in-form-handler-service.ts"
/*!************************************************************************!*\
  !*** ./pages/sign-up/display-services/sign-in-form-handler-service.ts ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SignInDisplayService: () => (/* binding */ SignInDisplayService)\n/* harmony export */ });\nclass SignInDisplayService {\n    constructor() {\n        this.signInFormButton = null;\n        this.emailInput = null;\n        this.passwordInput = null;\n    }\n    async initialzie() {\n        this.signInFormButton = document.querySelector('#signinBtn');\n        this.emailInput = document.querySelector('#emailInput');\n        this.passwordInput = document.querySelector('#passwordInput');\n        await Promise.resolve();\n        this.addEventListerSignInForm();\n    }\n    addEventListerSignInForm() {\n        if (!this.signInFormButton || !this.emailInput || !this.passwordInput) {\n            return;\n        }\n        this.signInFormButton.addEventListener('click', () => {\n            const email = this.emailInput?.value;\n            const password = this.passwordInput?.value;\n            const isEmailValid = this.validateEmail(email);\n            const isPasswordValid = this.validatePassword(password);\n            if (!isEmailValid || !isPasswordValid) {\n                return;\n            }\n        });\n    }\n    validateEmail(email) {\n        if (email === undefined) {\n            return false;\n        }\n        if (email === '') {\n            return false;\n        }\n        return true;\n    }\n    validatePassword(password) {\n        if (password === undefined) {\n            return false;\n        }\n        if (password === '') {\n            return false;\n        }\n        return true;\n    }\n}\n\n\n//# sourceURL=webpack://online-zoo/./pages/sign-up/display-services/sign-in-form-handler-service.ts?\n}");

/***/ },

/***/ "./pages/sign-up/display-services/sign-up-form-handler-service.ts"
/*!************************************************************************!*\
  !*** ./pages/sign-up/display-services/sign-up-form-handler-service.ts ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SignUpDisplayService: () => (/* binding */ SignUpDisplayService)\n/* harmony export */ });\nclass SignUpDisplayService {\n    constructor(signUpApiService, localStorageService, locationService) {\n        this.signUpApiService = signUpApiService;\n        this.localStorageService = localStorageService;\n        this.locationService = locationService;\n        this.signUpFormButton = null;\n        this.emailInput = null;\n        this.passwordInput = null;\n        this.loginInput = null;\n        this.nameInput = null;\n        this.showErrorDiv = null;\n    }\n    async initialzie() {\n        this.signUpFormButton = document.querySelector('#signupBtn');\n        this.emailInput = document.querySelector('#emailInput');\n        this.passwordInput = document.querySelector('#passwordInput');\n        this.loginInput = document.querySelector('#loginInput');\n        this.nameInput = document.querySelector('#nameInput');\n        this.showErrorDiv = document.querySelector('#show-error');\n        await Promise.resolve();\n        this.addEventListerSignUpForm();\n    }\n    addEventListerSignUpForm() {\n        if (!this.signUpFormButton || !this.emailInput || !this.passwordInput) {\n            return;\n        }\n        this.signUpFormButton.addEventListener('click', () => {\n            this.hideError();\n            const email = this.emailInput?.value;\n            const password = this.passwordInput?.value;\n            const login = this.loginInput?.value;\n            const name = this.nameInput?.value;\n            const isEmailValid = this.validateEmail(email);\n            const isPasswordValid = this.validatePassword(password);\n            const isValidLogin = this.validateLogin(login);\n            const isValidName = this.validateName(name);\n            if (!isEmailValid || !isPasswordValid || !isValidLogin || !isValidName) {\n                return;\n            }\n            void this.sendSignUpRequest({ email, password, login, name });\n        });\n    }\n    async sendSignUpRequest({ email, password, login, name }) {\n        const response = await this.signUpApiService.signUp({\n            email,\n            password,\n            login,\n            name,\n        });\n        if (this.isFailure(response)) {\n            this.showFormError(response.error);\n        }\n        else {\n            this.localStorageService.add('accessToken', response.access_token);\n            this.localStorageService.add('user', response.user);\n            this.locationService.navigateTo('./landing.html');\n        }\n    }\n    isFailure(response) {\n        return 'error' in response;\n    }\n    showFormError(error) {\n        if (!this.showErrorDiv) {\n            return;\n        }\n        this.showErrorDiv.innerHTML = error;\n    }\n    hideError() {\n        if (!this.showErrorDiv) {\n            return;\n        }\n        this.showErrorDiv.innerHTML = '';\n    }\n    validateEmail(email) {\n        if (typeof email !== 'string') {\n            return false;\n        }\n        if (email === '') {\n            return false;\n        }\n        return true;\n    }\n    validatePassword(password) {\n        if (typeof password !== 'string') {\n            return false;\n        }\n        if (password === '') {\n            return false;\n        }\n        return true;\n    }\n    validateLogin(login) {\n        if (typeof login !== 'string') {\n            return false;\n        }\n        if (login === '') {\n            return false;\n        }\n        return true;\n    }\n    validateName(name) {\n        if (typeof name !== 'string') {\n            return false;\n        }\n        if (name === '') {\n            return false;\n        }\n        return true;\n    }\n}\n\n\n//# sourceURL=webpack://online-zoo/./pages/sign-up/display-services/sign-up-form-handler-service.ts?\n}");

/***/ },

/***/ "./pages/sign-up/script.ts"
/*!*********************************!*\
  !*** ./pages/sign-up/script.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_services_authentication_state_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../shared/services/authentication-state-service */ \"./shared/services/authentication-state-service.ts\");\n/* harmony import */ var _shared_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../shared/services/authentication-service */ \"./shared/services/authentication-service.ts\");\n/* harmony import */ var _shared_services_location_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../shared/services/location-service */ \"./shared/services/location-service.ts\");\n/* harmony import */ var _shared_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../shared/services/local-storage-service */ \"./shared/services/local-storage-service.ts\");\n/* harmony import */ var _data_access_sing_up_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data-access/sing-up-api-service */ \"./pages/sign-up/data-access/sing-up-api-service.ts\");\n/* harmony import */ var _display_services_sign_in_form_handler_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./display-services/sign-in-form-handler-service */ \"./pages/sign-up/display-services/sign-in-form-handler-service.ts\");\n/* harmony import */ var _shared_services_page_lifecycle_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/services/page-lifecycle-service */ \"./shared/services/page-lifecycle-service.ts\");\n/* harmony import */ var _display_services_sign_up_form_handler_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./display-services/sign-up-form-handler-service */ \"./pages/sign-up/display-services/sign-up-form-handler-service.ts\");\n/* harmony import */ var _config_configuration__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../config/configuration */ \"./config/configuration.ts\");\n\n\n\n\n\n\n\n\n\nclass AuthenticationPage extends _shared_services_page_lifecycle_service__WEBPACK_IMPORTED_MODULE_6__.PageLifeCycle {\n    constructor(signUpDisplayService, signInDisplayService, authenticationService, authenticationStateService, locationService) {\n        super();\n        this.signUpDisplayService = signUpDisplayService;\n        this.signInDisplayService = signInDisplayService;\n        this.authenticationService = authenticationService;\n        this.authenticationStateService = authenticationStateService;\n        this.locationService = locationService;\n    }\n    async onWindowLoad() {\n        this.authenticationService.initialize();\n        if (this.authenticationStateService.getAuthState() === true) {\n            this.locationService.navigateTo('./landing.html');\n        }\n        await this.signUpDisplayService.initialzie();\n        void this.signInDisplayService.initialzie();\n    }\n}\nconst localStorageService = new _shared_services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__.LocalStorageService();\nconst locationService = new _shared_services_location_service__WEBPACK_IMPORTED_MODULE_2__.LocationService();\nconst authenticationStateService = new _shared_services_authentication_state_service__WEBPACK_IMPORTED_MODULE_0__.AuthenticationStateService();\nconst authenticationService = new _shared_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService(localStorageService, authenticationStateService);\nconst signUpApiService = new _data_access_sing_up_api_service__WEBPACK_IMPORTED_MODULE_4__.SignUpApiService(_config_configuration__WEBPACK_IMPORTED_MODULE_8__.configuration);\nconst signUpDisplayService = new _display_services_sign_up_form_handler_service__WEBPACK_IMPORTED_MODULE_7__.SignUpDisplayService(signUpApiService, localStorageService, locationService);\nconst signInDisplayService = new _display_services_sign_in_form_handler_service__WEBPACK_IMPORTED_MODULE_5__.SignInDisplayService();\nnew AuthenticationPage(signUpDisplayService, signInDisplayService, authenticationService, authenticationStateService, locationService);\n\n\n//# sourceURL=webpack://online-zoo/./pages/sign-up/script.ts?\n}");

/***/ },

/***/ "./shared/services/authentication-service.ts"
/*!***************************************************!*\
  !*** ./shared/services/authentication-service.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthenticationService: () => (/* binding */ AuthenticationService)\n/* harmony export */ });\nclass AuthenticationService {\n    constructor(localStorageService, authenticationStateService) {\n        this.localStorageService = localStorageService;\n        this.authenticationStateService = authenticationStateService;\n    }\n    initialize() {\n        const accessToken = this.localStorageService.get('accessToken');\n        const user = this.localStorageService.get('user');\n        if (!accessToken || !user) {\n            this.authenticationStateService.setAuthState(false);\n            this.authenticationStateService.setCurrentUser(undefined);\n            return;\n        }\n        this.authenticationStateService.setAuthState(true);\n        this.authenticationStateService.setCurrentUser(user);\n    }\n}\n\n\n//# sourceURL=webpack://online-zoo/./shared/services/authentication-service.ts?\n}");

/***/ },

/***/ "./shared/services/authentication-state-service.ts"
/*!*********************************************************!*\
  !*** ./shared/services/authentication-state-service.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthenticationStateService: () => (/* binding */ AuthenticationStateService)\n/* harmony export */ });\nclass AuthenticationStateService {\n    constructor() {\n        this.isAuthenticated = false;\n        this.currentUser = undefined;\n    }\n    setAuthState(isAuthed) {\n        this.isAuthenticated = isAuthed;\n    }\n    setCurrentUser(user) {\n        this.currentUser = user;\n    }\n    getAuthState() {\n        return this.isAuthenticated;\n    }\n    getCurrentUser() {\n        return this.currentUser;\n    }\n}\n\n\n//# sourceURL=webpack://online-zoo/./shared/services/authentication-state-service.ts?\n}");

/***/ },

/***/ "./shared/services/local-storage-service.ts"
/*!**************************************************!*\
  !*** ./shared/services/local-storage-service.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LocalStorageService: () => (/* binding */ LocalStorageService)\n/* harmony export */ });\nclass LocalStorageService {\n    add(key, value) {\n        localStorage.setItem(key, JSON.stringify(value));\n    }\n    get(key) {\n        const value = localStorage.getItem(key);\n        if (!value) {\n            return undefined;\n        }\n        return JSON.parse(value);\n    }\n    remove(key) {\n        localStorage.removeItem(key);\n    }\n}\n\n\n//# sourceURL=webpack://online-zoo/./shared/services/local-storage-service.ts?\n}");

/***/ },

/***/ "./shared/services/location-service.ts"
/*!*********************************************!*\
  !*** ./shared/services/location-service.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LocationService: () => (/* binding */ LocationService)\n/* harmony export */ });\nclass LocationService {\n    constructor() {\n        this.listeners = [];\n    }\n    onLocationChange(listener) {\n        this.listeners.push(listener);\n    }\n    updateSearchParams(paramKey, paramValue) {\n        const urlParams = new URLSearchParams(window.location.search);\n        urlParams.set(paramKey, paramValue);\n        const newUrl = window.location.pathname + '?' + urlParams.toString();\n        history.pushState({ [paramKey]: paramValue }, '', newUrl);\n        this.listeners.forEach((l) => l(paramKey, paramValue));\n    }\n    getCurrentParamValue(paramKey) {\n        const urlParams = new URLSearchParams(window.location.search);\n        const value = urlParams.get(paramKey);\n        return value;\n    }\n    navigateTo(url) {\n        window.location.href = url;\n    }\n}\n\n\n//# sourceURL=webpack://online-zoo/./shared/services/location-service.ts?\n}");

/***/ },

/***/ "./shared/services/page-lifecycle-service.ts"
/*!***************************************************!*\
  !*** ./shared/services/page-lifecycle-service.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PageLifeCycle: () => (/* binding */ PageLifeCycle)\n/* harmony export */ });\nclass PageLifeCycle {\n    constructor() {\n        window.addEventListener('load', (event) => {\n            void this.onWindowLoad(event)\n                .then(() => console.log('Page specific logic initialized'))\n                .catch((err) => console.error('Error during initialization', err));\n        });\n    }\n}\n\n\n//# sourceURL=webpack://online-zoo/./shared/services/page-lifecycle-service.ts?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./pages/sign-up/styles.css");
/******/ 	var __webpack_exports__ = __webpack_require__("./pages/sign-up/script.ts");
/******/ 	
/******/ })()
;