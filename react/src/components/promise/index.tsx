import React from 'react';
import Promise, { PromiseProps } from './promise';

const PromiseWrapper = (props: PromiseProps) => {
  return <Promise {...props} />
}

PromiseWrapper.defaultProps = {
  lineHeight: 202,
  blockHeight: 600,
  mode: 'line',
  promiseList: [],
  fullWidth: false
}

PromiseWrapper.schema = {
  title: 'Promise',
  type: 'object',
  properties: {
    mode: {
      title: 'Type',
      type: 'string',
      enum: ['line', 'block'],
      default: 'line'
    },
    promiseList: {
      minItems: 0,
      title: 'Promise list',
      type: 'array',
      maxItems: 4,
      items: {
        title: 'Promise',
        type: 'object',
        properties: {
          icon: {
            title: 'Icon',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader'
            }
          },
          title: {
            title: 'title',
            type: 'string'
          },
          description: {
            title: 'title',
            type: 'string'
          }
        }
      }
    },
    fullWidth: {
      title: 'full width',
      type: 'boolean'
    }
  }
}

export default PromiseWrapper;
