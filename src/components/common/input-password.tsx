'use client';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { FormItem } from 'react-hook-form-antd';
import { Control, FieldValues } from 'react-hook-form';
export interface IInputPasswordProps<T extends FieldValues> {
  label: string;
  name: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  control: Control<T>;
  size?: 'large' | 'middle' | 'small';
}

export function InputPassword(props: IInputPasswordProps<any>) {
  const { label, name, placeholder, prefix, control, size = 'middle' } = props;
  return (
    <div className={'font-poppins flex flex-col gap-2'}>
      <p className="font-medium">{label}</p>
      <FormItem
        style={{
          margin: 0,
        }}
        control={control}
        name={name}
      >
        <Input.Password
          placeholder={placeholder}
          iconRender={visible =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          size={size}
          prefix={prefix}
          autoComplete="off"
        />
      </FormItem>
    </div>
  );
}
