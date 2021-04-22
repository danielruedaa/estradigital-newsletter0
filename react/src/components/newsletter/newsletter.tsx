
import InputVtex from 'vtex.styleguide/Input';
import ButtonVtex from 'vtex.styleguide/Button';
import CheckboxVtex from 'vtex.styleguide/Checkbox';
import DangerousHTML from 'react-dangerous-html';
import NewsletterStyle from './newsletter.css';
import { Icon } from 'vtex.store-icons';

const Input: any = InputVtex;
const Button: any = ButtonVtex;
const Checkbox: any = CheckboxVtex;

interface NewsletterProps {
  submitText: string;
  email: string;
  errorEmailMessage: string;
  errorTermsMessage: string;
  terms: string;
  beforeHtml: string;
  afterHtml: string;
  showEmailMessage: boolean;
  showAcceptTermsMessage: boolean;
  useTerms: boolean;
  check: boolean;
  loading: boolean;
  positions: string[];
  placeholderText: string;
  defaultPosition: boolean;
  disabled: boolean;
  showDefaultInputError: boolean;
  inputWithIcon: string;
  inputSize: number;
  buttonWithIcon: string;
  buttonWithIconSize: number;
  onChangeEmail: (e: any) => void;
  onChangeTerms: () => void;
  onHandleSubscribe: () => void;
  validateEmail: () => void;
}

const Newsletter = ({
  submitText,
  email,
  errorEmailMessage,
  errorTermsMessage,
  terms,
  beforeHtml,
  afterHtml,
  showEmailMessage,
  showAcceptTermsMessage,
  useTerms,
  check,
  loading,
  positions,
  placeholderText,
  defaultPosition,
  disabled,
  showDefaultInputError,
  inputWithIcon,
  inputSize,
  onChangeEmail,
  onChangeTerms,
  onHandleSubscribe,
  validateEmail,
  buttonWithIcon,
  buttonWithIconSize
}: NewsletterProps) => {

  const schema = {
    input: (<div className={NewsletterStyle.newsletterInput}>
      <Input prefix={<Icon id={inputWithIcon} size={inputSize}/>} id="newsletter-input" placeholder={placeholderText} value={email} onChange={onChangeEmail} onBlur={validateEmail} name="newsletter" errorMessage={showEmailMessage && showDefaultInputError && errorEmailMessage} />
    </div>),
    terms: useTerms && (<div className={NewsletterStyle.newsletterCheckbox}>
      <Checkbox checked={check} onChange={onChangeTerms} /> <div className={NewsletterStyle.newsletterTermsText}><DangerousHTML html={terms} tagName="div" /></div>
    </div>),
    button: (<div className={NewsletterStyle.newsletterButton}>
      <Button
        variation="primary"
        type="submit"
        onClick={onHandleSubscribe}
        isLoading={loading}
        disabled={disabled}
      >
        {submitText}
        {buttonWithIcon && <span className={NewsletterStyle.newsletterButtonWithIcon}><Icon id={buttonWithIcon} size={buttonWithIconSize} /></span>}
      </Button>
    </div>),
    termsError: showAcceptTermsMessage && useTerms && (<div className={NewsletterStyle.newsletterTermsMessage}>{errorTermsMessage}</div>),
    error: showEmailMessage && !showDefaultInputError && (<div className={NewsletterStyle.newsletterDefaultError}>{errorEmailMessage}</div>)
  }

  return (
    <div className={NewsletterStyle.newsletterContainer}>
      <div className={NewsletterStyle.newsletterBeforeHtml}>
        <DangerousHTML html={beforeHtml} tagName="div" />
      </div>
      {defaultPosition ? <div className={NewsletterStyle.newsletterContentForm}>
        <div className={NewsletterStyle.newsletterFormContainer}>
          <div className={NewsletterStyle.newsletterInputAndButtonContainer}>{schema.input} {schema.button} <div></div></div>
          {!showDefaultInputError && <div className={NewsletterStyle.newsletterInputErrorContainer}>{schema.error}</div>}
          {useTerms && <div className={NewsletterStyle.newsletterCheckboxContainer}>{schema.terms}</div>}
          {useTerms && <div className={NewsletterStyle.newsletterTermsErrorContainer}>{schema.termsError}</div>}
        </div>
      </div> :
        <div className={NewsletterStyle.newsletterContentForm}>
          {positions.map(position => schema[position])}
        </div>
      }
      <div className={NewsletterStyle.newsletterAfterHtml}><DangerousHTML html={afterHtml} tagName="div" /></div>
    </div>
  )
}

export default Newsletter;
