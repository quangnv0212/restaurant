'use client';
import { Input } from 'antd';
import { ChangeEventHandler } from 'react';
import { FormItem } from 'react-hook-form-antd';

export interface IInputTextCommonProps {
  label?: string;
  name: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  control: any;
  size?: 'large' | 'middle' | 'small';
  disabled?: boolean;
  autoComplete?: string;
  suffix?: React.ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  isRequired?: boolean;
}

export function InputTextCommon(props: IInputTextCommonProps) {
  const {
    label,
    name,
    placeholder,
    prefix,
    control,
    size = 'middle',
    disabled = false,
    autoComplete,
    suffix,
    onChange,
    isRequired,
  } = props;
  return (
    <div className={'font-poppins flex flex-col gap-2'}>
      <div className="flex gap-1">
        {label && <p className="font-medium">{label}</p>}
        {isRequired ? (
          <span className="text-14-16 md:text-16-20 text-error">*</span>
        ) : null}
      </div>

      <FormItem
        style={{
          margin: 0,
        }}
        control={control}
        name={name}
      >
        <Input
          name={name}
          placeholder={placeholder}
          prefix={prefix}
          size={size}
          disabled={disabled}
          autoComplete={autoComplete}
          suffix={suffix}
          onChange={onChange}
        />
      </FormItem>
    </div>
  );
}
