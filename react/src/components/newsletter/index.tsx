import { useState, useCallback, useMemo, useEffect, useContext } from 'react';
import Newsletter from './newsletter';
import SUBSCRIBE_NEWSLETTER from './subscribeNewsletter.gql';
import ReactApollo from 'chefcompany.store-utils/reactApollo';
import { ToastContext } from 'vtex.styleguide';

interface NewsletterProps {
  placeholderText: string;
  regex: string;
  errorEmailMessage: string;
  errorTermsMessage: string;
  terms: string;
  beforeHtml: string;
  afterHtml: string;
  submitText: string;
  useTerms: boolean;
  loading?: boolean;
  checkedDefault: boolean;
  default: boolean;
  defaultPosition: boolean;
  positions: string[];
  showDefaultInputError: boolean;
  onSubscribe?: (email: string) => void;
  successMessage: string;
  inputWithIcon: string;
  inputSize: number;
  buttonWithIcon: string;
  buttonWithIconSize: number;
}

const NewsLetterWrapper = ({
    placeholderText,
    regex,
    errorEmailMessage,
    errorTermsMessage,
    terms,
    afterHtml,
    beforeHtml,
    useTerms,
    loading,
    submitText,
    onSubscribe,
    checkedDefault,
    defaultPosition,
    positions,
    showDefaultInputError,
    successMessage,
    inputWithIcon,
    inputSize,
    buttonWithIcon,
    buttonWithIconSize
  }: NewsletterProps) => {

  const { showToast } = useContext(ToastContext);
  const [subscribe] = ReactApollo.useMutation(SUBSCRIBE_NEWSLETTER);
  const [email, setEmail] = useState<string>();
  const [check, setCheck] = useState<boolean>(checkedDefault);
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const [showEmailMessage, setShowEmailMessage] = useState<boolean>(false);
  const [showAcceptTermsMessage, setShowAcceptTermsMessage] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    setLocalLoading(loading)
    return () => setLocalLoading(false);
  }, [loading])

  useEffect(() => {
    if (showEmailMessage || showAcceptTermsMessage) setDisabled(true);
    return () => setDisabled(false);
  }, [showEmailMessage, showAcceptTermsMessage])

  const validateEmail = useCallback(() => {
    const validation = new RegExp(regex).test(email);
    console.log('validation', validation)
    setShowEmailMessage(!validation)
  }, [email]);

  const onChangeEmail = (e: any) => setEmail(e.target.value.trim())
  const onChangeTerms = () => {
    setCheck(!check);
    if (!check) setShowAcceptTermsMessage(false);
  }

  const onHandleSubscribe = async () => {
    if (onSubscribe) return onSubscribe(email);
    if (!email) setShowEmailMessage(true);
    if (useTerms && !check) return setShowAcceptTermsMessage(true);
    if (showEmailMessage) return;


    try {
      setLocalLoading(true);
      await subscribe({variables: { email }});
      setLocalLoading(false);
      showToast(successMessage);
      setEmail('');
    } catch(e) {
      setLocalLoading(false);
      showToast("Ha ocurrido un error, intenta más tarde");
    }
  }

  return useMemo(() => {
    return (
      <Newsletter
        submitText={submitText}
        onChangeEmail={onChangeEmail}
        email={email}
        errorEmailMessage={errorEmailMessage}
        errorTermsMessage={errorTermsMessage}
        terms={terms}
        afterHtml={afterHtml}
        beforeHtml={beforeHtml}
        showEmailMessage={showEmailMessage}
        showAcceptTermsMessage={showAcceptTermsMessage}
        useTerms={useTerms}
        check={check}
        onChangeTerms={onChangeTerms}
        loading={localLoading}
        onHandleSubscribe={onHandleSubscribe}
        placeholderText={placeholderText}
        positions={positions}
        defaultPosition={defaultPosition}
        validateEmail={validateEmail}
        disabled={disabled}
        showDefaultInputError={showDefaultInputError}
        inputWithIcon={inputWithIcon}
        inputSize={inputSize}
        buttonWithIcon={buttonWithIcon}
        buttonWithIconSize={buttonWithIconSize}
      />
    )
  }, [
    errorEmailMessage,
    errorTermsMessage,
    terms,
    afterHtml,
    beforeHtml,
    email,
    showEmailMessage,
    showAcceptTermsMessage,
    useTerms,
    check,
    localLoading,
    placeholderText,
    submitText,
    positions,
    defaultPosition,
    disabled,
    showDefaultInputError,
    inputWithIcon,
    inputSize
  ])
}

NewsLetterWrapper.defaultProps = {
  submitText: 'Suscríbete test',
  placeholderText: 'Ingresa tu correo',
  regex: '^[A-z0-9+_-]+(?:\.[A-z0-9+_-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?$',
  errorEmailMessage: 'Por favor ingrese un email válido.',
  errorTermsMessage: 'Pelase, accept terms',
  terms: '<div>Al comprar estarás aceptando el tratamiento de datos personales de acuerdo a la <a href="https://www.healthy-america.com.co/politica-de-tratamiento-de-datos-personales"> políticas de privacidad.</a></div>',
  beforeHtml: '<h2>SUSCRÍBETE</h2>',
  afterHtml: '',
  useTerms: true,
  checkedDefault: false,
  defaultPosition: true,
  positions: ['button', 'input', 'error' , 'terms', 'termsError'],
  showDefaultInputError: false,
  successMessage: "Se ha suscrito con éxito.",
  inputWithIcon: "hpa-chefcompany-mail",
  inputSize: 24,
  buttonWithIcon: "",
  buttonWithIconSize: 24,
}

NewsLetterWrapper.schema = {
  title: 'Newsletter custom',
  type: 'object',
  properties: {
    submitText: {
      title: 'Submit text',
      type: 'string',
      default: 'Suscríbeme'
    },
    placeholderText: {
      title: 'Submit text',
      type: 'string',
      default: 'Ingresa tu correo'
    },
    errorEmailMessage: {
      title: 'Email error label',
      type: 'string',
      default: 'Por favor, ingrese un E-mail válido.'
    },
    errorTermsMessage: {
      title: 'Terms error label',
      type: 'string',
      default: 'Pelase, accept terms'
    },
    terms: {
      title: 'Terms description (HTML)',
      type: 'string',
      default: '<div>Al comprar estarás aceptando el tratamiento de datos personales de acuerdo a la <a href="https://www.healthy-america.com.co/politica-de-tratamiento-de-datos-personales"> políticas de privacidad.</a></div>',
      widget: {
        'ui:widget': 'textarea'
      }
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
    checkedDefault: {
      title: 'Checked terms default state',
      type: 'boolean',
      default: false
    },
    showDefaultInputError: {
      title: 'Show default error of input',
      type: 'boolean',
      default: true
    },    
    successMessage: {
      title: 'Success message',
      type: 'string',
      default: "Se ha suscrito con éxito."
    }
  }
}

export default NewsLetterWrapper;