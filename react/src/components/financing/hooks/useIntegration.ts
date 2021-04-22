import { useState, useEffect, useContext } from 'react';
import GET_DOCUMENT from '../queries/getDocument.gql';
import { useOrder } from 'vtex.order-placed/OrderContext';
import RamdaCore from 'chefcompany.store-utils/ramdaCore';
import ReactApollo from 'chefcompany.store-utils/reactApollo';
import { useData } from './useData';
import { ToastContext } from 'vtex.styleguide';

const { pathOr } = RamdaCore;
const { useLazyQuery } = ReactApollo;

enum value {
  'A' = '1',
  'B' = '2',
  'C' = '3',
  'D' = '4'
}

export interface FinancingWrapperProps {
  TRM: number;
  maxValue: number;
  NIT: string;
  maxValueMessage: string;
  policy: number;
  notExist: string;
  success: string;
  deniedMessage: string;
  maxType: number;
}

export const useIntegration = ({
  TRM,
  maxValue,
  NIT,
  maxValueMessage,
  policy,
  notExist,
  success,
  deniedMessage,
  maxType
}: FinancingWrapperProps) => {
  const OrderContext = useOrder();
  const DataContext = useData();
  const { showToast } = useContext(ToastContext);
  const [getDocument, { data, loading }] = useLazyQuery(GET_DOCUMENT);
  const orderId = pathOr('Cargando...', ['orderId'], OrderContext);
  const document = pathOr('Cargando...', ['clientProfileData', 'document'], OrderContext);
  const documentType = pathOr('Cargando...', ['clientProfileData', 'documentType'], OrderContext);
  const email = pathOr('Cargando...', ['clientProfileData', 'email'], OrderContext);
  const firstName = pathOr('Cargando...', ['clientProfileData', 'firstName'], OrderContext);
  const lastName = pathOr('Cargando...', ['clientProfileData', 'lastName'], OrderContext);
  const phone = pathOr('Cargando...', ['clientProfileData', 'phone'], OrderContext);
  const total = pathOr(0, ['value'], OrderContext) / 100;
  const payment = pathOr(
    '',
    ['paymentData', 'transactions', 0, 'payments', 0, 'paymentSystem'],
    OrderContext
  );
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [policyValue, setPolicyValue] = useState(7000);
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [bill, setBill] = useState('');
  const [billing, setBilling] = useState(null);
  const [quota, setQuota] = useState(null);
  const [period, setPeriod] = useState(2);
  const [canPay, setCanPay] = useState(false);
  const [i, setI] = useState(TRM / 100);
  const [quotaQuantity, setQuotaQuantity] = useState(36);
  const [quotaArray, setQuotaArray] = useState([]);
  const [quotaSelect, setQuotaSelect] = useState({ value: 1, label: 1 });
  const [message, setMessage] = useState(null);
  const [example, setExample] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (quotaSelect) {
      setPeriod(quotaSelect.value);
    }
  }, [quotaSelect]);

  useEffect(() => {
    setName1(pathOr('', [0], firstName.split(' ')));
    setName2(pathOr('', [1], firstName.split(' ')));
  }, [firstName]);

  useEffect(() => {
    if (total && policy) {
      try {
        const v = Math.ceil(total * (policy / 100));
        setPolicyValue(v);
      } catch (error) {
        setPolicyValue(7000);
      }
    }
  }, [policy, total]);

  useEffect(() => {
    setI(TRM / 100);
  }, [TRM]);

  useEffect(() => {
    setShowLogin((firstName.match(/\*/g) || []).length >= 2);
  }, [firstName]);

  useEffect(() => {
    setLastName1(pathOr('', [0], lastName.split(' ')));
    setLastName2(pathOr('', [1], lastName.split(' ')));
  }, [lastName]);

  useEffect(() => {
    onValidate();
  }, [billing]);

  useEffect(() => {
    if (data) {
      let d = {};
      pathOr([], ['document', 'fields'], data).map((a: any) => {
        d = { ...d, ...{ [a.key]: a.value } };
      });
      setBilling(d);
    }
  }, [data]);

  useEffect(() => {
    const cuota = total * ((i * Math.pow(1 + i, period)) / (Math.pow(1 + i, period) - 1));
    setQuota(Math.ceil(cuota));
  }, [period, i, OrderContext, total]);

  useEffect(() => {
    if (quotaQuantity) {
      setQuotaArray(
        new Array(quotaQuantity).fill({}).map((a: any, i: number) => ({ value: i + 1, label: i + 1 }))
      );
    }
  }, [quotaQuantity]);

  const onValidate = () => {
    if (billing) {
      if (!Object.keys(billing).length) {
        return setMessage(notExist);
      }

      const financed = +pathOr('0', ['financed'], billing);
      const type = pathOr('B', ['type'], billing);
      if (maxValue < total + financed) {
        return setMessage(maxValueMessage);
      }

      if (+value[type] > maxType) {
        return setMessage(deniedMessage);
      }

      setMessage(success);
      const frequency = pathOr('Mensual', ['frequency'], billing);
      setQuotaQuantity(frequency == 'Mensual' ? 36 : 18);
      setCanPay(true);
    }
  };

  const onChange = (event: any) => {
    setBill(pathOr('', ['target', 'value'], event));
  };

  const onChangePeriod = (event: any) => {
    setPeriod(+pathOr('1', ['target', 'value'], event));
  };

  const validate = () => {
    if (billing && billing.id === bill) {
      onValidate();
    } else {
      getDocument({
        variables: {
          acronym: 'FN',
          fields: ['department', 'document', 'financed', 'frequency', 'type', 'id'],
          id: bill
        }
      });
    }
  };

  const send = () => {
    if (!canPay) showToast('Por favor, ingresa un número de factura válido');
    DataContext.parse({
      document,
      documentType,
      name1,
      name2,
      lastName1,
      lastName2,
      email,
      phone,
      total,
      orderId,
      billing,
      quota: quota + policyValue,
      NIT,
      bill
    });
  };

  const onCloseMessage = () => setMessage(null);

  const formatNumber = (value: any) => new Intl.NumberFormat(['ban', 'id']).format(value | 0);

  return {
    orderId,
    document,
    email,
    phone,
    name1,
    name2,
    setName1,
    setName2,
    setLastName1,
    setLastName2,
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
    documentType,
    send,
    quotaArray,
    quotaSelect,
    setQuotaSelect,
    message,
    onCloseMessage,
    formatNumber,
    setExample,
    example,
    payment,
    loading,
    showLogin,
    policyValue
  };
};
