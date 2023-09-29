import { Answer } from "../components/Pages/Form";
import { items } from "../services/data.json";


const validateAnswer = (answer: Answer) => {
    const { name, phoneNumber, startDate, preferredLanguage, howFound, newsletter_subscription } = answer;

    // Initialize errors object.
    const errors = {
        nameError: "",
        phoneNumberError: "",
        startDateError: "",
        preferredLanguageError: "",
        howFoundError: "",
        newsletter_subscription: ""
    };

    const requiredFieldsErrors = {
        nameError: "",
        phoneNumberError: "",
        preferredLanguageError: "",
        howFoundError: ""
    };

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    const preferredLanguageOptions = [];
    for (let option of items[3].options as any) {
        preferredLanguageOptions.push(option.value)
    };

    const howFoundOptions = [];
    for (let option of items[4].options as any) {
        howFoundOptions.push(option.value);
    };


    // * All the properties, but "newsletter_subscription", MUST be type "string". Handle these scenerarios just in case.

    if (typeof name !== "string") {
        errors.nameError = "Formato inválido, intente de nuevo por favor.";
    };
    if (typeof phoneNumber !== "string") {
        errors.phoneNumberError = "Formato inválido, intente de nuevo por favor.";
    };
    // OPTIONAL: Only add an error if the date isn't null or an empty string and if it's not a string at the same time.
    if (startDate !== null && typeof startDate !== "string") {
        errors.startDateError = "Formato inválido, intente de nuevo por favor.";
    } else if (startDate !== null && typeof startDate === "string") {
        // If Start date isn't null but a a string, then it must match the format YYYY/MM/DD.
        if (startDate && !dateRegex.test(startDate)) {
            errors.startDateError = "Ingrese una fecha válida";
        }
    };
    if (typeof preferredLanguage !== "string") {
        errors.preferredLanguageError = "Formato inválido, intente de nuevo por favor.";
    };
    if (typeof howFound !== "string") {
        errors.howFoundError = "Formato inválido, intente de nuevo por favor.";
    };
    // OPTIONAL: Only add an error if the newsletter_subscription isn't null and boolean at the same time.
    if (newsletter_subscription !== null && typeof newsletter_subscription !== "boolean") {
        errors.newsletter_subscription = "Formato inválido, intente de nuevo por favor.";
    };


    // Name length must to be longer than 0, but shorter than 50.
    if (!name) requiredFieldsErrors.nameError = "Este campo es obligatorio";
    if (name && (name.length < 2 || name.length > 50)) {
        errors.nameError = "Confirma que hayas ingresado el nombre correctamente.";
    };

    // Phone number length must be longer than 4, but shorter than 20.
    if (!phoneNumber) requiredFieldsErrors.phoneNumberError = "Este campo es obligatorio";
    if (phoneNumber && (phoneNumber.length < 4 || phoneNumber.length > 20)) {
        errors.phoneNumberError = "Ingrese un número válido";
    };

    // Preferred language must be one of: "english", "spanish", "french", "german".
    if (!phoneNumber) requiredFieldsErrors.preferredLanguageError = "Este campo es obligatorio";
    if (preferredLanguage && !preferredLanguageOptions.includes(preferredLanguage)) {
        errors.preferredLanguageError = "Elija una de las opciones válidas";
    };

    // How found must be one of: "friends", "online_search", "advertisement".
    if (!phoneNumber) requiredFieldsErrors.howFoundError = "Este campo es obligatorio";
    if (howFound && !howFoundOptions.includes(howFound)) {
        errors.howFoundError = "Elija una de las opciones válidas";
    };

    return {
        errors, requiredFieldsErrors
    };
};


export default validateAnswer;