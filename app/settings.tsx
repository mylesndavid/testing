import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Moon, Sun, ChevronRight, Bell, Lock, HelpCircle, LogOut } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme-store';
import { useUserStore } from '@/store/user-store';
import Button from '@/components/Button';

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, theme, setTheme, isDark } = useThemeStore();
  const { logout } = useUserStore();
  
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
          
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Pressable 
              style={[
                styles.option,
                theme === 'light' && [styles.selectedOption, { borderColor: colors.primary }]
              ]}
              onPress={() => handleThemeChange('light')}
            >
              <View style={styles.optionIcon}>
                <Sun size={20} color={theme === 'light' ? colors.primary : colors.secondaryText} />
              </View>
              <Text 
                style={[
                  styles.optionText, 
                  { color: theme === 'light' ? colors.primary : colors.text }
                ]}
              >
                Light
              </Text>
              {theme === 'light' && (
                <View style={[styles.checkmark, { backgroundColor: colors.primary }]} />
              )}
            </Pressable>
            
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            
            <Pressable 
              style={[
                styles.option,
                theme === 'dark' && [styles.selectedOption, { borderColor: colors.primary }]
              ]}
              onPress={() => handleThemeChange('dark')}
            >
              <View style={styles.optionIcon}>
                <Moon size={20} color={theme === 'dark' ? colors.primary : colors.secondaryText} />
              </View>
              <Text 
                style={[
                  styles.optionText, 
                  { color: theme === 'dark' ? colors.primary : colors.text }
                ]}
              >
                Dark
              </Text>
              {theme === 'dark' && (
                <View style={[styles.checkmark, { backgroundColor: colors.primary }]} />
              )}
            </Pressable>
            
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            
            <Pressable 
              style={[
                styles.option,
                theme === 'system' && [styles.selectedOption, { borderColor: colors.primary }]
              ]}
              onPress={() => handleThemeChange('system')}
            >
              <View style={styles.optionIcon}>
                <View style={styles.systemIcon}>
                  <Sun size={16} color={theme === 'system' ? colors.primary : colors.secondaryText} />
                  <Moon size={16} color={theme === 'system' ? colors.primary : colors.secondaryText} />
                </View>
              </View>
              <Text 
                style={[
                  styles.optionText, 
                  { color: theme === 'system' ? colors.primary : colors.text }
                ]}
              >
                System
              </Text>
              {theme === 'system' && (
                <View style={[styles.checkmark, { backgroundColor: colors.primary }]} />
              )}
            </Pressable>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
          
          <Pressable 
            style={[styles.menuItem, { backgroundColor: colors.card }]}
            onPress={() => console.log('Notification settings')}
          >
            <View style={styles.menuItemIcon}>
              <Bell size={20} color={colors.secondaryText} />
            </View>
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Notification Settings
            </Text>
            <ChevronRight size={20} color={colors.secondaryText} />
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          
          <Pressable 
            style={[styles.menuItem, { backgroundColor: colors.card }]}
            onPress={() => console.log('Privacy settings')}
          >
            <View style={styles.menuItemIcon}>
              <Lock size={20} color={colors.secondaryText} />
            </View>
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Privacy Settings
            </Text>
            <ChevronRight size={20} color={colors.secondaryText} />
          </Pressable>
          
          <View style={styles.menuSpacer} />
          
          <Pressable 
            style={[styles.menuItem, { backgroundColor: colors.card }]}
            onPress={() => console.log('Help & Support')}
          >
            <View style={styles.menuItemIcon}>
              <HelpCircle size={20} color={colors.secondaryText} />
            </View>
            <Text style={[styles.menuItemText, { color: colors.text }]}>
              Help & Support
            </Text>
            <ChevronRight size={20} color={colors.secondaryText} />
          </Pressable>
        </View>
        
        <View style={styles.logoutSection}>
          <Button
            title="Log Out"
            onPress={handleLogout}
            variant="outline"
            icon={<LogOut size={18} color={colors.error} />}
            iconPosition="left"
            style={[styles.logoutButton, { borderColor: colors.error }]}
            textStyle={{ color: colors.error }}
          />
        </View>
        
        <View style={styles.versionInfo}>
          <Text style={[styles.versionText, { color: colors.secondaryText }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  selectedOption: {
    borderLeftWidth: 3,
  },
  optionIcon: {
    width: 36,
    alignItems: 'center',
    marginRight: 12,
  },
  systemIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  checkmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuSpacer: {
    height: 8,
  },
  menuItemIcon: {
    width: 36,
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    flex: 1,
  },
  logoutSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  logoutButton: {
    alignSelf: 'center',
  },
  versionInfo: {
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
  },
});