import { useEffect, useState, Suspense, Fragment } from 'react';
import { Icon } from 'vtex.store-icons';
import Style from './index.css';
import { NoSSR } from 'vtex.render-runtime';
import classnames from 'classnames';

const IconDefault = ({ fill }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 29 35"
      className={Style.containerWhatsappIconDefault}
    >
      <path
        d="M25.306,6.575a14.754,14.754,0,0,0-23.213,17.8L0,32.014l7.82-2.053a14.7,14.7,0,0,0,7.049,1.794h.007A14.891,14.891,0,0,0,29.764,17.006,14.807,14.807,0,0,0,25.306,6.575ZM14.875,29.27A12.237,12.237,0,0,1,8.63,27.562L8.185,27.3,3.548,28.512l1.236-4.524-.292-.465a12.283,12.283,0,1,1,22.781-6.517,12.4,12.4,0,0,1-12.4,12.264ZM21.6,20.088c-.365-.186-2.179-1.076-2.518-1.2s-.585-.186-.83.186-.95,1.2-1.169,1.448-.432.279-.8.093a10.031,10.031,0,0,1-5.016-4.385c-.379-.651.379-.6,1.083-2.013a.683.683,0,0,0-.033-.644c-.093-.186-.83-2-1.136-2.737-.3-.718-.6-.618-.83-.631s-.458-.013-.7-.013a1.365,1.365,0,0,0-.983.458A4.141,4.141,0,0,0,7.374,13.73a7.22,7.22,0,0,0,1.5,3.813,16.468,16.468,0,0,0,6.3,5.567c2.339,1.01,3.255,1.1,4.425.923a3.775,3.775,0,0,0,2.485-1.754,3.082,3.082,0,0,0,.213-1.754C22.21,20.361,21.964,20.268,21.6,20.088Z"
        fill={fill}
      />
    </svg>
  );
};

interface WhatsappProps {
  label: string;
  whatsappNumber: string;
  message: string;
  iconId: string;
  iconSize?: number;
  newPage: boolean;
  fill: string;
  fixed: boolean;
}

const Whatsapp = ({ iconId, message, whatsappNumber, label, iconSize, newPage, fill, fixed }: WhatsappProps) => {
  const [link, setUrl] = useState('#');

  const classes = classnames(Style.containerWhatsappLink, fixed && Style.containerWhatsappLinkFixed)

  useEffect(() => {
    const m = encodeURI(message);
    setUrl('https://api.whatsapp.com/send?phone=' + whatsappNumber + '&text=' + m);
  }, [message, whatsappNumber]);

  return (
    <NoSSR>
      <Suspense fallback={<Fragment />}>
        <div className={Style.containerWhatsapp}>
          <a href={link} target={newPage && '_blank'} className={classes}>
            {iconId ? <Icon id={iconId} size={iconSize} /> : <IconDefault fill={fill} />}
            <div className={Style.containerWhatsappDummyContainer}></div>
            {label && <span className={Style.containerWhatsappLabel}>{label}</span>}
          </a>
        </div>
      </Suspense>
    </NoSSR>
  );
};

Whatsapp.defaultProps = {
  label: 'Comunicate con nosotros',
  whatsappNumber: '',
  message: 'Hi!, I need help with your page',
  iconId: '',
  iconSize: 16,
  newPage: true,
  fill: '#000',
  fixed: false
};

Whatsapp.schema = {
  title: 'Whatsapp',
  type: 'object',
  properties: {
    label: {
      type: 'string',
      title: 'Label',
      default: 'Comunicate con nosotros'
    },
    whatsappNumber: {
      type: 'string',
      title: 'whatsapp'
    },
    message: {
      type: 'string',
      title: 'Message',
      default: 'Hi!, I need help with your page'
    },
    newPage: {
      type: 'boolean',
      title: 'Open on another page?',
      default: true
    },
    fixed: {
      type: 'boolean',
      title: 'Fixed?',
      default: true
    }
  }
}

export default Whatsapp;
