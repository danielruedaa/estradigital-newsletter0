import { defineMessages } from 'react-intl';
import { CommunicationIconListProps } from '.';

const messages = defineMessages({
  blockTitle: { id: 'admin/editor.communication-icon-list.blockTitle' },
  title: { id: 'admin/editor.communication-icon-list.title' },
  titleDescription: { id: 'admin/editor.communication-icon-list.titleDescription' },
  titleIcons: { id: 'admin/editor.communication-icon-list.titleIcons' },
  iconImage: { id: 'admin/editor.communication-icon-list.iconImage' },
  iconLink: { id: 'admin/editor.communication-icon-list.iconLink' },
  iconOpenNewTab: { id: 'admin/editor.communication-icon-list.iconOpenNewTab' },
  isFixed: { id: 'admin/editor.communication-icon-list.isFixed' },
  stylesTitle: { id: 'admin/editor.communication-icon-list.stylesTitle' },
  stylesDescription: { id: 'admin/editor.communication-icon-list.stylesDescription' }
});

export const schema = {
  title: messages.blockTitle.id,
  type: 'object',
  properties: {
    title: {
      title: messages.title.id,
      description: messages.titleDescription.id,
      type: 'string',
      widget: {
        'ui:widget': 'textarea'
      }
    },
    icons: {
      title: messages.titleIcons.id,
      type: 'array',
      minItems: 1,
      items: {
        properties: {
          image: {
            title: messages.iconImage.id,
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader'
            }
          },
          link: {
            title: messages.iconLink.id,
            type: 'string'
          },
          openNewTab: {
            title: messages.iconOpenNewTab.id,
            type: 'boolean'
          }
        }
      }
    },
    styles: {
      title: messages.stylesTitle.id,
      description: messages.stylesDescription.id,
      type: 'string',
      widget: {
        'ui:widget': 'textarea'
      }
    },
    isFixed: {
      title: messages.isFixed.id,
      type: 'boolean',
      default: false
    }
  }
};

export const defaultProps: CommunicationIconListProps = {
  title: `
    <div class="flex items-center" style="color: #fff; font-size: 17px">
      <hr class="cilLine mr5" width="38px" />
      <span class="cilTitle">
        <b>Comunícate </b>
        con nosotros
      </span>
    </div>
  `,
  icons: [
    {
      image:
        'https://floria.vtexassets.com/assets/vtex.file-manager-graphql/images/d99633f4-bd7e-4d67-965f-115bbdd9af40___f3aa6c5cdc2612a380de506dbc079d1b.png',
      link: '',
      openNewTab: false
    },
    {
      image:
        'https://floria.vtexassets.com/assets/vtex.file-manager-graphql/images/b473b510-37d5-4646-8729-d2effcf919ef___b58a112cdb8c5ba6129e1d2278074f0a.png',
      link: 'https://api.whatsapp.com/send?phone=',
      openNewTab: true
    }
  ]
};
