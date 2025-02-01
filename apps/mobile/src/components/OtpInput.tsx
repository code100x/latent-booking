import { useRef } from 'react';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Keyboard,
} from 'react-native';

type OtpInputProps = {
  length: number;
  value: Array<string>;
  disabled: boolean;
  onChange: (value: Array<string>) => void;
};

const OtpInput = ({ length, value, disabled, onChange }: OtpInputProps) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const onChangeValue = (text: string, index: number) => {
    const newValue = value.map((item, valueIndex) => {
      if (valueIndex === index) {
        return text;
      }
      return item;
    });
    onChange(newValue);
  };

  const handleChange = (text: string, index: number) => {
    onChangeValue(text, index);

    if (text.length !== 0) {
      if (index === length - 1) {
        Keyboard.dismiss();
      } else {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBackspace = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    const { nativeEvent } = e;
    if (nativeEvent.key === 'Backspace') {
      handleChange('', index);
    }
  };

  return (
    <View className="w-full flex flex-row justify-between items-center">
      {[...new Array(length)].map((_, index) => (
        <TextInput
          ref={ref => {
            if (ref && !inputRefs.current.includes(ref)) {
              inputRefs.current = [...inputRefs.current, ref];
            }
          }}
          keyboardType="decimal-pad"
          key={index}
          maxLength={1}
          contextMenuHidden
          selectTextOnFocus
          editable={!disabled}
          testID={`OTPInput-${index}`}
          onChangeText={text => handleChange(text, index)}
          className="w-16 h-14 bg-[#262626] border border-[#F8D48D40] focus:border-[#F8D48D] rounded-lg text-[#FFF] text-xl text-center font-medium"
          onKeyPress={e => handleBackspace(e, index)}
        />
      ))}
    </View>
  );
};

export default OtpInput;
