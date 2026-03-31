import { forwardRef, useState } from 'react';
import { Image, ImageProps, Text, View, ViewProps } from 'react-native';
import { cn } from '../lib/utils';

const Avatar = forwardRef<View, ViewProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  )
);
Avatar.displayName = 'Avatar';

const AvatarImage = forwardRef<Image, ImageProps & { className?: string }>(
  ({ className, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    if (hasError) return null;
    return (
      <Image
        ref={ref}
        onError={() => setHasError(true)}
        className={cn('aspect-square h-full w-full', className)}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = forwardRef<
  View,
  ViewProps & { className?: string; textClassname?: string; children?: React.ReactNode }
>(({ children, className, textClassname, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
    {...props}
  >
    <Text className={cn('text-lg text-primary', textClassname)}>
      {children}
    </Text>
  </View>
));
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };