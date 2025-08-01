import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [dinerForms, setDinerForms] = useState([]);

  const addDinerForm = (newForm) => {
    setDinerForms((prev) => [...prev, newForm]);
  };

  const clearDinerForms = () => {
    setDinerForms([]);
  };

  return (
    <FormContext.Provider value={{ dinerForms, addDinerForm, setDinerForms, clearDinerForms }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);