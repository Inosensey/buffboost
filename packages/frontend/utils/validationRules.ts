import FormValidation from "./validation";

export const signUpValidationRules = {
  firstName: (value: string) =>
    FormValidation({ stateName: "firstName", value }),
  lastName: (value: string) => FormValidation({ stateName: "lastName", value }),
  email: (value: string) => FormValidation({ stateName: "email", value }),
  username: (value: string) => FormValidation({ stateName: "username", value }),
  password: (value: string) => FormValidation({ stateName: "password", value }),
};
