/**
 * Checks if the provided DUI (Documento Unico de Identidad) is valid according to the El Salvador format.
 */
export interface ValidationResult {
  /**
   * Indicates whether the DUI is valid.
   */
  isValid: boolean;
  /**
   * An optional error message in case the DUI is invalid.
   */
  errorMessage?: string;
}

/**
 * Asynchronously validates a DUI (Documento Unico de Identidad) from El Salvador.
 *
 * @param dui The DUI to validate.
 * @returns A promise that resolves to a ValidationResult object containing the validation status and error message.
 */
export async function validateDui(dui: string): Promise<ValidationResult> {
  // TODO: Implement this by calling an API, or implement the logic here.
  const duiRegex = /^\d{8}-\d$/;
  const isValid = duiRegex.test(dui);

  if (!isValid) {
    return {
      isValid: false,
      errorMessage: 'Invalid DUI format. Must be ########-#.',
    };
  }

  return {
    isValid: true,
  };
}
