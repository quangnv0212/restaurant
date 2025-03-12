import { Input } from 'antd';
import * as React from 'react';
import { FormItem } from 'react-hook-form-antd';
import { Control, FieldValues } from 'react-hook-form';

export interface IInputCheckCommonProps<T extends FieldValues> {
  label: string;
  name: string;
  control: Control<T>;
  size?: 'large' | 'middle' | 'small';
}

export function InputCheckCommon(props: IInputCheckCommonProps<any>) {
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
