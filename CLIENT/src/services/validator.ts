import { Answer } from "../components/Pages/Form/Form";
import { items } from "../services/data.json";


const validateAnswer = (answer: Answer) => {
    const { full_name, phone_number, start_date, preferred_language, how_found, newsletter_subscription } = answer;

    // Initialize errors object.
    const errors = {
        fullNameError: "",
        phoneNumberError: "",
        startDateError: "",
        preferredLanguageError: "",
        howFoundError: "",
        newsletterSubscriptionError: ""
    };

    const requiredFieldsErrors = {
        fullNameError: "",
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

    if (typeof full_name !== "string") {
        errors.fullNameError = "Formato inválido, intente de nuevo por favor.";
    };
    if (typeof phone_number !== "string" && phone_number !== undefined) {
        errors.phoneNumberError = "Formato inválido, intente de nuevo por favor.";
    };
    // OPTIONAL: Only add an error if the date isn't null or an empty string and if it's not a string at the same time.
    if (start_date !== null && typeof start_date !== "string") {
        errors.startDateError = "Formato inválido, intente de nuevo por favor.";
    } else if (start_date !== null && typeof start_date === "string") {
        // If Start date isn't null but a a string, then it must match the format YYYY/MM/DD.
        if (start_date && !dateRegex.test(start_date)) {
            errors.startDateError = "Ingrese una fecha válida.";
        }
    };
    if (typeof preferred_language !== "string") {
        errors.preferredLanguageError = "Formato inválido, intente de nuevo por favor.";
    };
    if (typeof how_found !== "string") {
        errors.howFoundError = "Formato inválido, intente de nuevo por favor.";
    };
    // OPTIONAL: Only add an error if the newsletter_subscription isn't null and boolean at the same time.
    if (newsletter_subscription !== null && typeof newsletter_subscription !== "boolean") {
        errors.newsletterSubscriptionError = "Formato inválido, intente de nuevo por favor.";
    };


    // Name length must to be longer than 0, but shorter than 50.
    if (!full_name) requiredFieldsErrors.fullNameError = "Este campo es obligatorio";
    if ((full_name.length < 2 || full_name.length > 50)) {
        errors.fullNameError = "Confirma que hayas ingresado el nombre correctamente.";
    };

    // Phone number length must be longer than 4, but shorter than 20.
    if (!phone_number) requiredFieldsErrors.phoneNumberError = "Este campo es obligatorio";
    if (phone_number === undefined || (phone_number && (phone_number.length < 4 || phone_number.length > 20))) {
        errors.phoneNumberError = "Ingrese un número válido";
    };

    // Preferred language must be one of: "english", "spanish", "french", "german".
    if (!preferred_language) requiredFieldsErrors.preferredLanguageError = "Este campo es obligatorio";
    if (preferred_language && !preferredLanguageOptions.includes(preferred_language)) {
        errors.preferredLanguageError = "Elija una de las opciones válidas";
    };

    // How found must be one of: "friends", "online_search", "advertisement".
    if (!how_found) requiredFieldsErrors.howFoundError = "Este campo es obligatorio";
    if (how_found && !howFoundOptions.includes(how_found)) {
        errors.howFoundError = "Elija una de las opciones válidas";
    };

    return {
        errors, requiredFieldsErrors
    };
};


export default validateAnswer;