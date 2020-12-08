class FormValidator {
    constructor(validSelector, element) {
        this.formSelector = validSelector.formSelector;
        this.inputSelector = validSelector.inputSelector;
        this.submitButtonSelector = validSelector.submitButtonSelector;
        this.inactiveButtonClass = validSelector.inactiveButtonClass;
        this.inputErrorClass = validSelector.inputErrorClass;
        this.errorClass = validSelector.errorClass;
        this.element = element;
    }

    enableValidation(openButton) {
        this.element.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners(openButton)
    }

    _setEventListeners(openButton) {
        const inputList = Array.from(this.element.querySelectorAll(this.inputSelector));
        const buttonElement = this.element.querySelector(this.submitButtonSelector);
        openButton.addEventListener('click', () => {
            this._validatePopup()
        })
        this._toggleButton(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._inputValidity(this.element, inputElement);
                this._toggleButton(inputList, buttonElement);
            });
        });
    };

    _validatePopup() {
        const buttonElement = this.element.querySelector(this.submitButtonSelector);
        const inputList = Array.from(this.element.querySelectorAll(this.inputSelector));
        this._toggleButton(inputList, buttonElement);
    }

    _toggleButton = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    _showError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
    }

    _hideError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
    }

    _inputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideError(formElement, inputElement);
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
}

export default FormValidator