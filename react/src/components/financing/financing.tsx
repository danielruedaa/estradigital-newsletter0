import FinancingStyle from './financing.css';
import { Icon } from 'vtex.store-icons';
import { EXPERIMENTAL_Select } from 'vtex.styleguide';
import { Modal } from 'vtex.styleguide';
import { Spinner } from 'vtex.styleguide';
import LoginContent from 'vtex.login/LoginContent';
import classnames from 'classnames';
import { useEffect, useState } from 'react';

const Financing = ({
  orderId,
  document,
  documentType,
  email,
  phone,
  name1,
  name2,
  lastName1,
  lastName2,
  onChange,
  bill,
  validate,
  total,
  quota,
  policy,
  onChangePeriod,
  period,
  canPay,
  billing,
  maxValueMessage,
  send,
  quotaArray,
  quotaSelect,
  setQuotaSelect,
  message,
  onCloseMessage,
  formatNumber,
  exampleTitle,
  exampleDescription,
  exampleImage,
  example,
  setExample,
  loading,
  showLogin,
  loginDescription,
  loginTitle,
  setName2,
  setLastName2,
  title,
  showInfo,
  invoiceTitle
}: any) => {
  const [currentTitle, setCurrentTitle] = useState('');

  useEffect(() => {
    setCurrentTitle(title.replace(/{pedido}/g, String(orderId)));
  }, [title, orderId]);

  const classes = classnames(FinancingStyle.contianerModalExample, FinancingStyle.contianerModalLogin);
  const classesButton = classnames(
    FinancingStyle.contianerSendFinancingButton,
    !canPay && FinancingStyle.contianerSendFinancingButtonDisabled
  );
  return (
    <>
      <div className={FinancingStyle.contianerFinancing}>
        <div className={FinancingStyle.contianerOrderNumber}>
          <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54">
            <defs></defs>
            <g transform="translate(-278 -221)">
              <circle fill="#d5752d" cx="27" cy="27" r="27" transform="translate(278 221)" />
              <g transform="translate(293 236)">
                <path fill="none" d="M0,0H24V24H0Z" />
                <path
                  fill="#fff"
                  d="M15.55,13a1.991,1.991,0,0,0,1.75-1.03l3.58-6.49A1,1,0,0,0,20.01,4H5.21L4.27,2H1V4H3l3.6,7.59L5.25,14.03A2,2,0,0,0,7,17H19V15H7l1.1-2ZM6.16,6H18.31l-2.76,5H8.53ZM7,18a2,2,0,1,0,2,2A2,2,0,0,0,7,18Zm10,0a2,2,0,1,0,2,2A2,2,0,0,0,17,18Z"
                />
              </g>
            </g>
          </svg>
          {/*<b>Pedido #:</b> {orderId}*/}
          <div className="flex items-center" dangerouslySetInnerHTML={{ __html: currentTitle }}></div>
        </div>
        {showInfo && (
          <div className={FinancingStyle.contianerOrderForm}>
            <div className={FinancingStyle.contianerOrderFormItem + ' ' + FinancingStyle.firstName}>
              <label className={FinancingStyle.contianerOrderFormItemLabel}>Primer nombre</label>
              <input
                type="text"
                value={name1}
                disabled
                className={FinancingStyle.contianerOrderFormItemInput}
              />
            </div>
            <div className={FinancingStyle.contianerOrderFormItem + ' ' + FinancingStyle.SecondName}>
              <label className={FinancingStyle.contianerOrderFormItemLabel}>Confirme su segundo nombre</label>
              <input
                type="text"
                value={name2}
                onChange={e => setName2(e.target.value)}
                className={FinancingStyle.contianerOrderFormItemInput}
              />
            </div>
            <div className={FinancingStyle.contianerOrderFormItem + ' ' + FinancingStyle.documentType}>
              <label className={FinancingStyle.contianerOrderFormItemLabel}>Tipo de documento</label>
              <input
                type="text"
                value={documentType}
                disabled
                className={FinancingStyle.contianerOrderFormItemInput}
              />
            </div>
            <div className={FinancingStyle.contianerOrderFormItem + ' ' + FinancingStyle.email}>
              <label className={FinancingStyle.contianerOrderFormItemLabel}>Correo electrónico</label>
              <input
                type="text"
                value={email}
                disabled
                className={FinancingStyle.contianerOrderFormItemInput}
              />
            </div>
            <div className={FinancingStyle.contianerOrderFormItem + ' ' + FinancingStyle.surName}>
              <label className={FinancingStyle.contianerOrderFormItemLabel}>Primer apellido</label>
              <input
                type="text"
                value={lastName1}
                disabled
                className={FinancingStyle.contianerOrderFormItemInput}
              />
            </div>
            <div className={FinancingStyle.contianerOrderFormItem + ' ' + FinancingStyle.secondSurName}>
              <label className={FinancingStyle.contianerOrderFormItemLabel}>
                Confirme su segundo apellido
              </label>
              <input
                type="text"
                value={lastName2}
                onChange={e => setLastName2(e.target.value)}
                className={FinancingStyle.contianerOrderFormItemInput}
              />
            </div>
            <div className={FinancingStyle.contianerOrderFormItem + ' ' + FinancingStyle.document}>
              <label className={FinancingStyle.contianerOrderFormItemLabel}>Documento</label>
              <input
                type="text"
                value={document}
                disabled
                className={FinancingStyle.contianerOrderFormItemInput}
              />
            </div>
            <div className={FinancingStyle.contianerOrderFormItem + ' ' + FinancingStyle.phone}>
              <label className={FinancingStyle.contianerOrderFormItemLabel}>Telefono</label>
              <input
                type="text"
                value={phone}
                disabled
                className={FinancingStyle.contianerOrderFormItemInput}
              />
            </div>
          </div>
        )}
        <div className={FinancingStyle.contianerSendOrder}>
          <div className={FinancingStyle.contianerOrderValidation}>
            <div className={FinancingStyle.contianerOrderFormValidation}>
              <label className={FinancingStyle.contianerOrderFormValidationLabel}>
                {invoiceTitle}
                <div
                  className={FinancingStyle.contianerOrderExample}
                  onClick={() => {
                    setExample(!example);
                  }}
                >
                  <Icon id="inf-tooltip--outline" size={20} />
                </div>{' '}
              </label>
              <div className={FinancingStyle.contianerOrderFormContainer}>
                <input
                  onChange={onChange}
                  value={bill}
                  className={FinancingStyle.contianerOrderFormValidationInput}
                />
                <button onClick={validate} className={FinancingStyle.contianerOrderFormValidationButtonLabel}>
                  {!loading ? (
                    <>
                      Validar <Icon id="nav-arrow--right" />{' '}
                    </>
                  ) : (
                    <div className="w-100 flex justify-center items-center">
                      <Spinner color="currentColor" size={20} />
                    </div>
                  )}
                </button>
              </div>
            </div>
            {message && (
              <div className={FinancingStyle.contianerOrderFormValidatioMessage}>
                <div
                  className={FinancingStyle.contianerOrderFormValidatioMessageLabel}
                  dangerouslySetInnerHTML={{ __html: message }}
                ></div>
                <div
                  className={FinancingStyle.contianerOrderFormValidatioMessageClose}
                  onClick={onCloseMessage}
                >
                  <Icon id="sti-close--line" size={24} />
                </div>
              </div>
            )}
          </div>
          <div className={FinancingStyle.contianerOrderQuotasGeneral}>
            <div className={FinancingStyle.contianerOrderQuotas}>
              <label className={FinancingStyle.contianerOrderQuotasLabel}>Valor a financiar:</label>
              <label className={FinancingStyle.contianerOrderQuotasValue}>{formatNumber(total)}</label>
            </div>
            <div className={FinancingStyle.contianerOrderQuotasQuantity}>
              <label className={FinancingStyle.contianerOrderQuotasQuantityLabel}>Número de cuotas:</label>
              <div className={FinancingStyle.contianerOrderQuotasQuantitySelect}>
                <EXPERIMENTAL_Select
                  options={quotaArray}
                  multi={false}
                  placeholder="Cuotas"
                  value={quotaSelect}
                  onChange={(values: any) => {
                    setQuotaSelect(values);
                  }}
                />
              </div>
            </div>
            <div className={FinancingStyle.contianerOrderQuotas}>
              <label className={FinancingStyle.contianerOrderQuotasLabel}>Cuota Aproximada:</label>
              <label className={FinancingStyle.contianerOrderQuotasValue}>
                {!quota ? 'Por calcular' : formatNumber(quota)}
              </label>
            </div>
            <div className={FinancingStyle.contianerOrderQuotas}>
              <div className={FinancingStyle.contianerOrderQuotasMultipleLabel}>
                <label className={FinancingStyle.contianerOrderQuotasLabel}>Poliza de vida:</label>
                <label className={FinancingStyle.contianerOrderQuotasSubLabel}>Deudor/mes</label>
              </div>
              <label className={FinancingStyle.contianerOrderQuotasValue}>{formatNumber(policy)}</label>
            </div>
            <div className={FinancingStyle.contianerSendFinancing}>
              <button onClick={send} className={classesButton}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          isOpen={example}
          showTopBar={false}
          onClose={() => {
            setExample(!example);
          }}
        >
          <div className={FinancingStyle.contianerModalExample}>
            <div className={FinancingStyle.contianerModalExampleImage}>
              <img src={exampleImage} alt="Example" className={FinancingStyle.modalExampleImage} />
            </div>
            <div className={FinancingStyle.modalExampleDescription}>
              <div className={FinancingStyle.modalExampleDescriptionIcon}>
                <Icon id="inf-tooltip--outline" size={24} />
              </div>
              <div className={FinancingStyle.modalExampleDescriptionTitle}>{exampleTitle}</div>
              <div className={FinancingStyle.modalExampleDescriptionBody}>{exampleDescription}</div>
            </div>
          </div>
        </Modal>
      </div>
      <div className={FinancingStyle.contianerModalLoginGeneral}>
        <Modal isOpen={showLogin} onClose={() => {}} responsiveFullScreen={true}>
          <div className={classes}>
            <div className={FinancingStyle.contianerModalExampleImage}>
              <LoginContent isHeaderLogin={true} defaultOption={2} />
            </div>
            <div className={FinancingStyle.modalExampleDescription}>
              <div className={FinancingStyle.modalExampleDescriptionTitle}>{loginTitle}</div>
              <div className={FinancingStyle.modalExampleDescriptionBody}>{loginDescription}</div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Financing;
