import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [dinerForms, setDinerForms] = useState([]);

  const addDinerForm = (newForm) => {
    setDinerForms((prev) => [...prev, newForm]);
  };

  return (
    <FormContext.Provider value={{ dinerForms, addDinerForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);