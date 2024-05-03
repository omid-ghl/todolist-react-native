import {colors} from '@Theme';
import React, {ReactNode, RefObject, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
  customRef: RefObject<{}>;
  snapPoint?: number;
  adjustToContentHeight?: boolean;
  panGestureComponentEnabled?: boolean;
  panGestureEnabled?: boolean;
  withReactModal?: boolean;
  wrapperStyle?: ViewStyle;
  handleStyle?: ViewStyle;
  FooterComponent?: React.ReactNode;
  onOpenStatus?: (status?: boolean) => {};
  modalHeight?: number;
  mustBeStatic?: boolean;
}

const OPENING_MODAL_CONFIG = {
  timing: {duration: 250},
  spring: {speed: 14, bounciness: 0},
};

const _Modal = (props: Props) => {
  const {
    children,
    customRef,
    snapPoint,
    panGestureComponentEnabled = true,
    panGestureEnabled = true,
    withReactModal = true,
    adjustToContentHeight = true,
    wrapperStyle = {},
    handleStyle = {},
    FooterComponent,
    onOpenStatus = () => {},
    modalHeight,
    mustBeStatic,
  } = props;

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const {top: statusBarHeight} = useSafeAreaInsets();

  return (
    <Portal>
      <Modalize
        overlayStyle={styles.modalOvarlayStyle}
        openAnimationConfig={OPENING_MODAL_CONFIG}
        onOpen={() => {
          onOpenStatus(true);
          setIsOpened(true);
        }}
        onClose={() => {
          onOpenStatus(false);
          setIsOpened(false);
        }}
        onOverlayPress={() => {
          onOpenStatus(false);
          setIsOpened(false);
        }}
        handlePosition="inside"
        FooterComponent={FooterComponent}
        modalStyle={[
          styles.modalStyle,
          wrapperStyle,
          // {marginTop: statusBarHeight * 2},
        ]}
        scrollViewProps={
          mustBeStatic
            ? {
                disableScrollViewPanResponder: true,
                scrollEnabled: false,
              }
            : {}
        }
        handleStyle={[styles.handleStyle, handleStyle]}
        ref={customRef}
        snapPoint={snapPoint}
        adjustToContentHeight={modalHeight ? false : adjustToContentHeight}
        panGestureComponentEnabled={panGestureComponentEnabled}
        panGestureEnabled={panGestureEnabled}
        withReactModal={withReactModal}
        disableScrollIfPossible
        modalHeight={modalHeight}>
        <View style={[styles.contentStyle]}>{children}</View>
      </Modalize>
      {isOpened && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.blurWrapper}>
          <View style={styles.flex} />
        </Animated.View>
      )}
    </Portal>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  modalStyle: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.white,
    zIndex: 100,
  },
  handleStyle: {marginVertical: 4, backgroundColor: colors.neutral[200]},
  contentStyle: {
    marginVertical: 32,
    alignItems: 'center',
    marginHorizontal: 18,
    paddingBottom: 20,
  },
  modalOvarlayStyle: {backgroundColor: 'rgba(5, 5, 5, 0.4)'},
  blurWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
});

export const Modal = React.memo(_Modal);
