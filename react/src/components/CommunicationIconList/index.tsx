import React, { CSSProperties, memo } from 'react';
import DangerousHTML from 'react-dangerous-html';
import styles from './index.css';
import { defaultProps, schema } from './schema';

type Icon = {
  image: string;
  link: string;
  openNewTab: boolean;
};

export interface CommunicationIconListProps {
  title: string;
  icons: Icon[];
  isFixed?: boolean;
  styles?: CSSProperties | string;
}

const getCSSProperties = (str: string) => {
  return str.split(/\n/).reduce((o, s) => {
    const [k, v] = s.split(':');
    return { ...o, ...(k && { [k]: v.trim() }) };
  }, {});
};

const CommunicationIconList: StorefrontFunctionComponent<CommunicationIconListProps> = memo(props => {
  const { title, icons } = props;
  const cssProperties = typeof props?.styles === 'string' ? getCSSProperties(props.styles) : {};
  const customStyles: CSSProperties = {
    ...(props?.isFixed != null && { position: props.isFixed ? 'fixed' : 'absolute' }),
    ...cssProperties
  };

  const iconList = icons.map((x, i) => {
    const href = !!x.link ? x.link : '#';
    const target = x.openNewTab ? '_blank' : '_self';

    return (
      <div key={i} className={styles.cilIcon}>
        <a href={href} target={target}>
          <img src={x.image} />
        </a>
      </div>
    );
  });

  return (
    <div className={styles.communicationIconList} style={customStyles}>
      <div className={styles.cilTitle}>
        <DangerousHTML html={title} />
      </div>

      <div className={styles.ciList}>{iconList}</div>
    </div>
  );
});

CommunicationIconList.displayName = 'CommunicationIconList';
CommunicationIconList.defaultProps = defaultProps;
CommunicationIconList.getSchema = () => schema;

export default CommunicationIconList;
