import { useEffect, useState } from 'react';
import Financing from './financing';
import { useIntegration } from './hooks/useIntegration';
import { useRuntime } from 'vtex.render-runtime';
import RamdaCore from 'chefcompany.store-utils/ramdaCore';

const { pathOr } = RamdaCore;

interface FinancingWrapperProps {
  interes: string;
  TRM: number;
  policy: number;
  maxValue: number;
  maxValueMessage: string;
  NIT: string;
  exampleTitle: string;
  exampleDescription: string;
  exampleImage: string;
  loginTitle: string;
  loginDescription: string;
  notExist: string;
  success: string;
  deniedMessage: string;
  maxType: number;
  title: string;
  showInfo: boolean;
  invoiceTitle: string;
  quotaPolicy: string;
  nitCompany: string;
}

const FinancingWrapper = (props: FinancingWrapperProps) => {
  const {
    interes,
    maxValue,
    maxValueMessage,
    exampleTitle,
    exampleDescription,
    exampleImage,
    loginDescription,
    loginTitle,
    notExist,
    success,
    deniedMessage,
    maxType,
    title,
    showInfo,
    invoiceTitle,
    quotaPolicy,
    nitCompany
  } = props;

  const RuntimeContext = useRuntime();
  const state = pathOr('process', ['query', 'state'], RuntimeContext);
  const [t, setT] = useState(1);
  const [p, setP] = useState(0.7);

  useEffect(() => {
    try {
      setT(JSON.parse(interes));
    } catch (error) {
      setT(1);
    }
  }, [interes]);

  useEffect(() => {
    try {
      setP(JSON.parse(quotaPolicy));
    } catch (error) {
      setP(0.7);
    }
  }, [quotaPolicy]);

  const {
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
    onChangePeriod,
    period,
    canPay,
    billing,
    send,
    quotaArray,
    quotaSelect,
    setQuotaSelect,
    message,
    onCloseMessage,
    formatNumber,
    example,
    setExample,
    payment,
    loading,
    showLogin,
    setName1,
    setName2,
    setLastName1,
    setLastName2,
    policyValue
  } = useIntegration({
    TRM: t,
    maxValue,
    NIT: nitCompany,
    maxValueMessage,
    policy: p,
    notExist,
    success,
    deniedMessage,
    maxType
  });

  useEffect(() => {
    if (payment === '201' && state !== 'confirmed') {
      const orderPlacedHeader: any = window.document.getElementsByClassName(
        'vtex-order-placed-2-x-orderPlacedHeader'
      );
      const opOrderContainer: any = window.document.getElementsByClassName(
        'vtex-flex-layout-0-x-flexRow--op-order-container'
      );
      const promiseItemContainer: any = window.document.getElementsByClassName(
        'chefcompany-newsletter-0-x-promiseItemContainer'
      );
      if (orderPlacedHeader && orderPlacedHeader.length) {
        orderPlacedHeader[0].style.display = 'none';
      }

      if (opOrderContainer && opOrderContainer.length) {
        opOrderContainer[0].style.display = 'none';
      }

      if (promiseItemContainer && opOrderContainer.length) {
        promiseItemContainer[3].style.filter = 'grayscale(1)';
        promiseItemContainer[3].style.opacity = '.6';
      }
    }
  }, [payment, state]);

  if (payment !== '201' || state === 'confirmed') return <></>;

  return (
    <Financing
      orderId={orderId}
      document={document}
      documentType={documentType}
      email={email}
      phone={phone}
      name1={name1}
      name2={name2}
      lastName1={lastName1}
      lastName2={lastName2}
      onChange={onChange}
      bill={bill}
      validate={validate}
      total={total}
      quota={quota}
      policy={policyValue}
      onChangePeriod={onChangePeriod}
      period={period}
      canPay={canPay}
      billing={billing}
      send={send}
      quotaArray={quotaArray}
      quotaSelect={quotaSelect}
      setQuotaSelect={setQuotaSelect}
      message={message}
      onCloseMessage={onCloseMessage}
      formatNumber={formatNumber}
      exampleTitle={exampleTitle}
      exampleDescription={exampleDescription}
      exampleImage={exampleImage}
      example={example}
      setExample={setExample}
      loading={loading}
      showLogin={showLogin}
      loginDescription={loginDescription}
      loginTitle={loginTitle}
      setName1={setName1}
      setName2={setName2}
      setLastName1={setLastName1}
      setLastName2={setLastName2}
      title={title}
      showInfo={showInfo}
      invoiceTitle={invoiceTitle}
    />
  );
};

