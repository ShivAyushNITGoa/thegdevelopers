import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Fills in a form field with the given value
 * @param fieldName The name or label of the field
 * @param value The value to fill in
 */
export const fillField = async (fieldName: string, value: string) => {
  const field = screen.getByLabelText(fieldName) || 
                screen.getByPlaceholderText(fieldName) || 
                screen.getByRole('textbox', { name: fieldName });
  
  await userEvent.clear(field);
  await userEvent.type(field, value);
  
  return field;
};

/**
 * Selects an option from a select field
 * @param fieldName The name or label of the field
 * @param optionText The text of the option to select
 */
export const selectOption = async (fieldName: string, optionText: string) => {
  const selectField = screen.getByLabelText(fieldName) || 
                      screen.getByRole('combobox', { name: fieldName });
  
  await userEvent.click(selectField);
  const option = screen.getByRole('option', { name: optionText });
  await userEvent.click(option);
  
  return selectField;
};

/**
 * Checks or unchecks a checkbox
 * @param fieldName The name or label of the checkbox
 * @param check Whether to check or uncheck the checkbox
 */
export const toggleCheckbox = async (fieldName: string, check: boolean) => {
  const checkbox = screen.getByLabelText(fieldName) || 
                   screen.getByRole('checkbox', { name: fieldName });
  
  if ((checkbox as HTMLInputElement).checked !== check) {
    await userEvent.click(checkbox);
  }
  
  return checkbox;
};

/**
 * Submits a form
 * @param submitButtonText The text of the submit button
 */
export const submitForm = async (submitButtonText: string = 'Submit') => {
  const submitButton = screen.getByRole('button', { name: submitButtonText });
  await userEvent.click(submitButton);
  
  return submitButton;
};

/**
 * Waits for form validation errors to appear
 * @param errorMessage The error message to wait for
 */
export const waitForValidationError = async (errorMessage: string) => {
  await waitFor(() => {
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
};

/**
 * Fills in a complete form with the given values
 * @param formData An object mapping field names to values
 */
export const fillForm = async (formData: Record<string, string>) => {
  for (const [fieldName, value] of Object.entries(formData)) {
    await fillField(fieldName, value);
  }
};

/**
 * Waits for a form to be submitted successfully
 * @param successMessage The success message to wait for
 */
export const waitForFormSuccess = async (successMessage: string) => {
  await waitFor(() => {
    expect(screen.getByText(successMessage)).toBeInTheDocument();
  });
}; 