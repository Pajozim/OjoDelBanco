import React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { TextInput, View, type TextInputProps } from 'react-native';
import { useBalance } from '../context/fake_balance';
import { Button } from './Button';
import { router } from 'expo-router';
import { cn } from '../lib/utils';
import ReaderForTransfer from '../lib/Scanner';

// --- Variants ---
const txtInpVariants = cva(
  'flex flex-row items-center justify-center rounded-md text-left font-medium mt-5 border-2 border-nubank-gray min-h-12 h-auto px-8 text-xl'
);

// --- Interfaces ---
interface TransferInputProps
  extends TextInputProps,
    VariantProps<typeof txtInpVariants> {
      className?: string
      setImageURI: React.Dispatch<React.SetStateAction<string>>
}

export interface StateSetterBundle {
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  setAlias: React.Dispatch<React.SetStateAction<string>>;
  setClabe: React.Dispatch<React.SetStateAction<string>>;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setImageURI: React.Dispatch<React.SetStateAction<string>>
}

// --- Component ---
export function TransferInputItems({
  className,
  setImageURI,
  ...props
}: TransferInputProps) {

  // --- States ---
  const [fullName, setFullName] = React.useState<string>('');
  const [alias, setAlias] = React.useState<string>('');
  const [clabe, setClabe] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');
  const [error, setError] = React.useState<boolean[]>([false, false, false]); // objective: whether the submit is ready or not ; [fullName, clabe, amount]

  const [activeField, setActiveField] = React.useState<number | null>(null); // objective: highlighting the focussed/active box/field

  const { balance, setBalance } = useBalance();

  // --- Styles ---
  const staticStyles = cn(txtInpVariants({ className }));
  const repetiveProps = {
    placeholderTextColor: '#3f3f46',
    selectionColor: '#BA4DE3',
  };

  // --- reactive TextInput styles ---
  const changingTIStyle = (inFocus: boolean, hasValue: boolean, error: boolean = false) => ({   
      color: inFocus || hasValue ? '#F5F5F5' : 
                    error ? '#ef4444' : '#3f3f46',
      borderColor: inFocus ? '#BA4DE3' : 
                    error ? '#ef4444' : '#3f3f46',
    }
  );
  const changingButtonStyle = () => {
    const allTrue: boolean = !!fullName && !!clabe && !!amount && error.every(e => !e);
    return {
      color: allTrue ? ' text-nubank-white' : ' text-zinc-700', //nubank-white is: #F5F5F5
      bgColor: allTrue ? ' bg-nubank-purple-400' : ' nubank-black', // nubank-gray is: #27272a; nubank-purple-400 is: #8A05BE
      borderColor: allTrue ? '' : ' border-zinc-700',
  }};

  // --- Functions ---
  const activateReader = () => ReaderForTransfer({setFullName, setAlias, setClabe, setAmount, setImageURI}); // add a model?

  // --- JSX ---
  return (
    <View>

        <Button
          label="use Scanner"
          size={"lg"}
          className="w-full mt-5 mb-3 flex flex-row items-center justify-center rounded-lg bg-nubank-purple-500"
          labelClasses="text-lg text-nubank-white text-center font-medium"
          onPress={activateReader}

        />

        <TextInput
          placeholder="Full Name"
          className={staticStyles}
          style={changingTIStyle(activeField === 1, !!fullName, error[0])}
          onFocus={() => setActiveField(1)}
          onBlur={() => {
            setActiveField(null);
            if (fullName) {
              setFullName(fullName.toUpperCase());
              setError([false, error[1], error[2]]);
            }
            else setError([true, error[1], error[2]]);
          }}
          onChangeText={setFullName}
          value={fullName}
          keyboardType="default"
          inputMode="text"
          {...repetiveProps}
          {...props}
        />
        <TextInput
          placeholder="Alias"
          className={staticStyles}
          style={changingTIStyle(activeField === 2, !!alias)}
          onFocus={() => setActiveField(2)}
          onBlur={() => {
            setActiveField(null); 
            if (alias) setAlias(alias.toUpperCase());
          }}
          onChangeText={setAlias}
          value={alias}
          keyboardType="default"
          inputMode="text"
          {...repetiveProps}
          {...props}
        />
        <TextInput
          placeholder="CLABE"
          className={staticStyles}
          style={changingTIStyle(activeField === 3, !!clabe, error[1])}
          onFocus={() => setActiveField(3)}
          onEndEditing={() => {
            if (clabe.length !== 18) setError([error[0], true, error[2]]);
            else setError([error[0], false, error[2]]);
          }}
          onChangeText={setClabe}
          value={clabe || ''}
          maxLength={18}
          keyboardType="numeric"
          inputMode="numeric"
          {...repetiveProps}
          {...props}
        />
        <TextInput
          placeholder="Amount"
          className={staticStyles + ' mb-8'}
          style={changingTIStyle(activeField === 4, !!amount, error[2])}
          onFocus={() => setActiveField(4)}
          onBlur={() => {
            setActiveField(null);
            const parsed = amount ? parseFloat(amount.replace(',', '.')) : 0;
            if (!isNaN(parsed) && parsed > 0) {
              setBalance([balance[0], parsed]);
              setError([error[0], error[1], false]);
            }
            else setError([error[0], error[1], true]);
          }}
          onChangeText={(v) => {
            if (/^\d*[,.]?\d{0,2}$/.test(v)) {
              setAmount(v);
            }
          }}
          value={amount}
          keyboardType="decimal-pad"
          inputMode="decimal"
          {...repetiveProps}
          {...props}
        />
        <Button
          label="Send"
          size={"lg"}
          className={cn("w-1/3 mb-5 flex flex-row items-center justify-center rounded-lg border-2", changingButtonStyle().bgColor, changingButtonStyle().borderColor)}
          labelClasses={cn("text-lg text-center font-medium", changingButtonStyle().color)}
          onPress={() => {
            if (error.every(e => !e) && !!fullName && !!clabe && !!amount) {
              /* 
              try {
                const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data)
                );
                if (!response.ok) {
                  throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                router.push('/transfer/feedback')
                console.log(result);
              } catch (error) {
                console.error(error.message);
              }
              */
              router.push('/transfer/feedback')
            }
          }}
        />
    </View>
  );
};

export default TransferInputItems;