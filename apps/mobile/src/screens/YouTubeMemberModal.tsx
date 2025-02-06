import React, { forwardRef, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import ModalIcon from '../assets/modalIcon.png';

interface YouTubeMemberModalProps {
  onClose?: () => void;
}

const YouTubeMemberModal = forwardRef<
  BottomSheetModal,
  YouTubeMemberModalProps
>(({ onClose }, ref) => {
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose?.();
      }
    },
    [onClose],
  );

  const handleClose = () => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.dismiss();
    }
    onClose?.();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      onChange={handleSheetChanges}
      snapPoints={['60%', '80%']}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: '#111111' }}
      handleIndicatorStyle={{
        backgroundColor: '#A2A0A2',
        marginTop: 24,
        marginBottom: 24,
      }}
    >
      <BottomSheetView className="flex-1 items-center justify-center">
        <View className="bg-[#111111] h-full w-full px-4">
          <View className="mb-4">
            <Image
              source={ModalIcon}
              className="w-[62px] h-[62px] mx-auto mb-6"
            />
            <Text className="font-bold text-2xl text-white">
              Connect your existing YouTube membership
            </Text>
            <View className="mt-4">
              <Text className="text-[#A2A0A2] font-normal text-xs">
                You will be able to watch all members-only content on the app
                and we will also put some content which is not on YouTube.
              </Text>
              <Text className="text-[#A2A0A2] font-normal text-xs mt-4">
                By connecting your YouTube membership, you will be able to
                access all the members-only content on both the app and YouTube.
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-4 mt-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleClose}
              className="rounded-md border border-[#424244] px-6 py-4"
            >
              <Text className="text-[#F4F4F3] font-semibold text-sm text-center">
                Back
              </Text>
            </TouchableOpacity>
            <LinearGradient
              colors={['#AA823D', '#EFE288', '#D1B85A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="flex-1 rounded-lg"
            >
              <TouchableOpacity activeOpacity={0.8} className="px-6 py-4">
                <Text className="text-[#070707] font-semibold text-sm text-center">
                  Connect YouTube
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default YouTubeMemberModal;
