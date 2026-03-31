import { type VariantProps, cva } from 'class-variance-authority';
import { TextInput, View, type TextInputProps } from 'react-native';
import React , { useState, useEffect } from 'react';

import { amount, setAmount } from '../app/(auth)/transfer';
import { cn } from '../lib/utils';

const txtInpVariants = cva(
  'flex flex-row items-center justify-center rounded-md text-left font-medium mt-5 border-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        ghost: 'bg-nubank-gray', /* this one is used */
        link: 'text-primary underline-offset-4',
      },
      size: {
        default: 'h-10 px-4 text-base',
        sm: 'h-8 px-2 text-sm',
        lg: 'min-h-12 h-auto px-8 text-xl', /* this one is used */
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface TransferInputProps
  extends TextInputProps,
    VariantProps<typeof txtInpVariants> {
      className?: string
}

export function TransferInputItems({
  variant,
  size,
  className,
  ...props
}: TransferInputProps) {
  const [fullName, setFullName] = React.useState<string | null>('');
  const [alias, setAlias] = React.useState<string | null>('');
  const [clabe, setClabe] = React.useState<number | null>(0);

  const [activeField, setActiveField] = useState<number | null>(null);
  const changingStyle = (inFocus: boolean, value: string) => ({
    color: inFocus || value ? '#F5F5F5' : '#3f3f46',
    borderColor: inFocus ? '#BA4DE3' : '#3f3f46',
  });

  const staticStyles = cn(txtInpVariants({ variant, size, className }));
  const repetiveProps = {
    placeholderTextColor: '#3f3f46',
    selectionColor: '#BA4DE3',
  }
  
  return (
    <View>
        <TextInput
          id='1'
          className={staticStyles}
          style={changingStyle(activeField === 1, fullName)}
          onFocus={() => setActiveField(1)}
          onBlur={() => {setActiveField(null); setFullName(fullName.toUpperCase())}}
          placeholder="Full Name"
          onChangeText={setFullName}
          value={fullName}
          keyboardType="default"
          inputMode="text"
          {...repetiveProps}
          {...props}
        />
        <TextInput
          id='2'
          className={staticStyles}
          style={changingStyle(activeField === 2, alias)}
          onFocus={() => setActiveField(2)}
          onBlur={() => {setActiveField(null); setAlias(alias.toUpperCase())}}
          placeholder="Alias"
          onChangeText={setAlias}
          value={alias}
          keyboardType="default"
          inputMode="text"
          {...repetiveProps}
          {...props}
        />
        <TextInput
          id='3'
          className={staticStyles}
          style={changingStyle(activeField === 3, clabe)}
          onFocus={() => setActiveField(3)}
          onBlur={() => setActiveField(null)}
          placeholder="CLABE"
          onChangeText={setClabe}
          value={clabe}
          maxLength={18}
          keyboardType="numeric"
          inputMode="numeric"
          {...repetiveProps}
          {...props}
        />
        <TextInput
          id='4'
          className={staticStyles + ' mb-5'}
          style={changingStyle(activeField === 4, amount)}
          onFocus={() => setActiveField(4)}
          onBlur={() => setActiveField(null)}
          placeholder="Amount"
          onChangeText={setAmount}
          value={amount}
          keyboardType="decimal-pad"
          inputMode="decimal"
          {...repetiveProps}
          {...props}
        />
    </View>
  );
};

export default TransferInputItems;