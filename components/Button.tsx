import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  View,
} from 'react-native';
import { useThemeStore } from '@/store/theme-store';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
}: ButtonProps) {
  const { colors } = useThemeStore();
  
  const getContainerStyles = () => {
    const baseStyle = [styles.container];
    
    // Add size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallContainer);
        break;
      case 'large':
        baseStyle.push(styles.largeContainer);
        break;
    }
    
    // Add variant styles
    switch (variant) {
      case 'primary':
        baseStyle.push({ backgroundColor: colors.primary });
        break;
      case 'secondary':
        baseStyle.push({ backgroundColor: colors.secondary });
        break;
      case 'outline':
        baseStyle.push({ 
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.primary,
        });
        break;
      case 'text':
        baseStyle.push({ 
          backgroundColor: 'transparent',
          paddingHorizontal: 0,
        });
        break;
    }
    
    // Add disabled styles
    if (disabled) {
      baseStyle.push({ opacity: 0.5 });
    }
    
    // Add full width style
    if (fullWidth) {
      baseStyle.push({ width: '100%' });
    }
    
    return baseStyle;
  };
  
  const getTextStyles = () => {
    const baseStyle = [styles.text];
    
    // Add size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallText);
        break;
      case 'large':
        baseStyle.push(styles.largeText);
        break;
    }
    
    // Add variant styles
    switch (variant) {
      case 'primary':
      case 'secondary':
        baseStyle.push({ color: 'white' });
        break;
      case 'outline':
      case 'text':
        baseStyle.push({ color: colors.primary });
        break;
    }
    
    return baseStyle;
  };
  
  return (
    <TouchableOpacity
      style={getContainerStyles()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' || variant === 'secondary' ? 'white' : colors.primary} 
          size="small" 
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          
          <Text style={getTextStyles()}>{title}</Text>
          
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  largeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});