FinancingWrapper.defaultProps = {
  interes: '2.02',
  quotaPolicy: '0.7',
  TRM: 1,
  policy: 7000,
  maxValue: 10000000,
  maxValueMessage:
    "El valor a financiar supera el cupo habilitado para tu cuenta. Si tienes inquietudes, puedes escribirnos al Whatsapp <a href='https://api.whatsapp.com/send?phone=+573053356350&text=Hola' target='_blank' style='color: #fff'>3053356350</a>",
  nitCompany: '800249860',
  exampleTitle: '¿Dónde encontrar el número de mi factura?',
  exampleDescription:
    'El número de factura (NIC) para clientes de Valle del Cauca o código de cuenta para clientes de Tólima; es el identificador de tu cuenta de energía. En ambos casos, lo encontrarás ubicado en la parte superior derecha de tu factura de energía.',
  exampleImage: '/arquivos/img-factura.png',
  loginTitle: 'Confirma tu identidad para continuar con el financiamiento',
  loginDescription:
    '¡Hola! Te falta poco para finalizar tu proceso de financiamiento; para continuar, debes confirmar tu identidad ingresando tu clave o solicitando una que te llegará a tu correo electrónico.',
  notExist:
    "La cuenta que diligenciaste no existe; por favor revísala. Si tienes inquietudes, puedes escribirnos al WhatsApp <a href='https://api.whatsapp.com/send?phone=+573053356350&text=Hola' target='_blank' style='color: #fff'>3053356350</a>",
  success: 'Tu cuenta está habilitada para financiamiento; puedes continuar con el proceso',
  deniedMessage:
    "Tu cuenta no está habilitada para financiamiento. Si tienes inquietudes, puedes escribirnos al Whatsapp <a href='https://api.whatsapp.com/send?phone=+573053356350&text=Hola' target='_blank' style='color: #fff'>3053356350</a>",
  maxType: 3,
  title:
    "<span style='font-size:30px'>Ingresa Número de Factura y cuotas para continuar el financiamiento</span>",
  showInfo: false,
  invoiceTitle: '¿Cuál es tu número de factura de energía o Código de Cuenta?'
};

FinancingWrapper.schema = {
  title: 'Financiación',
  type: 'object',
  properties: {
    interes: {
      title: 'Tasa de Interés',
      type: 'string',
      description: 'valor en porcentaje, ejem: 1, sería igual a 1%, para poner decimales use . ejem: 2.02',
      default: '2.02'
    },
    quotaPolicy: {
      title: 'Valor de póliza de vida (procentual)',
      type: 'string',
      default: '0.7',
      description: 'valor en porcentaje, ejem: 1, sería igual a 1%, para poner decimales use . ejem: 0.7'
    },
    maxValue: {
      title: 'Valor de financiamiento general',
      type: 'number',
      default: 10000000
    },
    maxValueMessage: {
      title: 'Mensaje de valor máximo alcanzado',
      type: 'string',
      default: 'Mensaje de valor máximo'
    },
    nitCompany: {
      title: 'NIT',
      type: 'string',
      default: '800249860'
    },
    exampleTitle: {
      title: '¿Donde puedo encontrar?, Título',
      type: 'string',
      default: '¿Dónde encontrar el número de mi factura?'
    },
    exampleDescription: {
      title: '¿Donde puedo encontrar?, Descripción',
      type: 'string',
      default:
        'El número de factura (NIC) para clientes de Valle del Cauca o código de cuenta para clientes de Tólima; es el identificador de tu cuenta de energía. En ambos casos, lo encontrarás ubicado en la parte superior derecha de tu factura de energía.'
    },
    exampleImage: {
      title: '¿Donde puedo encontrar?, Imagen',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader'
      },
      default: '/arquivos/img-factura.png'
    },
    loginTitle: {
      title: 'Título login',
      type: 'string',
      default: 'Confirma tu identidad para continuar con el financiamiento'
    },
    loginDescription: {
      title: 'Descripción login',
      type: 'string',
      default:
        '¡Hola! Te falta poco para finalizar tu proceso de financiamiento; para continuar, debes confirmar tu identidad ingresando tu clave o solicitando una que te llegará a tu correo electrónico.'
    },
    notExist: {
      title: 'Descripción login',
      type: 'string',
      default:
        "La cuenta que diligenciaste no existe; por favor revísala. Si tienes inquietudes, puedes escribirnos al WhatsApp <a href='https://api.whatsapp.com/send?phone=+573053356350&text=Hola' target='_blank' style='color: #fff'>3053356350</a>"
    },
    success: {
      title: 'Mensaje exitoso',
      type: 'string',
      default: 'Tu cuenta está habilitada para financiamiento; puedes continuar con el proceso'
    },
    deniedMessage: {
      title: 'Mensaje no financiamiento',
      type: 'string',
      default:
        "Tu cuenta no está habilitada para financiamiento. Si tienes inquietudes, puedes escribirnos al Whatsapp <a href='https://api.whatsapp.com/send?phone=+573053356350&text=Hola' target='_blank' style='color: #fff'>3053356350</a>"
    },
    maxType: {
      title: 'Maximo de calificación',
      type: 'number',
      default: 3
    },
    title: {
      title: 'Título del financiamiento',
      type: 'string',
      default:
        "<span style='font-size:30px'>Ingresa Número de Factura y cuotas para continuar el financiamiento</span>",
      description: 'Usa {pedido} para mostrar el número del pedido'
    },
    showInfo: {
      title: 'Mostrar formulario con información del usuario',
      type: 'boolean',
      default: false
    },
    invoiceTitle: {
      title: 'Título factura',
      type: 'string',
      default: '¿Cuál es tu número de factura de energía o Código de Cuenta?'
    }
  }
};

export default FinancingWrapper;
