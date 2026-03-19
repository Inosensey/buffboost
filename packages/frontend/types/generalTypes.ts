interface BuffInterface {
    name: string,
    emoji: string,
    price?: number,
    type: string,
    description: string,
    tagline: string,
}

interface headerInterface {
  [key: string]: {
    title: string;
    description: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string; 
}

interface validation {
  validationName?: string;
  valid: null | boolean;
  validationMessage: string;
}

interface formValidation {
  [key: string]: validation
}