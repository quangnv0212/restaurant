import { Input } from 'antd';
import * as React from 'react';
import { FormItem } from 'react-hook-form-antd';

export interface IInputCheckCommonProps {
  label: string;
  name: string;
  control?: any;
  size?: 'large' | 'middle' | 'small';
}

export function InputCheckCommon(props: IInputCheckCommonProps) {
  const { label, name, control, size = 'middle' } = props;
  return (
    <FormItem
      style={{
        margin: 0,
      }}
      control={control}
      name={name}
      label={label}
      className="flex items-center"
    >
      <Input name={name} size={size} type="checkbox" />
    </FormItem>
  );
}
