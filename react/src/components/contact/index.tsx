import ReactApollo from 'chefcompany.store-utils/reactApollo';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React, { FC, useContext, useEffect } from 'react';
import DangerousHTML from 'react-dangerous-html';
import FlexLayout from 'vtex.flex-layout/FlexLayout';
import { Spinner, ToastContext } from 'vtex.styleguide';
import CheckboxVtex from 'vtex.styleguide/Checkbox';
import { boolean, object, string } from 'yup';
import contactStyle from './contact-style.css';
import DOCUMENT_MUTATION from './document.gql';

const { useMutation } = ReactApollo;

interface ContactProps {
  submitText: string;
  beforeHtml: string;
  afterHtml: string;
  useTerms: boolean;
  checkedDefault: boolean;
  successMessage: string;
  terms: string;
  fullWidth: boolean;
  formTitle: string;
  title: string;
  entityAcronym?: string;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  acceptTerms: boolean;
}

type Field = {
  key: string;
  value: string;
};

const errorMessages = {
  min: 'El campo es demasiado corto',
  max: 'El campo es demasiado largo',
  required: 'El campo es requerido',
  email: 'Email inválido',
  terms: 'Debes aceptar los términos',
  unexpected: 'Ha ocurrido un error, inténtalo más tarde.'
};

const formSchema = object({
  name: string()
    .min(2, errorMessages.min)
    .max(50, errorMessages.max)
    .required(errorMessages.required),
  email: string()
    .email(errorMessages.email)
    .required(errorMessages.required),
  phone: string()
    .min(7, errorMessages.min)
    .max(50, errorMessages.max)
    .required(errorMessages.required),
  message: string()
    .min(5, errorMessages.min)
    .required(errorMessages.required),
  acceptTerms: boolean().isTrue(errorMessages.terms)
});

const Error: FC<any> = ({ children }) => {
  return <div className={contactStyle.contactFormError}>{children}</div>;
};

const ContactFormWrapper = (props: ContactProps) => {
  const [createDocument, { error }] = useMutation(DOCUMENT_MUTATION);
  const { showToast } = useContext(ToastContext);
  const submitText = props?.submitText;
  const beforeHtml = props?.beforeHtml;
  const afterHtml = props?.afterHtml;
  const useTerms = props?.useTerms;
  const checkedDefault = props?.checkedDefault;
  const successMessage = props?.successMessage;
  const terms = props?.terms;
  const title = props?.title;
  const fullWidth = props?.fullWidth;
  const formTitle = props?.formTitle;
  const entityAcronym = props?.entityAcronym || 'CO';
  const validationSchema = useTerms ? formSchema : formSchema.omit(['acceptTerms']);
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
    acceptTerms: checkedDefault
  };

  useEffect(() => {
    if (error) {
      showToast(errorMessages.unexpected);
      console.log('[ContactForm]: Error save document in MasterData:', error);
    }
  }, [error]);

  const onSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const fields = [
      { key: 'name', value: values.name },
      { key: 'email', value: values.email },
      { key: 'phone', value: values.phone },
      { key: 'message', value: values.message }
    ];

    await sendMasterData(fields);
    actions.resetForm();
  };

  const sendMasterData = async (fields: Field[]) => {
    try {
      await createDocument({
        variables: {
          acronym: entityAcronym,
          fields
        }
      });

      showToast(successMessage);
    } catch (err) {
      showToast(errorMessages.unexpected);
    }
  };

  return (
    <FlexLayout fullWidth={fullWidth} blockClass="promise-container">
      <div className={contactStyle.container_contact}>
        <div className={contactStyle.contactTitle}>{title}</div>
        {beforeHtml && (
          <div className={contactStyle.column_beforeHTML}>
            <DangerousHTML html={beforeHtml} tagName="div" />
          </div>
        )}
        <div className={contactStyle.column_formContact}>
          <div className={contactStyle.formTitle}>{formTitle}</div>

          <Formik {...{ initialValues, onSubmit, validationSchema }}>
            {({ handleChange, values, isSubmitting, isValid, errors }) => (
              <Form noValidate>
                <div className={contactStyle.inputGroupContact}>
                  <Field name="name" className={contactStyle.inputFieldContact} placeholder="Nombre" />
                  <ErrorMessage component={Error} name="name" />
                </div>
                <div className={contactStyle.inputGroupContact}>
                  <Field
                    name="email"
                    className={contactStyle.inputFieldContact}
                    type="email"
                    placeholder="Correo"
                  />
                  <ErrorMessage component={Error} name="email" />
                </div>
                <div className={contactStyle.inputGroupContact}>
                  <Field name="phone" className={contactStyle.inputFieldContact} placeholder="Celular" />
                  <ErrorMessage component={Error} name="phone" />
                </div>
                <div className={contactStyle.inputGroupContact}>
                  <Field
                    as="textarea"
                    name="message"
                    className={contactStyle.textareaFieldContact}
                    placeholder="Mensaje"
                  ></Field>
                  <ErrorMessage component={Error} name="message" />
                </div>
                {useTerms && (
                  <div className={contactStyle.inputGroupCheckContactWhitError}>
                    <div className={contactStyle.inputGroupCheckContact}>
                      <CheckboxVtex name="acceptTerms" checked={values.acceptTerms} onChange={handleChange} />
                      <div>
                        <DangerousHTML html={terms} tagName="div" />
                      </div>
                    </div>
                    <ErrorMessage component={Error} name="acceptTerms" />
                  </div>
                )}
                <div className={contactStyle.inputGroupContact}>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={contactStyle.primaryContactBtn}
                  >
                    {isSubmitting ? <Spinner color="#ffffff" size={16} /> : submitText}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {afterHtml && (
          <div className={contactStyle.column_afterHtml}>
            <DangerousHTML html={afterHtml} tagName="div" />
          </div>
        )}
      </div>
    </FlexLayout>
  );
};

ContactFormWrapper.defaultProps = {
  submitText: 'Enviar',
  beforeHtml: '',
  afterHtml: '',
  useTerms: false,
  checkedDefault: false,
  successMessage: 'Pronto nos pondremos en contacto.',
  title: 'Contáctanos',
  terms: '',
  fullWidth: false,
  formTitle: ''
};

ContactFormWrapper.getSchema = () => ({
  title: 'Contacto',
  type: 'object',
  properties: {
    fullWidth: {
      title: 'Full with',
      type: 'boolean',
      default: false
    },
    formTitle: {
      title: 'Form title',
      type: 'string',
      default: 'Escríbenos'
    },
    submitText: {
      title: 'Submit text',
      type: 'string',
      default: 'Enviar'
    },
    beforeHtml: {
      title: 'Before HTML',
      type: 'string',
      widget: {
        'ui:widget': 'textarea'
      }
    },
    afterHtml: {
      title: 'After HTML',
      type: 'string',
      widget: {
        'ui:widget': 'textarea'
      }
    },
    useTerms: {
      title: 'Show terms',
      type: 'boolean',
      default: true
    },
    terms: {
      title: 'Terms description (HTML)',
      type: 'string',
      default: '<div>Aceptar los “Términos y Condiciones” y “Acuerdo de privacidad”</div>',
      widget: {
        'ui:widget': 'textarea'
      }
    },
    checkedDefault: {
      title: 'Checked terms default state',
      type: 'boolean',
      default: false
    },
    successMessage: {
      title: 'Success message',
      type: 'string',
      default: 'Pronto nos pondremos en contacto.'
    },
    title: {
      title: 'Title',
      type: 'string',
      default: 'Contáctanos'
    }
  }
});

export default ContactFormWrapper;
